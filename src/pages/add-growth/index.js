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
// import { Switch } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TextInput from '../../../src/components/TextInput';
import ButtonComponent from '../../../src/components/ButtonComponent';
import {isEmptyObject, showAlert} from '../../../src/utils/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import styles from './styles';
import {CLEAR_MSG, handleGrowthCreate} from '../../store/slices/growthSlice';
import {resetAuthState} from '../../store/slices/authSlice';
import {getActiveBaby} from '../../store/selectors';

class AddGrowth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NotesValue: '',
      // selectedStartTime: "",
      // TimeValue: "",
      time: moment().format('MMM DD, YYYY'),
      selectedAmount: '31.4',
      selectedHeight: '28',
      isDatePickerVisible: false,
      value: moment().format('MMM DD, YYYY'),
      isKeyboardShow: false,
      heightList: null,
      weightList: null,
      // heightList: null,
      weightLBList: null,
      weightOZList: null,
      selectedLBWeight: 0,
      selectedOZWeight: 0,
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

    let height = [];
    for (let i = 0; i < 100; i++) {
      height.push({label: `${i / 2} Inches`, value: i / 2});
    }

    let weightLB = [];
    for (let i = 0; i < 50; i++) {
      weightLB.push({label: `${i} lb`, value: i});
    }

    let weightOZ = [];
    for (let i = 0; i < 16; i++) {
      weightOZ.push({label: `${i} oz`, value: i});
    }
    this.setState({
      weightOZList: weightOZ,
      weightLBList: weightLB,
      heightList: height,
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidUpdate() {
    const {
      card: {msg},
      dispatchClearCard,
      navigation,
    } = this.props;
    if (msg === 'ADD_GROWTH_SUCCESS') {
      dispatchClearCard();
      this.setState(() => {
        showAlert('Success', 'Growth created successfully.', '', () => {
          navigation.navigate('Track', {activeTab: 'Growth'});
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
    const {
      time,
      NotesValue,
      selectedAmount,
      selectedHeight,
      value,
      selectedLBWeight,
      selectedOZWeight,
    } = this.state;
    const {dispatchGrowthCreate, activeBaby} = this.props;
    const data = {
      babyprofile_id: activeBaby.id,
      date: value
        ? moment(value).format('DD-MM-YYYY')
        : moment().format('DD-MM-YYYY'),
      height: selectedHeight,
      weight_lb: selectedLBWeight,
      weight_oz: selectedOZWeight,
      note: NotesValue,
    };
    if (!isEmptyObject(data)) {
      dispatchGrowthCreate(data);
    }
  }

  showDatePicker() {
    this.setState({isDatePickerVisible: true});
    Keyboard.dismiss();
  }

  hideDatePicker(date) {
    this.setState({isDatePickerVisible: false});
    this.setState({value: moment(date).format('MMM DD, YYYY')});
  }

  handleConfirm(date) {
    this.hideDatePicker();
    if (moment(date).isAfter(moment())) {
      showAlert('Error', 'Date should be less than future date.', '', () => {});
      return;
    }
    this.setState({value: moment(date).format('MMM DD, YYYY')});
  }

  render() {
    const {
      weightLBList,
      weightOZList,
      heightList,
      selectedOZWeight,
      selectedLBWeight,
      NotesValue,
      time,
      selectedAmount,
      selectedHeight,
      isDatePickerVisible,
      value,
      isKeyboardShow,
    } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.breastfeedTitle}>Add a Growth Entry</Text>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: isKeyboardShow ? 0.5 : 1}}>
          <View style={styles.startTimePicker}>
            <Text
              style={[
                styles.pickerLabel,
                {backgroundColor: '#fff', color: '#999'},
              ]}>
              Date
            </Text>
            <View style={styles.picker}>
              <TouchableOpacity
                onPress={() => this.showDatePicker()}
                style={styles.pickerInput}>
                <Text style={styles.pickerInput}>
                  {moment(value).format('MMM DD, YYYY')}
                </Text>

                <FontAwesomeIcon style={styles.pickerIcon} name="caret-down" />
              </TouchableOpacity>
              <DateTimePickerModal
                date={value ? new Date(value) : new Date()}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={date => this.handleConfirm(date)}
                onCancel={date => this.hideDatePicker(date)}
              />
            </View>
          </View>
          <View style={styles.pickerInputContainer}>
            <Text
              style={[
                styles.pickerLabel,
                {backgroundColor: '#fff', color: '#999'},
              ]}>
              Height
            </Text>
            <View style={styles.picker}>
              {heightList ? (
                <RNPickerSelect
                  onValueChange={value => {
                    this.setState({selectedHeight: value});
                  }}
                  value={selectedHeight}
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
                    <MaterialIcon style={styles.RNPickerIcon}>
                      keyboard_arrow_down
                    </MaterialIcon>
                  )}
                  placeholder={{
                    label: 'Select Height',
                    color: '#999999',
                  }}
                  items={heightList}
                />
              ) : null}
            </View>
          </View>
          <View style={styles.pickerInputContainer}>
            <Text
              style={[
                styles.pickerLabel,
                {backgroundColor: '#fff', color: '#999'},
              ]}>
              Weight
            </Text>
            <View style={styles.weightPicker}>
              <View style={styles.weightLBPicker}>
                {weightLBList ? (
                  <RNPickerSelect
                    onValueChange={value => {
                      this.setState({selectedLBWeight: value});
                    }}
                    value={selectedLBWeight}
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
                      <MaterialIcon style={styles.RNPickerIcon}>
                        keyboard_arrow_down
                      </MaterialIcon>
                    )}
                    placeholder={{
                      label: '',
                    }}
                    items={weightLBList}
                  />
                ) : null}
              </View>
              <View style={styles.weightOZPicker}>
                {weightOZList ? (
                  <RNPickerSelect
                    onValueChange={value => {
                      this.setState({selectedOZWeight: value});
                    }}
                    value={selectedOZWeight}
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
                      <MaterialIcon style={styles.RNPickerIcon}>
                        keyboard_arrow_down
                      </MaterialIcon>
                    )}
                    placeholder={{
                      label: '',
                    }}
                    items={weightOZList}
                  />
                ) : null}
              </View>
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
  card: state.growth,
  activeBaby: getActiveBaby(state),
});

const mapDispatchToProps = {
  dispatchGrowthCreate: data => handleGrowthCreate(data),
  dispatchClearCard: () => CLEAR_MSG(),
  dispatchResetAuthState: () => resetAuthState(),
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGrowth);
