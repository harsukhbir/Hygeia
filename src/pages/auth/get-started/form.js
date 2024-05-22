import React from 'react';
import {
  View,
  Image,
  Picker,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Images} from '../../../../src/assets/images';
import TextInput from '../../../../src/components/TextInput';
import ButtonComponent from '../../../../src/components/ButtonComponent';
import {isEmpty} from '../../../../src/utils/native';
import {translate} from '../../../../src/locales/i18n';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Moment from 'moment';
import styles from './styles';

class GetStartedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      DOB: '',
      selectedHeight: '',
      avatarSource: null,
      Babys: [
        {
          index: 1,
          fullName: '',
          DOB: Moment().format('MMM DD, YYYY'),
          selectedHeight: '',
          selectedLBWeight: 0,
          selectedOZWeight: 0,
          avatarSource: null,
          selectedOZWeightErrMsg: '',
          selectedLBWeightErrMsg: '',
          isDatePickerVisible: false,
        },
      ],
      isDatePickerVisible: false,
      value: 'August 22, 2020',
      heightList: null,
      weightLBList: null,
      weightOZList: null,
    };
  }

  componentDidMount() {
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
    for (let i = 0; i < 16; i++) {
      weightOZ.push({label: `${i} oz`, value: i});
    }
    this.setState({weightOZList: weightOZ});
  }

  isValid = () => {
    const {Babys} = this.state;

    let ErrorMsg = true;
    Babys.forEach(el => {
      if (isEmpty(el.fullName)) {
        el.fullNameErrMsg = 'Name is required';
        ErrorMsg = false;
      }
      if (isEmpty(el.selectedHeight)) {
        el.selectedHeightErrMsg = 'Height is required';
        ErrorMsg = false;
      }
      // if(isEmpty(el.avatarSource)) {
      // 	el.avatarSourceErrMsg = "Image is required";
      // 	ErrorMsg = false;
      // }
      if (isEmpty(el.selectedLBWeight)) {
        el.selectedLBWeightErrMsg = 'Weight is requied';
        ErrorMsg = false;
      }
      if (isEmpty(el.selectedOZWeight)) {
        el.selectedOZWeightErrMsg = 'Weight is requied';
        ErrorMsg = false;
      }
      if (
        !isEmpty(el.fullName) &&
        !isEmpty(el.selectedHeight) &&
        !isEmpty(el.avatarSource) &&
        !isEmpty(el.selectedOZWeight) &&
        !isEmpty(el.selectedLBWeight)
      ) {
        ErrorMsg = true;
      }
      return el;
    });
    this.setState({validateInput: false});
    return ErrorMsg;
  };

  onSubmit = () => {
    const {submitForm} = this.props;
    const {Babys} = this.state;
    if (this.isValid()) {
      let data = new FormData();
      if (Babys.length > 1) {
        Babys.forEach((el, index) => {
          if (el.avatarSource) {
            data.append(`profile[${index}][baby_profileupload]`, {
              name: el.avatarSource.fileName,
              type: el.avatarSource.type,
              uri: el.avatarSource.uri,
            });
          }
          data.append(`profile[${index}][name]`, el.fullName);
          data.append(
            `profile[${index}][birthday]`,
            el.DOB ? el.DOB : Moment().format('MMM DD, YYYY'),
          );
          data.append(`profile[${index}][height]`, el.selectedHeight);
          data.append(`profile[${index}][weight_lb]`, el.selectedLBWeight);
          data.append(`profile[${index}][weight_oz]`, el.selectedOZWeight);
        });
      } else {
        if (Babys[0].avatarSource) {
          data.append('baby_profileupload', {
            name: Babys[0].avatarSource.fileName,
            type: Babys[0].avatarSource.type,
            uri: Babys[0].avatarSource.uri,
          });
        }
        data.append('name', Babys[0].fullName);
        data.append('birthday', Babys[0].DOB);
        data.append('height', Babys[0].selectedHeight);
        data.append('weight_lb', Babys[0].selectedLBWeight);
        data.append('weight_oz', Babys[0].selectedOZWeight);
      }
      submitForm(data);
    }
    /* REQUIRED FIELDS VALIDATION */
    // if (this.isValid() === false) {
    // 	this.setState({ validateInput: true });
    // 	return true;
    // }
  };

  resetForm = () => {
    this.setState({
      fullName: '',
      DOB: '',
      selectedHeight: '',
      selectedLBWeight: 0,
      selectedOZWeight: 0,
      validateInput: false,
    });
  };

  showDatePicker(value) {
    const {Babys} = this.state;

    const data = Babys.filter(el => {
      if (el.index === value.index) {
        el.isDatePickerVisible = true;
      }
      return el;
    });
    this.setState({Babys: data});
    // this.setState({ isDatePickerVisible: true });
    Keyboard.dismiss();
  }

  hideDatePicker(date, value) {
    // this.setState({ isDatePickerVisible: false });
    const {Babys} = this.state;

    const data = Babys.filter(el => {
      if (el.index === value.index) {
        el.isDatePickerVisible = false;
        el.value = Moment(date).format('MMM DD, YYYY');
      }
      return el;
    });
    this.setState({Babys: data});
  }

  handleConfirm(date, value) {
    // this.hideDatePicker();
    const {Babys} = this.state;

    const data = Babys.filter(el => {
      if (el.index === value.index) {
        el.isDatePickerVisible = false;
        el.DOB = Moment(date).format('MMM DD, YYYY');
      }
      return el;
    });
    this.setState({Babys: data});
  }

  selectPhotoTapped(value) {
    const options = {
      title: 'Select file',
      mediaType: 'photo',
    };
    const {Babys} = this.state;

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else {
        const data = Babys.filter(el => {
          if (el.index === value.index) {
            el.avatarSource = response;
          }
          return el;
        });
        this.setState({Babys: data});
        // this.setState({ avatarSource: response })
      }
    });
  }

  onChangeHeight(text, value) {
    const {Babys} = this.state;

    const data = Babys.filter(el => {
      if (el.index === value.index) {
        el.selectedHeight = text;
      }
      return el;
    });
    this.setState({Babys: data});
  }

  onChangeText(text, value) {
    const {Babys} = this.state;

    const data = Babys.filter(el => {
      if (el.index === value.index) {
        el.fullName = text;
      }
      return el;
    });
    this.setState({Babys: data});
  }

  onChangeWeightLB(text, value) {
    const {Babys} = this.state;

    const data = Babys.filter(el => {
      if (el.index === value.index) {
        el.selectedLBWeight = text;
      }
      return el;
    });
    this.setState({Babys: data});
  }

  onChangeWeightOZ(text, value) {
    const {Babys} = this.state;

    const data = Babys.filter(el => {
      if (el.index === value.index) {
        el.selectedOZWeight = text;
      }
      return el;
    });
    this.setState({Babys: data});
  }

  addOtherBaby() {
    const data = this.state.Babys;
    data.push({
      fullName: '',
      index: this.state.Babys.length + 1,
      DOB: Moment().format('MMM DD, YYYY'),
      selectedHeight: '',
      selectedLBWeight: 0,
      selectedOZWeight: 0,
      avatarSource: null,
      isDatePickerVisible: false,
    });
    this.setState({Babys: data});
  }

  render() {
    const {
      weightLBList,
      weightOZList,
      heightList,
      validateInput,
      avatarSource,
      Babys,
      fullName,
      DOB,
      selectedHeight,
      isDatePickerVisible,
      value,
    } = this.state;
    return (
      <View style={styles.formContainer}>
        {Babys.map((el, index) => {
          return (
            <View style={styles.formContainerInner}>
              <TouchableOpacity onPress={data => this.selectPhotoTapped(el)}>
                {el.avatarSource === null ? (
                  <Image
                    source={Images.authScreen.imagePlaceholder}
                    style={styles.imagePlaceholder}
                  />
                ) : (
                  <Image
                    source={{
                      uri: el.avatarSource.uri,
                      type: 'image/jpeg',
                      name: el.avatarSource.filename,
                    }}
                    style={{width: 125, height: 125, borderRadius: 80}}
                  />
                )}
              </TouchableOpacity>
              {isEmpty(el.avatarSource) && el.avatarSourceErrMsg && (
                <Text style={[styles.error, {textAlign: 'center'}]}>
                  {isEmpty(el.avatarSourceErrMsg) ? '' : el.avatarSourceErrMsg}
                </Text>
              )}
              <TextInput
                style={styles.textInputContainer}
                textLabelBackground="#E8BC7D"
                textLabelColor="#fff"
                value={el.fullName}
                placeholder={translate('signupScreen.fullNamePlaceholder')}
                isInvalid={el.validateInput && isEmpty(el.fullName)}
                returnKeyType="next"
                onChangeText={value => this.onChangeText(value, el)}
                textLabelColor="#fff"
              />
              {isEmpty(el.fullName) && el.fullNameErrMsg && (
                <Text style={styles.error}>
                  {isEmpty(el.fullNameErrMsg) ? '' : el.fullNameErrMsg}
                </Text>
              )}
              <View style={styles.pickerInputContainer}>
                <Text
                  style={[
                    styles.pickerLabel,
                    {backgroundColor: '#E8BC7D', color: '#fff'},
                  ]}>
                  Birthday
                </Text>
                {el.isDatePickerVisible}
                <View style={styles.picker}>
                  <TouchableOpacity
                    onPress={() => this.showDatePicker(el)}
                    style={styles.pickerInput}>
                    <Text style={styles.pickerInput}>
                      {Moment(el.DOB).format('MMM DD, YYYY')}
                    </Text>
                  </TouchableOpacity>
                  <MaterialIcon style={styles.pickerIcon}>
                    keyboard_arrow_down
                  </MaterialIcon>

                  <DateTimePickerModal
                    date={el.DOB ? new Date(el.DOB) : new Date()}
                    isVisible={el.isDatePickerVisible}
                    mode="date"
                    onConfirm={date => this.handleConfirm(date, el)}
                    onCancel={date => this.hideDatePicker(date, el)}
                    maximumDate={new Date()}
                  />
                </View>
              </View>
              <View style={styles.pickerInputContainer}>
                <Text
                  style={[styles.pickerLabel, {backgroundColor: '#E8BC7D'}]}>
                  Birth Height
                </Text>
                <View style={styles.picker}>
                  {heightList ? (
                    <RNPickerSelect
                      onValueChange={
                        value => this.onChangeHeight(value, el)
                        // this.setState({ selectedHeight: itemValue });
                      }
                      value={el.selectedHeight}
                      style={{
                        inputIOS: {
                          height: 60,
                          width: '100%',
                          color: '#fff',
                          fontSize: 20,
                          lineHeight: 24,
                          paddingHorizontal: 12,
                        },
                        inputAndroid: {
                          height: 60,
                          width: '100%',
                          color: '#fff',
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
                      items={heightList}
                    />
                  ) : null}
                </View>
                {isEmpty(el.selectedHeight) && el.selectedHeightErrMsg && (
                  <Text style={styles.error}>
                    {isEmpty(el.selectedHeightErrMsg)
                      ? ''
                      : el.selectedHeightErrMsg}
                  </Text>
                )}
              </View>
              <View style={styles.pickerInputContainer}>
                <Text
                  style={[styles.pickerLabel, {backgroundColor: '#E8BC7D'}]}>
                  Birth Weight
                </Text>
                <View style={styles.weightPicker}>
                  <View style={styles.weightLBPicker}>
                    {weightLBList ? (
                      <RNPickerSelect
                        onValueChange={
                          value => this.onChangeWeightLB(value, el)
                          // this.setState({ selectedHeight: itemValue });
                        }
                        value={el.selectedLBWeight}
                        style={{
                          inputIOS: {
                            height: 60,
                            width: '100%',
                            color: '#fff',
                            fontSize: 20,
                            lineHeight: 24,
                            paddingHorizontal: 12,
                          },
                          inputAndroid: {
                            height: 60,
                            width: '100%',
                            color: '#fff',
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
                        onValueChange={
                          value => this.onChangeWeightOZ(value, el)
                          // this.setState({ selectedHeight: itemValue });
                        }
                        value={el.selectedOZWeight}
                        style={{
                          inputIOS: {
                            height: 60,
                            width: '100%',
                            color: '#fff',
                            fontSize: 20,
                            lineHeight: 24,
                            paddingHorizontal: 12,
                          },
                          inputAndroid: {
                            height: 60,
                            width: '100%',
                            color: '#fff',
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
                {isEmpty(el.selectedLBWeight) && (
                  <Text style={styles.error}>
                    {isEmpty(el.selectedLBWeightErrMsg)
                      ? ''
                      : el.selectedOZWeightErrMsg}
                  </Text>
                )}
                {isEmpty(el.selectedOZWeight) && (
                  <Text style={styles.error}>
                    {isEmpty(el.selectedOZWeightErrMsg)
                      ? ''
                      : el.selectedOZWeightErrMsg}
                  </Text>
                )}
              </View>
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.addAnother}
          onPress={() => this.addOtherBaby()}>
          <MaterialIcon style={styles.addAnotherIcon}>add_circle</MaterialIcon>
          <Text style={styles.addAnotherText}>Add Another Baby</Text>
        </TouchableOpacity>

        <ButtonComponent
          buttonClicked={() => {
            this.onSubmit();
          }}
          style={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          buttonText="save"
        />
      </View>
    );
  }
}

export default GetStartedForm;
