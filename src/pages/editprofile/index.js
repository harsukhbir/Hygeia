import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TextInput from '../../../src/components/TextInput';
import ButtonComponent from '../../../src/components/ButtonComponent';
import * as authActions from '../../../src/redux/actions/authActions';
import * as userAction from '../../../src/redux/actions/userAction';
import {Images} from '../../../src/assets/images';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Moment from 'moment';
// import { translate } from "../../../src/locales/i18n";
import styles from './styles';
import moment from 'moment';
import ImageResizer from '@bam.tech/react-native-image-resizer';

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBirthday: '',
      selectedHeight: '',
      selectedLBWeight: 0,
      selectedOZWeight: 0,
      nameValue: '',
      babyprofile_id: '',
      imageUrl: null,
      isDatePickerVisible: false,
      value: new Date(),
      avatarSource: '',
      heightList: null,
      weightLBList: null,
      weightOZList: null,
      opened: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    if (navigation.state.params && navigation.state.params.data) {
      this.setState({
        babyprofile_id: navigation.state.params.data.id,
        selectedHeight: Number(navigation.state.params.data.height),
        selectedLBWeight: Number(navigation.state.params.data.weight_lb),
        selectedOZWeight: Number(navigation.state.params.data.weight_oz),
        nameValue: navigation.state.params.data.name,
        value: navigation.state.params.data.birthday,
        imageUrl: navigation.state.params.data.baby_profileupload,
      });
    }
    let height = [];
    for (let i = 0; i < 100; i++) {
      height.push({label: `${i / 2} Inches`, value: i / 2});
    }
    this.setState({heightList: height});

    let weightLB = [];
    for (let i = 0; i < 50; i++) {
      weightLB.push({label: `${i} lb`, value: i});
    }
    this.setState({weightLBList: weightLB});

    let weightOZ = [];
    for (let i = 0; i < 50; i++) {
      weightOZ.push({label: `${i} oz`, value: i});
    }
    this.setState({weightOZList: weightOZ});
  }

  // componentDidUpdate(prevProps) {

  // 	if (prevProps.babyDetails !== this.props.babyDetails) {
  // 		if (this.props.babyDetails.babyDetails.length > 0) {
  // 			this.setState({
  // 				babyprofile_id: this.props.babyDetails.babyEdit.id,
  // 				selectedHeight: this.props.babyDetails.babyEdit.height,
  // 				selectedWeight: this.props.babyDetails.babyEdit.weight,
  // 				nameValue: this.props.babyDetails.babyEdit.name,
  // 				value: this.props.babyDetails.babyEdit.birthday,
  // 				imageUrl: this.props.babyDetails.babyEdit.baby_profileupload
  // 			})
  // 		}
  // 	}
  // }

  logOutHandler() {
    console.log('log out clicked');
    // const {dispatchResetAuthState} = this.props;
    // dispatchResetAuthState();
  }

  cancelbuttonClicked() {
    const {navigation} = this.props;
    navigation.pop();
  }

  savebuttonClicked() {
    const {
      avatarSource,
      nameValue,
      value,
      selectedHeight,
      selectedLBWeight,
      selectedOZWeight,
      babyprofile_id,
    } = this.state;
    const {
      // dispatchUpdateProfile,
      navigation,
    } = this.props;
    let data = new FormData();
    if (avatarSource) {
      data.append('baby_profileupload', {
        name: avatarSource.fileName,
        type: avatarSource.type,
        uri: avatarSource.uri,
      });
    }
    if (avatarSource === null) {
      data.append('baby_profileupload', null);
    }
    data.append('name', nameValue);
    data.append('babyprofile_id', babyprofile_id);
    data.append('birthday', moment(value).format('YYYY-MM-DD'));
    data.append('height', selectedHeight);
    data.append('weight_oz', selectedOZWeight);
    data.append('weight_lb', selectedLBWeight);
    // dispatchUpdateProfile(data, navigation);
    // navigation.navigate("Dashboard");
  }

  showDatePicker() {
    this.setState({isDatePickerVisible: true});
    Keyboard.dismiss();
  }

  hideDatePicker(date) {
    this.setState({isDatePickerVisible: false});
    this.setState({value: Moment(date).format('MMM DD, YYYY')});
  }

  handleConfirm(date) {
    this.hideDatePicker();
    this.setState({value: Moment(date).format('MMM DD, YYYY')});
  }

  selectPhotoTapped(data) {
    const options = {
      title: 'Select file',
      mediaType: 'photo',
      quality: 0.7,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }

      ImageResizer.createResizedImage(response.uri, 200, 200, 'JPEG', 0.5)
        .then(res => {
          this.setState({
            avatarSource: {
              fileName: res.name,
              type: response.type,
              uri: res.uri,
            },
            imageUrl: res.uri,
          });
        })
        .catch(err => {
          this.setState({avatarSource: response, imageUrl: response.uri});
        });
    });
  }

  render() {
    const {
      weightLBList,
      weightOZList,
      heightList,
      selectedLBWeight,
      selectedOZWeight,
      imageUrl,
      avatarSource,
      selectedHeight,
      nameValue,
      isDatePickerVisible,
      value,
    } = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.editprofileTitle}>Edit Baby Profile</Text>
          <View style={styles.editprofileForm}>
            <Menu
              opened={this.state.opened}
              onBackdropPress={() => this.setState({opened: false})}>
              <MenuTrigger
                style={styles.MenuuserprofileIcon}
                onPress={() => this.setState({opened: true})}>
                <View style={styles.userprofileIcon}>
                  {imageUrl !== null ? (
                    <Image
                      source={{uri: imageUrl}}
                      style={{width: 125, height: 125, borderRadius: 80}}
                    />
                  ) : (
                    <Image
                      source={Images.eidtProfile.userprofileIcon}
                      style={styles.userprofilebutton}
                    />
                  )}
                  <Image
                    source={Images.eidtProfile.cameraIcon}
                    style={styles.cameraIcon}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions
                style={styles.menuOptionS}
                optionsContainerStyle={{
                  marginTop: 125,
                  marginLeft: 85,
                  maxWidth: 160,
                  elevation: 10,
                }}>
                <MenuOption style={styles.menuOption}>
                  <TouchableOpacity
                    onPress={data => {
                      this.selectPhotoTapped(data);
                      this.setState({opened: false});
                    }}>
                    <View
                      style={[
                        styles.avatar,
                        styles.avatarContainer,
                        {marginBottom: 20},
                      ]}>
                      <Text style={styles.menuOptionText}>Change Photo</Text>
                    </View>
                  </TouchableOpacity>
                </MenuOption>
                <MenuOption style={styles.menuOption}>
                  <Text
                    style={styles.menuOptionText}
                    onPress={() =>
                      this.setState({
                        avatarSource: null,
                        imageUrl: null,
                        opened: false,
                      })
                    }>
                    Remove
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>

            <TextInput
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              textLabelColor="#999999"
              onChangeText={value => {
                this.setState({nameValue: value});
              }}
              textLabelBackground="white"
              value={nameValue}
              placeholder="Name"
            />
            <View style={styles.pickerInputContainer}>
              <Text
                style={[
                  styles.pickerLabel,
                  {backgroundColor: '#fff', color: '#999'},
                ]}>
                Birthday
              </Text>
              <View style={styles.picker}>
                <TouchableOpacity
                  onPress={() => this.showDatePicker()}
                  style={styles.pickerInput}>
                  <Text style={styles.pickerInput}>
                    {Moment(value).format('MMM DD, YYYY')}
                  </Text>
                </TouchableOpacity>
                <MaterialIcon style={styles.pickerIcon}>
                  keyboard_arrow_down
                </MaterialIcon>
                <DateTimePickerModal
                  date={value ? new Date(value) : new Date()}
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={date => this.handleConfirm(date)}
                  onCancel={date => this.hideDatePicker(date)}
                  maximumDate={new Date()}
                />
              </View>
            </View>
            <View style={styles.pickerInputContainer}>
              <Text
                style={[
                  styles.pickerLabel,
                  {backgroundColor: '#fff', color: '#999'},
                ]}>
                Birth Height
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
                Birth Weight
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
          </View>
        </ScrollView>
        <View style={styles.profilebottomButtons}>
          <View style={styles.profilebuttons}>
            <ButtonComponent
              style={styles.buttonContainer}
              buttonStyle={styles.cancelbuttonStyle}
              buttonText="Cancel"
              buttonClicked={() => this.cancelbuttonClicked()}
            />
          </View>
          <View style={styles.profilebuttons}>
            <ButtonComponent
              style={styles.buttonContainer}
              buttonStyle={styles.savebuttonStyle}
              buttonTextStyle={styles.savebuttontextStyle}
              buttonText="Save"
              buttonClicked={() => this.savebuttonClicked()}
            />
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  babyDetails: state.userReducer,
});

// const mapDispatchToProps = {
//   dispatchResetAuthState: () => authActions.resetAuthState(),
//   dispatchUserProfileGet: () => userAction.getBadyProfile(),
//   dispatchUpdateProfile: (data, navigation) =>
//     userAction.updateProfileData(data, navigation),
// };

// export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
export default EditProfileScreen;
