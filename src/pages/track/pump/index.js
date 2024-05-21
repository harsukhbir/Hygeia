import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {Images} from '../../../../src/assets/images';
import {isEmptyObject} from '../../../../src/utils/native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import moment from 'moment';
// ! fix the foucused
// import {withNavigationFocus} from '@react-navigation/native';
import styles from '../styles';
import SetAlarmComponent from '../components/SetAlarmComponent';

class PumpCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: '',
      ViewNoteModal: false,
      isAlarmModal: false,
    };
  }

  // componentDidMount() {
  // 	const data = {
  // 		babyprofile_id: "4",
  // 		date: "13-01-2021",
  // 	};
  // 	const { dispatchPumpListing } = this.props;
  // 	if(!isEmptyObject(data)) {
  // 		dispatchPumpListing(data);
  // 	}
  // }

  // componentDidMount() {
  //   const {currentDate, activeBaby} = this.props;
  //   this.pumpFunction(currentDate, activeBaby);
  // }

  // componentDidUpdate(prevProps) {
  //   const {currentDate, activeBaby} = this.props;
  //   if (
  //     currentDate !== prevProps?.currentDate ||
  //     (prevProps?.activeBaby &&
  //       activeBaby &&
  //       prevProps?.activeBaby.id !== activeBaby.id)
  //   ) {
  //     this.pumpFunction(currentDate, activeBaby);
  //   }

  //   if (
  //     prevProps?.tabReducer.activeTab !== this.props.tabReducer.activeTab &&
  //     activeBaby &&
  //     activeBaby.id
  //   ) {
  //     if (this.props.tabReducer.activeTab === 'Track') {
  //       this.fetchAlarmValue(activeBaby);
  //     }
  //   }
  //   // if(prevProps?.tabReducer.activeT)

  //   if (
  //     prevProps?.tabReducer.trackActiveTab !==
  //       this.props.tabReducer.trackActiveTab &&
  //     activeBaby &&
  //     activeBaby.id
  //   ) {
  //     if (this.props.tabReducer.trackActiveTab === 'Pump') {
  //       /// FETCH ALARA HERE
  //       this.fetchAlarmValue(activeBaby);
  //     }
  //   }

  //   if (this.props.refreshData) {
  //     this.pumpFunction(currentDate, activeBaby);
  //     // this.props.dispatchRefresh(false);
  //   }
  // }

  fetchAlarmValue(activeBaby) {
    // const {dispatchGetAlarm} = this.props;
    if (activeBaby) {
      const data = {
        baby_id: activeBaby.id,
        type: 'pump',
      };
      // dispatchGetAlarm(data);
    }
  }

  pumpFunction(currentDate, activeBaby) {
    // const {dispatchPumpListing} = this.props;
    if (activeBaby) {
      const data = {
        babyprofile_id: activeBaby.id,
        date: currentDate,
      };
      // dispatchPumpListing(data);
    }
  }

  redirectToAddEntry() {
    const {navigation} = this.props;
    navigation.navigate('AddPumpEntry', {date: this.props.currentDate});
  }

  HandleViewNotes(data) {
    const {ViewNoteModal} = this.state;
    this.setState({opened: false, ViewNoteModal: data.id});
  }

  HandleDeletePump(key) {
    const data = {
      pump_id: key,
    };
    const {
      // dispatchPumpDelete, onTabChange,
      navigation,
    } = this.props;
    if (!isEmptyObject(data)) {
      // dispatchPumpDelete(data);
      this.setState({opened: false});
      navigation.setParams({activeTab: 'Pump'});
    }
  }

  HandleEditPump(data) {
    const {
      navigation,
      //  dispatchEditPump
    } = this.props;
    if (!isEmptyObject(data)) {
      // dispatchEditPump(data);
    }
    this.setState({
      opened: false,
    });
    navigation.navigate('EditPump');
  }

  setViewNoteModal = visible => {
    this.setState({ViewNoteModal: visible});
  };

  convertTime(data) {
    return moment(data, ['HH:mm']).format('hh:mm A');
  }

  convertDataIntoHM(data) {
    let tmp = data.split(':');

    if (Number(tmp[0]) > 0) {
      if (Number(tmp[1]) > 0) {
        return `${tmp[0]}m ${tmp[1]}s`;
      }
      return `${tmp[0]}m`;
    }
    return `${tmp[1]}s`;
  }

  hasTime(data) {
    let _l = data.split(':');
    if (Number(_l[0]) > 0 || Number(_l[1] > 0)) {
      return true;
    }
    return false;
  }

  getTime(time) {
    return moment(time.user_datetime).format('hh:mm A');
  }

  render() {
    // const {pump, isFocused, track} = this.props;
    const {ViewNoteModal, isAlarmModal} = this.state;
    const pump = {};
    // const alarm = track?.pump || [];
    const alarm = [];
    return (
      <View style={styles.trackContainer}>
        {isAlarmModal && (
          <SetAlarmComponent
            isOpen={isAlarmModal}
            prevAlarm={alarm.length > 0 ? alarm[0] : null}
            onClose={() => {
              this.setState({
                isAlarmModal: false,
              });
            }}
            // isFocused={isFocused}
            type="pump"
            onValueSelect={() => {}}
            title="Pump alarm"
            notificationTitle="Pumping Alarm"
          />
        )}

        <View style={styles.trackTop}>
          <View style={styles.sessionsBox}>
            <View style={styles.sessionsIcon}>
              <Image source={Images.PumpCards?.sessionIcon} />
            </View>
            <Text style={styles.sessionsTitle}>
              {pump &&
                pump?.pumpListing?.result &&
                pump?.pumpListing?.result?.length}{' '}
              Sessions
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.setState({isAlarmModal: true})}>
            <View style={styles.setAlarm}>
              <Image
                source={Images.BreastfeedCards.alarmIcon}
                style={styles.setAlarmIcon}
              />
              <Text style={styles.setAlarmTitle}>
                {alarm.length > 0 ? this.getTime(alarm[0]) : 'set'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{paddingBottom: 70}}>
          {pump?.pumpListing?.error ? (
            <Text style={styles.listError}>No pump sessions yet</Text>
          ) : (
            <View style={styles.trackList}>
              {pump &&
                pump?.pumpListing?.result &&
                pump?.pumpListing?.result?.map((data, key) => {
                  return (
                    <View style={styles.trackListItem} key={`track${key}`}>
                      <Text style={styles.startTime}>
                        {this.convertTime(data.start_time)}
                      </Text>

                      <View style={styles.pumpUnit}>
                        {data.total_amount !== null && (
                          <Text style={styles.pumpUnitTextLeft}>
                            {data.total_amount} oz
                          </Text>
                        )}
                        {/* {(data.right_amount !== null)
													&& (
														<Text style={styles.pumpUnitTextRight}>
															{data.right_amount}
															{" "}
															oz
														</Text>
													)} */}
                      </View>
                      <Text style={styles.totalTime}>
                        {this.convertDataIntoHM(data.total_time)}
                      </Text>
                      <View style={styles.trackMenu}>
                        <Menu
                          opened={this.state.opened === data.id}
                          onBackdropPress={() =>
                            this.setState({opened: false})
                          }>
                          <MenuTrigger
                            style={styles.menuTrigger}
                            onPress={() => this.setState({opened: data.id})}>
                            <Image
                              source={Images.PumpCards?.dotsIcon}
                              style={styles.dotsIcon}
                            />
                          </MenuTrigger>
                          <MenuOptions style={styles.menuOptionS}>
                            {data.note ? (
                              <MenuOption
                                style={styles.menuOption}
                                onSelect={() => this.HandleViewNotes(data)}>
                                <Image
                                  source={Images.BreastfeedCards.detailsIcon}
                                />
                                <Text style={styles.menuOptionText}>
                                  View Notes
                                </Text>
                              </MenuOption>
                            ) : null}
                            <MenuOption style={styles.menuOption}>
                              <TouchableOpacity
                                style={styles.menuOptionInner}
                                onPress={() => this.HandleEditPump(data)}>
                                <Image source={Images.PumpCards?.editIcon} />
                                <Text style={styles.menuOptionText}>Edit</Text>
                              </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={styles.menuOption}>
                              <TouchableOpacity
                                style={styles.menuOptionInner}
                                onPress={() => this.HandleDeletePump(data.id)}>
                                <Image source={Images.PumpCards?.deleteIcon} />
                                <Text style={styles.menuOptionText}>
                                  Delete
                                </Text>
                              </TouchableOpacity>
                            </MenuOption>
                          </MenuOptions>
                        </Menu>
                        <Modal
                          animationType="slide"
                          transparent={true}
                          visible={ViewNoteModal === data.id}
                          onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                          }}>
                          <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                              <Text style={styles.modalText}>{data.note}</Text>
                              <TouchableHighlight
                                style={styles.closeModal}
                                onPress={() => {
                                  this.setViewNoteModal(!ViewNoteModal);
                                }}>
                                <Image
                                  source={Images.globalScreen.closeIcon}
                                  style={styles.closeIcon}
                                />
                              </TouchableHighlight>
                            </View>
                          </View>
                        </Modal>
                      </View>
                    </View>
                  );
                })}
            </View>
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.redirectToAddEntry()}>
          <Image source={Images.PumpCards?.plusIcon} style={styles.dotsIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   pump: state.pumpReducer,
//   activeBaby: getActiveBaby(state),
//   activeTab: state.tabReducer,
//   tabReducer: state.tabReducer,
//   track: state.trackReducer,
//   refreshData: state.commonReducer.refreshData,
// });

// const mapDispatchToProps = {
//   dispatchPumpListing: data => pumpActions.handlePumpListing(data),
//   dispatchPumpDelete: data => pumpActions.handlePumpDelete(data),
//   dispatchEditPump: data => pumpActions.EditGetDataPump(data),
//   dispatchResetAuthState: () => authActions.resetAuthState(),
//   dispatchGetAlarm: data => fetchPrevAlarmValue(data),
//   dispatchRefresh: flag => commonActions.setRefreshData(flag),
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PumpCards);
export default PumpCards;
