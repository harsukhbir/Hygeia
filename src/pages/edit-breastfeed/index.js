import React from 'react';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';
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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TextInput from '../../../src/components/TextInput';
import ButtonComponent from '../../../src/components/ButtonComponent';
import {Images} from '../../../src/assets/images';
import {isEmptyObject, showAlert} from '../../../src/utils/native';
import TimePicker from 'react-native-24h-timepicker';
import moment from 'moment';
import styles from './styles';
import CustomTimePicker from '../../components/CustomTimePicker';
import {resetAuthState} from '../../store/slices/authSlice';
import {
  clearMsg,
  handleBreastfeedEdit,
} from '../../store/slices/breastfeedSlice';

class AddBreastfeedEntry extends React.Component {
  constructor(props) {
    super(props);
    const {card} = this.props;

    let tmpLeft = this.checkTimeLen(card.breastfeedEdit.left_breast).split(':');
    let leftTimeCount = `${tmpLeft[0]}m ${tmpLeft[1]}s`;
    let LeftTotalSeconds = parseInt(tmpLeft[0]) * 60 + parseInt(tmpLeft[1]);

    let tmpRight = this.checkTimeLen(card.breastfeedEdit.right_breast).split(
      ':',
    );
    let rightTimeCount = `${tmpRight[0]}m ${tmpRight[1]}s`;
    let RightTotalSeconds = parseInt(tmpRight[0]) * 60 + parseInt(tmpRight[1]);

    this.state = {
      NotesValue: card.breastfeedEdit.note,
      // // selectedStartTime: "",
      isEnabled: card.breastfeedEdit.manual_entry === '1' ? true : false,
      IsmanualEntry: card.breastfeedEdit.manual_entry === '1' ? true : false,
      IsmanualEntryRight:
        card.breastfeedEdit.manual_entry === '1' ? true : false,
      // // TimeValue: "",
      time: card.breastfeedEdit.start_time,
      timeCount: leftTimeCount,
      timeCountRight: rightTimeCount,
      isActive: false,
      secondsElapsed: LeftTotalSeconds,
      isActiveRight: false,
      secondsElapsedRight: RightTotalSeconds,
      ManualTotalTime: '0m 0s',
      isKeyboardShow: false,
      isTimePickerOpen: false,
      timeManual: card.breastfeedEdit.total_time,
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
    if (msg === 'EDIT_BREASTFEED_SUCCESS') {
      dispatchClearCard();
      this.setState(() => {
        showAlert('Success', 'baby breastfeed update successfully.', '', () => {
          const resetAction = StackActions.reset({
            index: 1,
            key: undefined,
            actions: [
              NavigationActions.navigate({routeName: 'Track'}),
              NavigationActions.navigate({routeName: 'Track'}),
            ],
          });
          navigation.dispatch(resetAction);
        });
      });
    }
  }

  getMinutes() {
    const {card} = this.props;
    const {secondsElapsed} = this.state;
    return `00${Math.floor((secondsElapsed % 3600) / 60)}`.slice(2);
  }

  getSeconds() {
    const {card} = this.props;
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
      this.setState(
        ({secondsElapsed}) => ({
          secondsElapsed: secondsElapsed + 1,
        }),
        () => {
          this.TotaltimeCalculate();
        },
      );
    }, 1000);
  }

  TotaltimeCalculate() {
    const {secondsElapsed, secondsElapsedRight} = this.state;

    const alltime = Number(secondsElapsed) + Number(secondsElapsedRight);

    let value = '0:0';

    if (alltime > 60) {
      const min = Math.floor(alltime / 60);
      const second = alltime - min * 60;
      value = `${min}:${second}`;
    } else {
      value = `0:${alltime}`;
    }

    this.setState({timeManual: value});
  }

  resetTime() {
    clearInterval(this.countdown);
    clearInterval(this.countdownRight);
    this.setState({
      secondsElapsed: 0,
      isActive: false,
      secondsElapsedRight: 0,
      isActiveRight: false,
      timeCount: '0m 0s',
      timeCountRight: '0m 0s',
      time: '09:00',
      timeManual: '0:0',
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
      this.setState(
        ({secondsElapsedRight}) => ({
          secondsElapsedRight: secondsElapsedRight + 1,
        }),
        () => {
          this.TotaltimeCalculate();
        },
      );
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
    // let AMPM = hour < 12 ? "AM" : "PM";
    this.setState({time: `${hour}:${minute}`});
    this.TimePicker.close();
  }

  ontimeCountCancel() {
    this.TimePicker2.close();
  }

  ontimeCountConfirm(minute, second) {
    this.setState({timeCount: `${minute}m ${second}s`});
    this.ManualTotalTimeCal(minute, second);
    this.TimePicker2.close();
  }

  ontimeCountRightCancel() {
    this.TimePicker3.close();
  }

  ontimeCountRightConfirm(minute, second) {
    this.setState({timeCountRight: `${minute}m ${second}s`});
    // this.ManualTotalTimeCal(minute, second);
    this.TimePicker3.close();
  }

  ManualTotalTimeCal(left, right) {
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

  saveHandler() {
    const {time, NotesValue, isEnabled, timeCount, timeCountRight, timeManual} =
      this.state;

    let startGetLeftBreast = `${this.getMinutes()}:${this.getSeconds()}`;
    let startGetRightBreast = `${this.getMinutesRight()}:${this.getSecondsRight()}`;
    const {card} = this.props;

    const tempLeft = isEnabled
      ? timeCount.replace('m', '').replace('s', '').split(' ')
      : startGetLeftBreast.split(':');
    const tempRight = isEnabled
      ? timeCountRight.replace('m', '').replace('s', '').split(' ')
      : startGetRightBreast.split(':');

    if (
      Number(tempLeft[0]) == 0 &&
      Number(tempLeft[1]) == 0 &&
      Number(tempRight[0]) == 0 &&
      Number(tempRight[1]) == 0
    ) {
      showAlert(
        'Success',
        'Left/Right breastfeet time must be required.',
        '',
        () => {},
      );
      return;
    }

    let timeConvert = time.split(' ')[0];
    let timeCountLeftConvert = timeCount
      .replace('m', '')
      .replace('s', '')
      .split(' ')
      .join(':');
    let timeCountRightConvert = timeCountRight
      .replace('m', '')
      .replace('s', '')
      .split(' ')
      .join(':');

    const data = {
      breastfeed_id: card.breastfeedEdit.id,
      start_time: isEnabled ? timeConvert : moment().format('HH:mm'),
      left_breast: isEnabled
        ? timeCountLeftConvert
        : this.checkTimeLen(startGetLeftBreast),
      right_breast: isEnabled
        ? timeCountRightConvert
        : this.checkTimeLen(startGetRightBreast),
      total_time: isEnabled
        ? this.ManualTotalTimeCal(timeCount, timeCountRight)
        : timeManual,
      manual_entry: isEnabled ? '1' : '0',
      note: NotesValue,
    };

    const {dispatchBreastfeedEdit} = this.props;
    if (!isEmptyObject(data)) {
      dispatchBreastfeedEdit(data);
    }
  }

  getTimeAMPM(data) {
    return moment(data, ['HH:mm']).format('hh:mm A');
  }

  checkTimeLen(value) {
    let tmp = value.split(':');

    let _l = tmp[0];
    let _r = tmp[1].toString().length === 1 ? `0${tmp[1]}` : tmp[1];
    return `${_l}:${_r}`;
  }

  render() {
    const {
      isTimePickerOpen,
      isKeyboardShow,
      NotesValue,
      isEnabled,
      IsmanualEntry,
      ManualTotalTime,
      IsmanualEntryRight,
      time,
      timeCountRight,
      timeCount,
      isActive,
      secondsElapsed,
      isActiveRight,
      secondsElapsedRight,
      timeManual,
    } = this.state;

    let timeCountLeftConvert = timeCount
      .replace('m', '')
      .replace('s', '')
      .split(' ');
    let timeCountRightConvert = timeCountRight
      .replace('m', '')
      .replace('s', '')
      .split(' ');

    const selectedTime = time.split(':');
    selectedTime[1] =
      selectedTime[1].length === 1 ? `0${selectedTime[1]}` : selectedTime[1];
    return (
      <View style={styles.container}>
        <Text style={styles.breastfeedTitle}>Edit a Breastfeed Entry</Text>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: isKeyboardShow ? 0.5 : 1}}>
          <View style={styles.startTimePicker}>
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
                {/* <TimePicker
											ref={(ref) => {
												this.TimePicker = ref;
											}}
											selectedHour={selectedTime[0] || "00"}
											selectedMinute={selectedTime[1] || "00"}
											onCancel={() => this.onCancel()}
											onConfirm={(hour, minute,) => this.onConfirm(hour, minute)}
										/> */}
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
                      source={Images.AddBreastfeedEntry.checkIcon}
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
                <Text style={styles.timeTitle}>Left</Text>
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
              {IsmanualEntry === false ? (
                <View style={styles.MiddleTimeCount}>
                  <Text style={styles.timeTitle}>Total Time</Text>
                  <Text style={styles.timeCountText}>
                    {`${timeManual.split(':')[0]}m ${
                      timeManual.split(':')[1]
                    }s`}
                  </Text>
                </View>
              ) : (
                <View style={styles.MiddleTimeCount}>
                  <Text style={styles.timeTitle}>Total Time</Text>
                  <Text style={styles.timeCountText}>
                    {this.ManualTotalTimeCalView(timeCount, timeCountRight)}
                  </Text>
                </View>
              )}
              <View style={styles.RightTimeCount}>
                <Text style={styles.timeTitle}>Right</Text>
                {IsmanualEntryRight === false ? (
                  <TouchableOpacity
                    style={styles.TimeStart}
                    onPress={
                      isActiveRight
                        ? () => this.pauseTimeRight()
                        : () => this.startTimeRight()
                    }>
                    {isActiveRight === false && secondsElapsedRight === 0 && (
                      <View style={styles.TimeStart}>
                        <Text style={styles.playText}>Start</Text>
                        <FontAwesomeIcon
                          style={styles.playIcon}
                          name="caret-right"
                        />
                      </View>
                    )}
                    {isActiveRight === true && (
                      <View style={styles.TimeStart}>
                        <Text style={styles.playText}>Pause</Text>
                        <FontAwesomeIcon
                          style={styles.pauseIcon}
                          name="pause"
                        />
                      </View>
                    )}
                    {isActiveRight === false && secondsElapsedRight > 0 && (
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
                {IsmanualEntryRight === false ? (
                  <Text style={styles.timeCountText}>
                    {this.getMinutesRight()}m {this.getSecondsRight()}s
                  </Text>
                ) : (
                  <View style={styles.timeCount}>
                    <TouchableOpacity
                      onPress={() => this.TimePicker3.open()}
                      style={styles.timeCountText}>
                      <Text style={styles.timeCountText}>{timeCountRight}</Text>
                      <FontAwesomeIcon
                        style={styles.timeCountIcon}
                        name="caret-down"
                      />
                    </TouchableOpacity>

                    <TimePicker
                      ref={ref => {
                        this.TimePicker3 = ref;
                      }}
                      selectedHour={timeCountRightConvert[0] || '0'}
                      selectedMinute={timeCountRightConvert[1] || '0'}
                      maxMinute="59"
                      maxHour="60"
                      onCancel={() => this.ontimeCountRightCancel()}
                      onConfirm={(minute, second) =>
                        this.ontimeCountRightConfirm(minute, second)
                      }
                    />
                  </View>
                )}
              </View>
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
  card: state.breastfeed,
});

const mapDispatchToProps = {
  dispatchBreastfeedEdit: data => handleBreastfeedEdit(data),
  dispatchResetAuthState: () => resetAuthState(),
  dispatchClearCard: () => clearMsg(),
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBreastfeedEntry);
