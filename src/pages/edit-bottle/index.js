import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  LayoutAnimation,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TextInput from '../../../src/components/TextInput';
import ButtonComponent from '../../../src/components/ButtonComponent';
import * as authActions from '../../../src/redux/actions/authActions';
import * as bottleActions from '../../../src/redux/actions/bottleActions';
import {isEmptyObject, showAlert} from '../../../src/utils/native';
import TimePicker from 'react-native-24h-timepicker';
import moment from 'moment';
import styles from './styles';
import CustomTimePicker from '../../components/CustomTimePicker';

class EditBottle extends React.Component {
  constructor(props) {
    super(props);
    const {card} = this.props;
    this.state = {
      NotesValue: card.bottleEdit.note,
      // selectedStartTime: "",
      // TimeValue: "",
      time: card.bottleEdit.start_time,
      selectedAmount: card.bottleEdit.amount,
      selectedFeed: card.bottleEdit.type_of_feed,
      isKeyboardShow: false,
      ozList: null,
      isTimePickerOpen: false,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({isKeyboardShow: true});
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({isKeyboardShow: false});
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
    );

    let oz = [];
    for (let i = 0; i < 31; i++) {
      oz.push({label: `${(i / 4).toFixed(2)} OZ`, value: i / 4});
    }
    this.setState({ozList: oz});
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidUpdate() {
    const {
      card: {msg},
      // dispatchClearCard,
      navigation,
    } = this.props;
    if (msg === 'EDIT_BOTTLE_SUCCESS') {
      // dispatchClearCard();
      this.setState(() => {
        showAlert('Success', 'baby bottle update successfully.', '', () => {
          navigation.navigate('Track', {activeTab: 'Bottles'});
        });
      });
    }
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    let AMPM = hour < 12 ? 'AM' : 'PM';
    this.setState({time: `${hour}:${minute} ${AMPM}`});
    this.TimePicker.close();
  }

  cancelHandler() {
    const {navigation} = this.props;
    navigation.navigate('Track');
  }

  saveHandler() {
    const {time, NotesValue, selectedAmount, selectedFeed} = this.state;
    const {card} = this.props;
    const data = {
      bottle_id: card.bottleEdit.id,
      start_time: time,
      type_of_feed: selectedFeed,
      amount: selectedAmount,
      note: NotesValue,
    };
    // const {dispatchBottleEdit} = this.props;
    // if (!isEmptyObject(data)) {
    //   dispatchBottleEdit(data);
    // }
  }

  getTimeAMPM(data) {
    return moment(data, ['HH:mm']).format('hh:mm A');
  }

  render() {
    const {
      isTimePickerOpen,
      ozList,
      NotesValue,
      time,
      selectedAmount,
      selectedFeed,
      isKeyboardShow,
    } = this.state;

    const selectedTime = time.split(':');
    selectedTime[1] =
      selectedTime[1].length === 1 ? `0${selectedTime[1]}` : selectedTime[1];

    return (
      <View style={styles.container}>
        <Text style={styles.breastfeedTitle}>Edit a Bottle</Text>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: isKeyboardShow ? 0.5 : 1}}>
          {isTimePickerOpen && (
            <CustomTimePicker
              time={selectedTime}
              onClose={value => {
                if (value) {
                  this.setState({
                    isTimePickerOpen: false,
                    time: `${value[0]}:${value[1]}`,
                  });
                } else {
                  this.setState({isTimePickerOpen: false});
                }
              }}
            />
          )}
          <View style={styles.startTimePicker}>
            <Text
              style={[
                styles.pickerLabel,
                {backgroundColor: '#fff', color: '#999'},
              ]}>
              Start Time
            </Text>
            <View style={styles.picker}>
              <TouchableOpacity
                onPress={() => this.setState({isTimePickerOpen: true})}
                style={styles.pickerInput}>
                <Text style={styles.pickerInput}>{this.getTimeAMPM(time)}</Text>

                <FontAwesomeIcon style={styles.pickerIcon} name="caret-down" />
              </TouchableOpacity>
              <TimePicker
                ref={ref => {
                  this.TimePicker = ref;
                }}
                selectedHour={selectedTime[0] || '00'}
                selectedMinute={selectedTime[1] || '00'}
                onCancel={() => this.onCancel()}
                onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
              />
            </View>
          </View>
          <View style={styles.feedPicker}>
            <Text
              style={[
                styles.feedLabel,
                {backgroundColor: '#fff', color: '#999'},
              ]}>
              Height
            </Text>
            <View style={styles.picker}>
              <RNPickerSelect
                onValueChange={value => {
                  this.setState({selectedFeed: value});
                }}
                value={selectedFeed}
                style={{
                  inputIOS: {
                    height: 60,
                    width: '100%',
                    color: '#000',
                    fontSize: 20,
                    lineHeight: 24,
                    paddingHorizontal: 12,
                  },
                  inputAndroid: {
                    height: 60,
                    width: '100%',
                    color: '#000',
                    fontSize: 20,
                    lineHeight: 24,
                    paddingHorizontal: 12,
                  },
                }}
                useNativeAndroidPickerStyle={false}
                Icon={() => (
                  <FontAwesomeIcon
                    style={styles.RNPickerIcon}
                    name="caret-down"
                  />
                )}
                placeholder={{
                  label: 'Select Feed',
                  color: '#999999',
                }}
                items={[
                  {label: 'Breastmilk', value: 'Breastmilk'},
                  {label: 'Mix', value: 'Mix'},
                  {label: 'Formula', value: 'Formula'},
                ]}
              />
            </View>
          </View>
          <View style={styles.amountPicker}>
            <Text
              style={[
                styles.amountLabel,
                {backgroundColor: '#fff', color: '#999'},
              ]}>
              Amount
            </Text>
            <View style={styles.picker}>
              {ozList ? (
                <RNPickerSelect
                  onValueChange={value => {
                    this.setState({selectedAmount: value});
                  }}
                  value={selectedAmount}
                  style={{
                    inputIOS: {
                      height: 60,
                      width: '100%',
                      color: '#000',
                      fontSize: 20,
                      lineHeight: 24,
                      paddingHorizontal: 12,
                    },
                    inputAndroid: {
                      height: 60,
                      width: '100%',
                      color: '#000',
                      fontSize: 20,
                      lineHeight: 24,
                      paddingHorizontal: 12,
                    },
                  }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <FontAwesomeIcon
                      style={styles.RNPickerIcon}
                      name="caret-down"
                    />
                  )}
                  placeholder={{
                    label: 'Select Amount',
                    color: '#999999',
                  }}
                  items={ozList}
                />
              ) : null}
            </View>
          </View>
          <View style={styles.notsInput}>
            <TextInput
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              textLabelColor="#999999"
              onChangeText={value => {
                this.setState({NotesValue: value});
              }}
              textLabelBackground="white"
              value={NotesValue}
              placeholder="Notes"
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.addbreastfeeddmButtons}>
          <View style={styles.addbreastfeedbuttons}>
            <ButtonComponent
              style={styles.buttonContainer}
              buttonStyle={styles.cancelbuttonStyle}
              buttonText="Cancel"
              buttonClicked={() => this.cancelHandler()}
            />
          </View>
          <View style={styles.addbreastfeedbuttons}>
            <ButtonComponent
              style={styles.buttonContainer}
              buttonStyle={styles.savebuttonStyle}
              buttonText="Save"
              buttonTextStyle={{color: '#fff'}}
              buttonClicked={() => this.saveHandler()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  card: state.bottleReducer,
});

// const mapDispatchToProps = {
//   dispatchBottleEdit: data => bottleActions.handleBottleEdit(data),
//   dispatchClearCard: () => bottleActions.clearMsg(),
//   dispatchResetAuthState: () => authActions.resetAuthState(),
// };

// export default connect(mapStateToProps, mapDispatchToProps)(EditBottle);
export default EditBottle;
