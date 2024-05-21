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
} from 'react-native';
import * as authActions from '../../../../src/redux/actions/authActions';
import * as commonActions from '../../../../src/redux/actions/commonActions';
import * as bottleActions from '../../../../src/redux/actions/bottleActions';
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

class BottlesCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: '',
      ViewNoteModal: false,
      isAlarmModal: false,
    };
  }

  componentDidMount() {
    const {currentDate, activeBaby} = this.props;
    this.bottleFunction(currentDate, activeBaby);
    this.fetchAlarmValue(activeBaby);
  }

  componentDidUpdate(prevProps) {
    const {currentDate, activeBaby} = this.props;
    if (
      currentDate !== prevProps?.currentDate ||
      (prevProps?.activeBaby &&
        activeBaby &&
        prevProps?.activeBaby.id !== activeBaby.id)
    ) {
      this.bottleFunction(currentDate, activeBaby);
      // this.fetchAlarmValue(activeBaby);
    }

    if (
      prevProps?.tabReducer.activeTab !== this.props?.tabReducer.activeTab &&
      activeBaby &&
      activeBaby.id
    ) {
      if (this.props?.tabReducer.activeTab === 'Track') {
        this.fetchAlarmValue(activeBaby);
      }
    }
    // if(prevProps?.tabReducer.activeT)

    if (
      prevProps?.tabReducer.trackActiveTab !==
        this.props?.tabReducer.trackActiveTab &&
      activeBaby &&
      activeBaby.id
    ) {
      if (this.props?.tabReducer.trackActiveTab === 'Bottles') {
        /// FETCH ALARA HERE
        this.fetchAlarmValue(activeBaby);
      }
    }

    if (this.props?.refreshData) {
      this.bottleFunction(currentDate, activeBaby);
      // this.props?.dispatchRefresh(false);
    }
  }

  fetchAlarmValue(activeBaby) {
    // const {dispatchGetAlarm} = this.props;
    if (activeBaby) {
      const data = {
        baby_id: activeBaby.id,
        type: 'bottle',
      };
      // dispatchGetAlarm(data);
    }
  }

  bottleFunction(currentDate, activeBaby) {
    // const {dispatchBottleListing} = this.props;
    if (activeBaby) {
      const data = {
        babyprofile_id: activeBaby.id,
        date: currentDate,
      };
      // dispatchBottleListing(data);
    }
  }

  redirectToAddEntry() {
    const {navigation} = this.props;

    navigation.navigate('AddBottle', {date: this.props?.currentDate});
  }

  HandleViewNotes(data) {
    this.setState({opened: false, ViewNoteModal: data.id});
  }

  HandleDeleteBottle(key) {
    const data = {
      bottle_id: key,
    };
    const {
      // dispatchBottleDelete,
      navigation,
    } = this.props;
    if (!isEmptyObject(data)) {
      // dispatchBottleDelete(data);
      this.setState({opened: false});
      navigation.setParams({activeTab: 'Bottles'});
    }
  }

  HandleEditBottle(data) {
    const {
      navigation,
      // dispatchEditBottle
    } = this.props;
    if (!isEmptyObject(data)) {
      // dispatchEditBottle(data);
    }
    this.setState({
      opened: false,
    });
    navigation.navigate('EditBottle');
  }

  setViewNoteModal = visible => {
    this.setState({ViewNoteModal: visible});
  };

  convertTime(data) {
    return moment(data, ['HH:mm']).format('hh:mm A');
  }

  getTime(time) {
    return moment(time.user_datetime).format('hh:mm A');
  }

  render() {
    const {bottle, isFocused, track} = this.props;
    const {ViewNoteModal, isAlarmModal} = this.state;
    const alarm = track?.bottle || [];

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
            type="bottle"
            isFocused={isFocused}
            onValueSelect={() => {}}
            title="Bottle Alarm"
            notificationTitle="Bottle Alarm"
          />
        )}
        <View style={styles.trackTop}>
          <View style={styles.sessionsBox}>
            <View style={styles.sessionsIcon}>
              <Image source={Images.BottlesCards.bottleIcon} />
            </View>
            <Text style={styles.sessionsTitle}>
              {bottle &&
                bottle?.bottleListing?.result &&
                bottle?.bottleListing?.result?.length}{' '}
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
          {bottle?.bottleListing?.error ? (
            <Text style={styles.listError}>No bottle sessions yet</Text>
          ) : (
            <View style={styles.trackList}>
              {bottle &&
                bottle?.bottleListing?.result &&
                bottle?.bottleListing?.result?.map((data, key) => {
                  return (
                    <View style={styles.trackListItem} key={`track${key}`}>
                      <Text style={styles.startTime}>
                        {this.convertTime(data.start_time)}
                      </Text>
                      <Text style={styles.listText}>{data.type_of_feed}</Text>
                      <Text style={styles.listText}>{data.amount} oz</Text>
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
                              source={Images.BottlesCards.dotsIcon}
                              style={styles.dotsIcon}
                            />
                          </MenuTrigger>
                          <MenuOptions style={styles.menuOptionS}>
                            {data.note ? (
                              <MenuOption
                                style={styles.menuOption}
                                onSelect={() => this.HandleViewNotes(data)}>
                                <Image
                                  source={Images.BottlesCards.detailsIcon}
                                />
                                <Text style={styles.menuOptionText}>
                                  View Notes
                                </Text>
                              </MenuOption>
                            ) : null}
                            <MenuOption style={styles.menuOption}>
                              <TouchableOpacity
                                style={styles.menuOptionInner}
                                onPress={() => this.HandleEditBottle(data)}>
                                <Image source={Images.BottlesCards.editIcon} />
                                <Text style={styles.menuOptionText}>Edit</Text>
                              </TouchableOpacity>
                            </MenuOption>
                            <MenuOption style={styles.menuOption}>
                              <TouchableOpacity
                                style={styles.menuOptionInner}
                                onPress={() =>
                                  this.HandleDeleteBottle(data.id)
                                }>
                                <Image
                                  source={Images.BottlesCards.deleteIcon}
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
                            // Alert.alert("Modal has been closed.");
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
          <Image
            source={Images.BottlesCards.plusIcon}
            style={styles.dotsIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   bottle: state.bottleReducer,
//   activeBaby: getActiveBaby(state),
//   tabReducer: state.tabReducer,
//   track: state.trackReducer,
//   refreshData: state.commonReducer.refreshData,
// });

// const mapDispatchToProps = {
//   dispatchBottleListing: data => bottleActions.handleBottleListing(data),
//   dispatchBottleDelete: data => bottleActions.handleBottleDelete(data),
//   dispatchEditBottle: data => bottleActions.EditGetDataBottle(data),
//   dispatchResetAuthState: () => authActions.resetAuthState(),
//   dispatchGetAlarm: data => fetchPrevAlarmValue(data),
//   dispatchRefresh: flag => commonActions.setRefreshData(flag),
// };

// export default connect(mapStateToProps, mapDispatchToProps)(BottlesCards);
export default BottlesCards;
