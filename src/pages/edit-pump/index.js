import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TextInput from '../../../src/components/TextInput';
import ButtonComponent from '../../../src/components/ButtonComponent';
import * as authActions from '../../../src/redux/actions/authActions';
import * as pumpActions from '../../../src/redux/actions/pumpActions';
import {Images} from '../../../src/assets/images';
import {isEmptyObject, showAlert} from '../../../src/utils/native';
import TimePicker from 'react-native-24h-timepicker';
import moment from 'moment';
import styles from './styles';
import CustomTimePicker from '../../components/CustomTimePicker';

class EditPumpEntry extends React.Component {
  constructor(props) {
    super(props);
    const {card} = this.props;

    let tmpLeft = this.checkTimeLen(card.pumpEdit.total_time).split(':');
    let leftTimeCount = `${tmpLeft[0]}m ${tmpLeft[1]}s`;
    let LeftTotalSeconds = parseInt(tmpLeft[0]) * 60 + parseInt(tmpLeft[1]);

    // let tmpRight = this.checkTimeLen(card.pumpEdit.right_breast).split(":");
    // let rightTimeCount = `${tmpRight[0]}m ${tmpRight[1]}s`;
    // let RightTotalSeconds = parseInt(tmpRight[0])*60 + parseInt(tmpRight[1]);

    let TotalMinutes = parseInt(tmpLeft[0]);
    let TotalSeconds = parseInt(tmpLeft[1]);
    let TotalTimeMinutes = TotalMinutes;
    let TotalTimeSeconds = TotalSeconds;

    this.state = {
      NotesValue: card.pumpEdit.note,
      // selectedStartTime: "",
      isEnabled: card.pumpEdit.manual_entry === '1' ? true : false,
      IsmanualEntry: card.pumpEdit.manual_entry === '1' ? true : false,
      IsmanualEntryRight: card.pumpEdit.manual_entry === '1' ? true : false,
      // TimeValue: "",
      time: card.pumpEdit.start_time,
      timeCount: leftTimeCount,
      timeCountRight: '',
      isActive: false,
      secondsElapsed: LeftTotalSeconds,
      isActiveRight: false,
      secondsElapsedRight: 0,
      TotalTimeMinute: TotalTimeMinutes,
      TotalTimeSecond: TotalTimeSeconds,
      ManualTotalTime: '0m 0s',
      selectedAmount: card.pumpEdit.total_amount,
      selectedAmountSec: card.pumpEdit.right_amount,
      isKeyboardShow: false,
      ozList: null,
      isTimePickerOpen: false,
    };
  }

