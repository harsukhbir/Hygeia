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
import ButtonComponent from '../../../../src/components/ButtonComponent';
import {Images} from '../../../../src/assets/images';
import {isEmptyObject} from '../../../../src/utils/native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import moment from 'moment';
import {withNavigationFocus} from 'react-navigation';
import styles from '../styles';
import SetAlarmComponent from '../components/SetAlarmComponent';
import {
  editGetDataBreastfeed,
  handleBreastfeedDelete,
  handleBreastfeedListing,
} from '../../../store/slices/breastfeedSlice';
import {getActiveBaby} from '../../../store/selectors';
import {resetAuthState} from '../../../store/slices/authSlice';
import {fetchPrevAlarmValue} from '../../../store/slices/trackSlice';
import {setRefreshData} from '../../../store/slices/commonSlice';

class BreastfeedCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: '',
      modalVisible: false,
      ViewNoteModal: false,
      isAlarmModal: false,
    };
  }

  componentDidMount() {
    const {currentDate, activeBaby} = this.props;
    this.breastFeed(currentDate, activeBaby);
    this.fetchAlarmValue(activeBaby);
  }

  componentDidUpdate(prevProps) {
    const {currentDate, activeBaby} = this.props;

    if (
      currentDate !== prevProps.currentDate ||
      (prevProps.activeBaby &&
        activeBaby &&
        prevProps.activeBaby.id !== activeBaby.id)
    ) {
      this.breastFeed(currentDate, activeBaby);
    }

    if (
      prevProps.tab.activeTab !== this.props.tab.activeTab &&
      activeBaby &&
      activeBaby.id
    ) {
      if (this.props.tab.activeTab === 'Track') {
        this.fetchAlarmValue(activeBaby);
      }
    }
    // if(prevProps.tab.activeT)

    if (
      prevProps.tab.trackActiveTab !== this.props.tab.trackActiveTab &&
      activeBaby &&
      activeBaby.id
    ) {
      if (this.props.tab.trackActiveTab === 'Breastfeed') {
        /// FETCH ALARA HERE
        this.fetchAlarmValue(activeBaby);
      }
    }

    if (this.props.refreshData) {
      this.breastFeed(currentDate, activeBaby);
      this.props.dispatchRefresh(false);
    }
  }

  fetchAlarmValue(activeBaby) {
    const {dispatchGetAlarm} = this.props;
    if (activeBaby) {
      const data = {
        baby_id: activeBaby.id,
        type: 'breastfeed',
      };
      dispatchGetAlarm(data);
    }
  }

  breastFeed(currentDate, activeBaby) {
    const {dispatchBreastfeedListing} = this.props;
    if (activeBaby) {
      const data = {
        babyprofile_id: activeBaby.id,
        date: currentDate,
      };
      dispatchBreastfeedListing(data);
    }
  }

  redirectToAddEntry() {
    const {navigation} = this.props;

    navigation.navigate('AddBreastfeedEntry', {date: this.props.currentDate});
  }

  HandleViewNotes(data) {
    this.setState({opened: false, ViewNoteModal: data.id});
  }

  HandleDeleteBreastfeed(key) {
    const data = {
      breastfeed_id: key,
    };
    const {dispatchBreastfeedDelete} = this.props;
    if (!isEmptyObject(data)) {
      dispatchBreastfeedDelete(data);
      this.setState({opened: false});
    }
  }

  HandleEditBreastfeed(data) {
    const {navigation, dispatchEditBreastfeed} = this.props;
    if (!isEmptyObject(data)) {
      dispatchEditBreastfeed(data);
    }
    this.setState({
      opened: false,
    });

    navigation.navigate('EditBreastfeed', {date: this.props.currentDate});
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  setViewNoteModal = visible => {
    this.setState({ViewNoteModal: visible});
  };

  convertTime(data) {
    return moment(data, ['HH:mm']).format('hh:mm A');
  }

  toHHMMSS = secs => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map(v => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };

  convertDataIntoHM(data) {
    let tmp = data.split(':');
    if (Number(tmp[0]) > 0) {
      // let totalSecs = (Number(tmp[0])*60)+Number(tmp[1]);
      // let newTime = this.toHHMMSS(totalSecs).split(":");
      // if(Number(newTime[0]) > 0) {
      // 	return `${newTime[0]} h ${newTime[1]} m`
      // }
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
    const {breastfeed, isFocused, track, refreshData} = this.props;
    const {modalVisible, ViewNoteModal, isAlarmModal} = this.state;
    const alarm = track.breastfeed || [];

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
            isFocused={isFocused}
            type="breastfeed"
            onValueSelect={() => {}}
            title="Breastfeed Alarm"
            notificationTitle="Breastfeeding Alarm"
          />
        )}
        <View style={styles.trackTop}>
          <View style={styles.sessionsBox}>
            <View style={styles.sessionsIcon}>
              <Image source={Images.BreastfeedCards.sessionIcon} />
            </View>
            <Text style={styles.sessionsTitle}>
              {breastfeed &&
                breastfeed.breastfeedListing.result &&
                breastfeed.breastfeedListing.result.length}{' '}
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
          {breastfeed.breastfeedListing.error ? (
            <Text style={styles.listError}>No breastfeed sessions yet</Text>
          ) : (
            <View style={styles.trackList}>
              {breastfeed &&
                breastfeed.breastfeedListing.result &&
                breastfeed.breastfeedListing.result.map((data, key) => {
                  return (
                    <View
                      style={[styles.trackListItem, {paddingVertical: 15}]}
                      key={`track${key}`}>
                      <Text style={styles.startTime}>
                        {this.convertTime(data.start_time)}
                      </Text>
                      <View style={styles.breastUnits}>
                        {this.hasTime(data.left_breast) && (
                          <View style={styles.leftBreast}>
                            <Text style={styles.roundFrame}>L</Text>
                            <Text style={styles.listText}>Left breast</Text>
                          </View>
                        )}
                        {this.hasTime(data.right_breast) && (
                          <View style={styles.rightBreast}>
                            <Text style={styles.roundFrame}>R </Text>
                            <Text style={styles.listText}>Right breast</Text>
                          </View>
                        )}
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
                            onPress={() => this.setState({opened: data.id})}
                            style={styles.menuTrigger}>
                            <Image
                              source={Images.BreastfeedCards.dotsIcon}
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
                                onPress={() => this.HandleEditBreastfeed(data)}>
                                <Image
                                  source={Images.BreastfeedCards.editIcon}
                                />
                                <Text style={styles.menuOptionText}>Edit</Text>
                              </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={styles.menuOption}>
                              <TouchableOpacity
                                style={styles.menuOptionInner}
                                onPress={() =>
                                  this.HandleDeleteBreastfeed(data.id)
                                }>
                                <Image
                                  source={Images.BreastfeedCards.deleteIcon}
                                />
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
          <Image source={Images.BreastfeedCards.plusIcon} />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableHighlight
                style={styles.closeModal}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}>
                <Image
                  source={Images.globalScreen.closeIcon}
                  style={styles.closeIcon}
                />
              </TouchableHighlight>
              <Text style={styles.modalTitle}>
                Create a baby profile to continue
              </Text>
              <Text style={styles.modalText}>
                You need to create a baby profile to start tracking their
                progress.{' '}
              </Text>
              <ButtonComponent
                // buttonClicked={() => { this.logInHandler(); }}
                style={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                buttonTextStyle={styles.buttonTextStyle}
                buttonText="Create Baby Profile"
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  breastfeed: state.breastfeed,
  activeBaby: getActiveBaby(state),
  tab: state.tab,
  track: state.track,
  refreshData: state.common.refreshData,
});

const mapDispatchToProps = {
  dispatchBreastfeedListing: data => handleBreastfeedListing(data),
  dispatchBreastfeedDelete: data => handleBreastfeedDelete(data),
  dispatchEditBreastfeed: data => editGetDataBreastfeed(data),
  dispatchResetAuthState: () => resetAuthState(),
  dispatchGetAlarm: data => fetchPrevAlarmValue(data),
  dispatchRefresh: flag => setRefreshData(flag),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigationFocus(BreastfeedCards));
