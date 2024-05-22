import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Images} from '../../src/assets/images';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {connect} from 'react-redux';

import moment from 'moment';
import {isEmptyObject} from '../../src/utils/native';
import FastImage from 'react-native-fast-image';
import {compose} from 'redux';
import {EditGetDataBaby, getBadyProfile} from '../store/slices/userSlice';
import {getActiveBaby} from '../store/selectors';
import {setActiveTab} from '../store/slices/tabSlice';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  headerLogo: {
    width: 31,
    height: 31,
  },
  smallLogo: {
    width: 31,
    height: 31,
  },
  menuTrigger: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  babyImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  menuOptionImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  menuOptionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  menuOptionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '85%',
  },
  menuOptionName: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 5,
    color: '#000',
  },
  menuOptionNameActive: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 5,
    color: 'red',
  },
  menuOptionNameDisable: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 5,
    color: '#999999',
  },
  menuOptionContentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
  },
  contentItemBold: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
  },
  contentItemLight: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
  },
  settingsText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#999999',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  babyPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#C4C4C4',
  },
});

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      activeIndex: null,
    };
  }

  componentDidMount() {
    const {dispatchProfileListng} = this.props;
    dispatchProfileListng();
    let date = '2021-02-09';
    let date2 = '1995-06-01';
    let birthyear = moment(date2, 'YYYY');
    let visitdate = moment(date, 'DD-MM-YYYY');
    let age = visitdate.diff(birthyear, 'y');
  }

  componentDidUpdate(prevProps) {
    const {user, dispatchEditBaby, activeBaby} = this.props;
    if (prevProps.user.isLoading === true && user.isLoading === false) {
      if (isEmptyObject(activeBaby)) {
        if (user.babyDetails && user.babyDetails.length > 0) {
          dispatchEditBaby(user.babyDetails[0]);
          this.setState({activeIndex: user.babyDetails[0].id});
        }
      } else {
        this.setState({activeIndex: activeBaby.id});
      }
    }
  }

  EditProfileHandler(data) {
    const {navigation} = this.props;
    navigation.navigate('EditProfile', {data});
  }

  SettingsHandler() {
    const {navigation} = this.props;
    navigation.navigate('Settings');
  }

  ActiveBabyHandler(data) {
    this.setState({activeIndex: data.id});
    const {dispatchEditBaby} = this.props;
    if (!isEmptyObject(data)) {
      dispatchEditBaby(data);
    }
  }

  DashboardHandler() {
    const {navigation} = this.props;
    this.props.dispatchSetTab('Dashboard');
    navigation.navigate('Dashboard');
  }

  getWeight(data) {
    let lbs = Number(data.weight_lb);
    let oz = Number(data.weight_oz);
    let ozToLbs = Number(oz / 16);

    return `${Number(lbs + ozToLbs).toFixed(2)} lbs`;
  }

  render() {
    const {user, insets} = this.props;
    const {activeIndex} = this.state;
    return (
      <View style={[styles.header, {paddingTop: insets.top}]}>
        <TouchableOpacity
          style={styles.headerLogo}
          onPress={() => {
            this.DashboardHandler();
          }}>
          <Image
            source={Images.globalScreen.smallLogo}
            style={styles.smallLogo}
          />
        </TouchableOpacity>
        <Menu
          opened={this.state.opened}
          onBackdropPress={() => this.setState({opened: false})}>
          <MenuTrigger
            style={styles.menuTrigger}
            onPress={() => this.setState({opened: true})}>
            {user && user.babyEdit ? (
              user.babyEdit.baby_profileupload ? (
                <FastImage
                  style={styles.babyImage}
                  source={{
                    uri: user.babyEdit.baby_profileupload,
                    priority: FastImage.priority.low,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ) : (
                <Image
                  source={Images.eidtProfile.userprofileIcon}
                  style={styles.babyImage}
                />
              )
            ) : (
              <View style={styles.babyPlaceholder} />
            )}
            <Image
              source={Images.globalScreen.downVector}
              style={styles.downVector}
            />
          </MenuTrigger>
          <MenuOptions
            style={styles.menuOptions}
            optionsContainerStyle={{marginTop: 70, elevation: 10}}>
            <MenuOption style={styles.menuOption}>
              {user &&
                user.babyDetails &&
                user.babyDetails.map((data, index) => {
                  return (
                    <View style={styles.menuOptionItem} key={index}>
                      <View style={styles.menuOptionHeader}>
                        <TouchableOpacity
                          style={styles.menuOptionHeaderLeft}
                          onPress={() => {
                            this.ActiveBabyHandler(data, index);
                          }}>
                          {data.baby_profileupload ? (
                            <FastImage
                              style={styles.menuOptionImage}
                              source={{
                                uri: data.baby_profileupload,
                                priority: FastImage.priority.low,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          ) : (
                            <Image
                              source={Images.eidtProfile.userprofileIcon}
                              style={styles.menuOptionImage}
                            />
                          )}
                          <Text
                            style={[
                              activeIndex === data.id
                                ? styles.menuOptionName
                                : styles.menuOptionNameDisable,
                            ]}>
                            {data.name}
                          </Text>
                        </TouchableOpacity>
                        {activeIndex === data.id ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.EditProfileHandler(data);
                              this.setState({opened: false});
                            }}>
                            <Image source={Images.BreastfeedCards.editIcon} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.ActiveBabyHandler(data, index);
                            }}>
                            <Image source={Images.globalScreen.editIconGray} />
                          </TouchableOpacity>
                        )}
                      </View>
                      {activeIndex === data.id ? (
                        <View style={styles.menuOptionContent}>
                          <View style={styles.menuOptionContentItem}>
                            <Text style={styles.contentItemBold}>Age: </Text>
                            <View style={styles.ageContainer}>
                              {moment().diff(data.birthday, 'years') !== '0' &&
                              moment().diff(data.birthday, 'months') > '12' ? (
                                <Text style={styles.contentItemLight}>
                                  {moment().diff(data.birthday, 'years')} Years
                                </Text>
                              ) : null}
                              {moment().diff(data.birthday, 'months') !== '0' &&
                              moment().diff(data.birthday, 'months') < '12' ? (
                                <Text style={styles.contentItemLight}>
                                  {moment().diff(data.birthday, 'months')}{' '}
                                  Months
                                </Text>
                              ) : null}
                              {moment().diff(data.birthday, 'days') !== '0' &&
                              moment().diff(data.birthday, 'months') < '1' &&
                              moment().diff(data.birthday, 'months') < '1' ? (
                                <Text style={styles.contentItemLight}>
                                  {moment().diff(data.birthday, 'days')} Days
                                </Text>
                              ) : null}
                            </View>
                          </View>
                          <View style={styles.menuOptionContentItem}>
                            <Text style={styles.contentItemBold}>Height: </Text>
                            <Text style={styles.contentItemLight}>
                              {data.height} inches
                            </Text>
                          </View>
                          <View style={styles.menuOptionContentItem}>
                            <Text style={styles.contentItemBold}>Weight: </Text>
                            <Text style={styles.contentItemLight}>
                              {this.getWeight(data)}
                              {/* {data.weight_lb}
																	{" "}
																	lbs,
																	{data.weight_oz}
																	{" "}
																	oz */}
                            </Text>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  );
                })}
            </MenuOption>
            <MenuOption style={styles.menuOption}>
              <TouchableOpacity
                onPress={() => {
                  this.SettingsHandler();
                  this.setState({opened: false});
                }}>
                <Text style={styles.settingsText}>Settings</Text>
              </TouchableOpacity>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  activeBaby: getActiveBaby(state),
});

const mapDispatchToProps = {
  dispatchProfileListng: () => getBadyProfile(),
  dispatchEditBaby: data => EditGetDataBaby(data),
  dispatchSetTab: name => setActiveTab(name),
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation,
  withSafeAreaInsets,
)(HeaderComponent);