  componentDidUpdate() {
    const {
      card: {msg},
      // dispatchClearCard,
      navigation,
    } = this.props;
    if (msg === 'EDIT_PUMP_SUCCESS') {
      // dispatchClearCard();
      this.setState(() => {
        showAlert('Success', 'baby pump update successfully.', '', () => {
          navigation.navigate('Track', {activeTab: 'Pump'});
        });
      });
    }
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
    for (let i = 0; i < 130; i++) {
      oz.push({label: `${(i / 4).toFixed(2)} OZ`, value: i / 4});
    }
    this.setState({ozList: oz});
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  getMinutes() {
    // const { card } = this.props;
    const {secondsElapsed} = this.state;
    return `00${Math.floor((secondsElapsed % 3600) / 60)}`.slice(2);
  }

  getSeconds() {
    // const { card } = this.props;
    const {secondsElapsed} = this.state;
    return `00${secondsElapsed % 60}`.slice(2);
  }

  getMinutesRight() {
    const {secondsElapsedRight} = this.state;
    return `00${Math.floor((secondsElapsedRight % 3600) / 60)}`.slice(2);
  }

  getSecondsRight() {
    const {secondsElapsedRight} = this.state;
    return `00${secondsElapsedRight % 60}`.slice(2);
  }

  startTime() {
    this.pauseTimeRight();
    this.setState({isActive: true});

    this.countdown = setInterval(() => {
      this.setState(({secondsElapsed}) => ({
        secondsElapsed: secondsElapsed + 1,
      }));
      this.TotaltimeCalculate();
    }, 1000);
  }

  TotaltimeCalculate() {
    const {secondsElapsed, secondsElapsedRight} = this.state;
    const minuteLeftMatch = `00${Math.floor(
      (secondsElapsed % 3600) / 60,
    )}`.slice(2);
    const minuteRightMatch = `00${Math.floor(
      (secondsElapsedRight % 3600) / 60,
    )}`.slice(2);
    const secondsLeftMatch = `00${secondsElapsed % 60}`.slice(2);
    const secondsRightMatch = `00${secondsElapsedRight % 60}`.slice(2);
    this.setState({
      TotalTimeSecond: parseInt(secondsLeftMatch) + parseInt(secondsRightMatch),
    });
    this.setState({
      TotalTimeMinute: parseInt(minuteLeftMatch) + parseInt(minuteRightMatch),
    });
  }

  resetTime() {
    clearInterval(this.countdown);
    clearInterval(this.countdownRight);
    this.setState({
      secondsElapsed: 0,
      isActive: false,
      secondsElapsedRight: 0,
      isActiveRight: false,
      TotalTimeSecond: 0,
      TotalTimeMinute: 0,
      timeCount: '0m 0s',
      timeCountRight: '0m 0s',
    });
  }

  pauseTime() {
    clearInterval(this.countdown);
    this.setState({isActive: false});
  }

  startTimeRight() {
    this.pauseTime();
    this.setState({isActiveRight: true});

    this.countdownRight = setInterval(() => {
      this.setState(({secondsElapsedRight}) => ({
        secondsElapsedRight: secondsElapsedRight + 1,
      }));
      this.TotaltimeCalculate();
    }, 1000);
  }

  pauseTimeRight() {
    clearInterval(this.countdownRight);
    this.setState({isActiveRight: false});
  }

  toggleSwitch() {
    clearInterval(this.countdownRight);
    this.setState({isActiveRight: false});
    clearInterval(this.countdown);
    this.setState({isActive: false});
    const {isEnabled, IsmanualEntry, IsmanualEntryRight} = this.state;
    this.setState({
      isEnabled: !isEnabled,
      IsmanualEntry: !IsmanualEntry,
      IsmanualEntryRight: !IsmanualEntryRight,
    });
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    let AMPM = hour < 12 ? 'AM' : 'PM';
    this.setState({time: `${hour}:${minute} ${AMPM}`});
    this.TimePicker.close();
  }

  ontimeCountCancel() {
    this.TimePicker2.close();
  }

  ontimeCountConfirm(minute, second) {
    this.setState({timeCount: `${minute}m ${second}s`});
    this.TimePicker2.close();
  }

  ontimeCountRightCancel() {
    this.TimePicker3.close();
  }

  ontimeCountRightConfirm(minute, second) {
    this.setState({timeCountRight: `${minute}m ${second}s`});
    this.TimePicker3.close();
  }

  ManualTotalTimeCal(left) {
    let TotalSeconf = 0;
    let TotlaMinur = 0;
    if (left) {
      const seconsLeft = left.split('s')[0];
      const valueLeft = seconsLeft.split('m')[1];
      const minutesLeft = left.split('m')[0];
      TotalSeconf = parseInt(valueLeft);
      TotlaMinur = parseInt(minutesLeft);

      if (TotalSeconf > 59) {
        TotlaMinur += Math.floor(TotalSeconf / 60);
        TotalSeconf = TotalSeconf % 60;
      }
    }
    return `${TotlaMinur}:${TotalSeconf}`;
  }

  ManualTotalTimeCalView(left, right) {
    let TotalSeconf = 0;
    let TotlaMinur = 0;
    if (left && right) {
      const secons = right.split('s')[0];
      const value = secons.split('m')[1];
      const minutes = right.split('m')[0];
      const seconsLeft = left.split('s')[0];
      const valueLeft = seconsLeft.split('m')[1];
      const minutesLeft = left.split('m')[0];

      TotalSeconf = parseInt(valueLeft) + parseInt(value);
      TotlaMinur = parseInt(minutes) + parseInt(minutesLeft);

      if (TotalSeconf > 59) {
        TotlaMinur += Math.floor(TotalSeconf / 60);
        TotalSeconf = TotalSeconf % 60;
      }

      if (TotalSeconf.toString().length === 1 && TotalSeconf > 0) {
        TotalSeconf = `0${TotalSeconf}`;
      }
    }
    return `${TotlaMinur}m ${TotalSeconf}s`;
  }

  cancelHandler() {
    const {navigation} = this.props;
    navigation.navigate('Track');
  }

  checkTimeLen(value) {
    let tmp = value.split(':');

    let _l = tmp[0];
    let _r = tmp[1].toString().length === 1 ? `0${tmp[1]}` : tmp[1];
    return `${_l}:${_r}`;
  }

  saveHandler() {
    const {
      time,
      NotesValue,
      TotalTimeMinute,
      TotalTimeSecond,
      isEnabled,
      timeCount,
      selectedAmount,
    } = this.state;
    let startGetLeftBreast = `${this.getMinutes()}:${this.getSeconds()}`;
    let startGetTotalBreast = `${TotalTimeMinute}:${TotalTimeSecond}`;
    const {card} = this.props;

    const tempLeft = isEnabled
      ? timeCount.replace('m', '').replace('s', '').split(' ')
      : startGetLeftBreast.split(':');

    if (Number(tempLeft[0]) == 0 && Number(tempLeft[1]) == 0) {
      showAlert('Success', 'Pump time must be required.', '', () => {});
      return;
    }

    let timeConvert = time.split(' ')[0];

    const data = {
      pump_id: card.pumpEdit.id,
      manual_entry: isEnabled ? '1' : '0',
      total_time: isEnabled
        ? this.ManualTotalTimeCal(timeCount)
        : startGetTotalBreast,
      start_time: isEnabled ? timeConvert : moment().format('HH:mm'),
      total_amount: selectedAmount,
      note: NotesValue,
    };
    // return;
    // const {dispatchPumpEdit} = this.props;
    // if (!isEmptyObject(data)) {
    //   dispatchPumpEdit(data);
    // }
  }

  getTimeAMPM(data) {
    return moment(data, ['HH:mm']).format('hh:mm A');
  }

  render() {
    const {
      isTimePickerOpen,
      ozList,
      isKeyboardShow,
      selectedAmount,
      selectedAmountSec,
      NotesValue,
      isEnabled,
      IsmanualEntry,
      IsmanualEntryRight,
      time,
      timeCountRight,
      timeCount,
      isActive,
      secondsElapsed,
      isActiveRight,
      secondsElapsedRight,
      TotalTimeMinute,
      TotalTimeSecond,
    } = this.state;
    let timeCountLeftConvert = timeCount
      .replace('m', '')
      .replace('s', '')
      .split(' ');

    const selectedTime = time.split(':');
    selectedTime[1] =
      selectedTime[1].length === 1 ? `0${selectedTime[1]}` : selectedTime[1];

    return (
      <View style={styles.container}>
        <Text style={styles.breastfeedTitle}>Edit a Pump Entry</Text>
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
            {isEnabled ? (
              <View style={styles.picker}>
                <TouchableOpacity
                  onPress={() => this.setState({isTimePickerOpen: true})}
                  style={styles.pickerInput}>
                  <Text style={styles.pickerInput}>
                    {this.getTimeAMPM(time)}
                  </Text>

                  <FontAwesomeIcon
                    style={styles.pickerIcon}
                    name="caret-down"
                  />
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
            ) : (
              <View style={styles.picker}>
                <TouchableOpacity style={styles.pickerInput}>
                  <Text style={styles.pickerInput}>
                    {moment().format('hh:mm A')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.manualEntryMain}>
            <View style={styles.manualEentry}>
              <TouchableOpacity
                onPress={() => this.toggleSwitch()}
                style={styles.switchToggle}>
                <Text style={styles.checkIcon}>
                  {isEnabled ? (
                    <Image
                      source={Images.AddPumpEntry.checkIcon}
                      style={styles.checkIcon}
                    />
                  ) : (
                    ''
                  )}
                </Text>
                <Switch
                  trackColor={{false: '#E0E0E0', true: '#E0E0E0'}}
                  thumbColor={isEnabled ? '#F3921F' : '#999999'}
                  onValueChange={() => this.toggleSwitch()}
                  value={isEnabled}
                />
                <View>
                  <Text style={styles.manualText}>Manual Entry</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.TimeCount}>
              <View style={styles.LeftTimeCount}>
                {/* <Text style={styles.timeTitle}>Total</Text> */}
                {IsmanualEntry === false ? (
                  <TouchableOpacity
                    style={styles.TimeStart}
                    onPress={
                      isActive ? () => this.pauseTime() : () => this.startTime()
                    }>
                    {isActive === false && secondsElapsed === 0 && (
                      <View style={styles.TimeStart}>
                        <Text style={styles.playText}>Start</Text>
                        <FontAwesomeIcon
                          style={styles.playIcon}
                          name="caret-right"
                        />
                      </View>
                    )}
                    {isActive === true && (
                      <View style={styles.TimeStart}>
                        <Text style={styles.playText}>Pause</Text>
                        <FontAwesomeIcon
                          style={styles.pauseIcon}
                          name="pause"
                        />
                      </View>
                    )}
                    {isActive === false && secondsElapsed > 0 && (
                      <View style={styles.TimeStart}>
                        <Text style={styles.playText}>Resume</Text>
                        <FontAwesomeIcon
                          style={styles.playIcon}
                          name="caret-right"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.emptyText} />
                )}
                {IsmanualEntry === false ? (
                  <Text style={styles.timeCountText}>
                    {this.getMinutes()}m {this.getSeconds()}s
                  </Text>
                ) : (
                  <View style={styles.timeCount}>
                    <TouchableOpacity
                      onPress={() => this.TimePicker2.open()}
                      style={styles.timeCountText}>
                      <Text style={styles.timeCountText}>{timeCount}</Text>
                      <FontAwesomeIcon
                        style={styles.timeCountIcon}
                        name="caret-down"
                      />
                    </TouchableOpacity>

                    <TimePicker
                      ref={ref => {
                        this.TimePicker2 = ref;
                      }}
                      selectedHour={timeCountLeftConvert[0] || '0'}
                      selectedMinute={timeCountLeftConvert[1] || '0'}
                      maxMinute="59"
                      maxHour="60"
                      onCancel={() => this.ontimeCountCancel()}
                      onConfirm={(minute, second) =>
                        this.ontimeCountConfirm(minute, second)
                      }
                    />
                  </View>
                )}
              </View>
              {/* {
								IsmanualEntry === false ? (
									<View style={styles.MiddleTimeCount}>
										<Text style={styles.timeTitle}>Total Time</Text>
										<Text style={styles.timeCountText}>
											{TotalTimeMinute}
											m
											{" "}
											{TotalTimeSecond != 0 && TotalTimeSecond.toString().length === 1 ? '0' : ''}{TotalTimeSecond}
											s
										</Text>
									</View>
								)
									: (
										<View style={styles.MiddleTimeCount}>
											<Text style={styles.timeTitle}>Total Time</Text>
											<Text style={styles.timeCountText}>{this.ManualTotalTimeCalView(timeCount, timeCountRight)}</Text>
										</View>
									)
							} */}
              {/* <View style={styles.RightTimeCount}>
								<Text style={styles.timeTitle}>Right</Text>
								{
									IsmanualEntryRight === false ? (
										<TouchableOpacity style={styles.TimeStart} onPress={isActiveRight ? () => this.pauseTimeRight() : () => this.startTimeRight()}>
											{isActiveRight === false && secondsElapsedRight === 0 && (
												<View style={styles.TimeStart}>
													<Text style={styles.playText}>Start</Text>
													<FontAwesomeIcon style={styles.playIcon} name="caret-right" />
												</View>
											)}
											{isActiveRight === true && (
												<View style={styles.TimeStart}>
													<Text style={styles.playText}>Pause</Text>
													<FontAwesomeIcon style={styles.pauseIcon} name="pause" />
												</View>
											)}
											{isActiveRight === false && secondsElapsedRight > 0 && (
												<View style={styles.TimeStart}>
													<Text style={styles.playText}>Resume</Text>
													<FontAwesomeIcon style={styles.playIcon} name="caret-right" />
												</View>
											)}
										</TouchableOpacity>
									)
										: (<Text style={styles.emptyText} />)
								}
								{
									IsmanualEntryRight === false ? (
										<Text style={styles.timeCountText}>
											{this.getMinutesRight()}
											m
											{" "}
											{this.getSecondsRight()}
											s
										</Text>
									)
										: (
											<View style={styles.timeCount}>
												<TouchableOpacity
													onPress={() => this.TimePicker3.open()}
													style={styles.timeCountText}
												>
													<Text style={styles.timeCountText}>
														{timeCountRight}
													</Text>
													<FontAwesomeIcon style={styles.timeCountIcon} name="caret-down" />
												</TouchableOpacity>

												<TimePicker
													ref={(ref) => {
														this.TimePicker3 = ref;
													}}
													selectedHour={timeCountRightConvert[0] || '0'}
													selectedMinute={timeCountRightConvert[1] || '0'}
													maxMinute="59"
													maxHour="60"
													onCancel={() => this.ontimeCountRightCancel()}
													onConfirm={(minute, second) => this.ontimeCountRightConfirm(minute, second)}
												/>
											</View>
										)
								}
							</View> */}
            </View>
            <View style={styles.ClearButton}>
              <ButtonComponent
                style={styles.clearButtonContainer}
                buttonStyle={styles.clearButtonStyle}
                buttonText="Clear"
                buttonTextStyle={{color: '#fff', fontSize: 16}}
                buttonClicked={() => this.resetTime()}
              />
            </View>
          </View>
          <View style={styles.AmountMain}>
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
                    value={Number(selectedAmount)}
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
            {/* <View style={styles.amountPicker}>
							<Text style={[styles.amountLabel, { backgroundColor: "#fff", color: "#999" }]}>Amount</Text>
							<View style={styles.picker}>
								<RNPickerSelect
									onValueChange={(value) => {
										this.setState({ selectedAmountSec: value });
									}}
									value={selectedAmountSec}
									style={{
										inputIOS: {
											height: 60,
											width: "100%",
											color: "#000",
											fontSize: 20,
											lineHeight: 24,
											paddingHorizontal: 10
										},
										inputAndroid: {
											height: 60,
											width: "100%",
											color: "#000",
											fontSize: 20,
											lineHeight: 24,
											paddingHorizontal: 10
										}
									}}
									useNativeAndroidPickerStyle={false}
									Icon={() => <FontAwesomeIcon style={styles.RNPickerIcon} name="caret-down" />}
									placeholder={{
										label: "Select Amount",
										color: "#999999"
									}}
									items={[
										{ label: "1.0 OZ", value: "1.0" },
										{ label: "2.0 OZ", value: "2.0" },
										{ label: "3.0 OZ", value: "3.0" },
										{ label: "4.0 OZ", value: "4.0" },
										{ label: "5.0 OZ", value: "5.0" },
									]}
								/>
							</View>
						</View> */}
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

// const mapStateToProps = state => ({
//   card: state.pumpReducer,
// });

// const mapDispatchToProps = {
//   dispatchPumpEdit: data => pumpActions.handlePumpEdit(data),
//   dispatchClearCard: () => pumpActions.clearMsg(),
//   dispatchResetAuthState: () => authActions.resetAuthState(),
// };

export default EditPumpEntry;
