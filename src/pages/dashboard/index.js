import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import ButtonComponent from '../../../src/components/ButtonComponent';
import {translate} from '../../../src/locales/i18n';
import {Images} from '../../../src/assets/images';
import {isEmptyObject} from '../../../src/utils/native';
import moment from 'moment';
import styles from './styles';

class dashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftBreastPercentage: '',
      isNoBabyModal: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      activeBaby,
      // dispatchDashboardListing,
      activeScreen,
      navigation,
      dashboard,
    } = this.props;
    const {routeName} = navigation.state;

    if (this.props.user && this.props.user.isBabyLoaded) {
      if (
        prevProps.user.isBabyLoaded !== this.props.user.isBabyLoaded &&
        this.props.user.babyDetails.length == 0
      ) {
        if (this.props.tab.activeTab === 'Dashboard') {
          this.setState({isNoBabyModal: true});
        }
      }
    }

    if (
      prevProps.activeBaby &&
      activeBaby &&
      prevProps.activeBaby.id !== activeBaby.id
    ) {
      // const data = {
      //   babyprofile_id: activeBaby.id,
      //   date: moment().format('YYYY-MM-DD'),
      // };
      // dispatchDashboardListing(data);
    }
    if (
      activeScreen !== null &&
      activeScreen === 'Dashboard' &&
      routeName === 'Dashboard' &&
      prevProps.activeScreen !== 'Dashboard'
    ) {
      if (!isEmptyObject(activeBaby)) {
        console.log('active baby: ', activeBaby);
      }
    }
    if (
      prevProps.dashboard?.DashboardListingSuccessful == false &&
      dashboard?.DashboardListingSuccessful == true
    ) {
      this.getLeftBreastValue();
    }
    // if (prevProps.count !== this.props.count) {
    //   console.log('Count changed:', this.props.count);
    // }
  }

  getSecondTime = time => {
    const [min, sec] = time.split(':').map(i => Number(i));
    return min * 60 + sec;
  };

  getLeftBreastValue() {
    const {dashboard} = this.props;

    if (
      dashboard &&
      dashboard?.dashboardListing?.result &&
      dashboard?.dashboardListing?.result?.breastfeeds
    ) {
      const leftBreast =
        dashboard?.dashboardListing?.result?.breastfeeds?.left_breast;
      const totalTime =
        dashboard?.dashboardListing?.result?.breastfeeds?.total_time;

      const leftValue = (
        (this.getSecondTime(leftBreast) / this.getSecondTime(totalTime)) *
        100
      ).toFixed(2);
      this.setState({leftBreastPercentage: leftValue});
    }
  }

  RedirectToAddBaby() {
    const {navigation} = this.props;
    this.setState({isNoBabyModal: false});
    navigation.navigate('AddProfile');
  }

  logOutHandler() {
    console.log('logout clicked!');
  }

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
    return `${Number(tmp[1])}s`;
  }

  hasValue(data) {
    let _t = data.split(':');
    return Number(_t[0]) > 0 || Number(_t[1]) > 0;
  }

  getTimeAMPM(data) {
    return moment(data, ['HH:mm']).format('hh:mm A');
  }

  render() {
    const {dashboard} = this.props;
    const {leftBreastPercentage, isNoBabyModal} = this.state;
    let dashboardData = dashboard?.dashboardListing?.result;

    return (
      <ScrollView>
        <View style={styles.container}>
          {/* No Babay Modal  */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isNoBabyModal}
            onRequestClose={() => {
              this.setState({isNoBabyModal: false});
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isNoBabyModal: false});
                  }}
                  style={styles.modalClose}>
                  <Image
                    source={Images.globalScreen.closeIcon}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>
                  Create a baby profile to continue
                </Text>
                <Text style={styles.modalSubTitle}>
                  You need to create a baby profile to start tracking their
                  progress.
                </Text>
                <ButtonComponent
                  buttonClicked={() => this.RedirectToAddBaby()}
                  style={styles.buttonContainer}
                  buttonStyle={styles.buttonStyle}
                  buttonTextStyle={styles.buttonTextStyle}
                  buttonText="Create Baby Profile"
                />
              </View>
            </View>
          </Modal>
          <Text style={styles.activityTitle}>
            {translate('dashboardScreen.activityTitle')}
          </Text>
          <View style={styles.dashboardbox}>
            <View style={styles.dashboardboxHeader}>
              <View>
                <Image
                  source={Images.dashboard?.pumpingIcon}
                  style={styles.dashboardboxImage}
                />
              </View>
              <View style={styles.dashboardboxsessionTitle}>
                <Text style={styles.dashboardboxTitle}>
                  {translate('dashboardScreen.pumpingTitle')}
                </Text>

                {dashboardData && dashboardData.pump_session_count > 0 ? (
                  <Text style={styles.dashboardboxsessionText}>
                    {dashboardData.pump_session_count} sessions
                  </Text>
                ) : (
                  <Text style={styles.dashboardboxsessionText}>0 sessions</Text>
                )}
              </View>
            </View>
            {dashboardData && dashboardData.pumps ? (
              <View>
                <View style={styles.listing}>
                  <View style={styles.pumpingmainlistText}>
                    <Text style={styles.listText}>
                      {this.convertTime(dashboardData.pumps.start_time)}
                    </Text>
                    <Text style={styles.listText}>
                      {this.convertDataIntoHM(dashboardData.pumps.total_time)}
                    </Text>
                  </View>
                </View>
                <View style={styles.linechart}>
                  <View style={styles.linechartOrange}>
                    <View
                      style={[
                        styles.pumpinglinechartPurple,
                        {
                          width: `${(
                            (dashboardData.pumps.left_amount /
                              dashboardData.pumps.total_amount) *
                            100
                          ).toFixed(2)}%`,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.pumpLinechartMiter}>
                    <Text
                      style={
                        styles.linecharttextboldMiter
                      }>{`${dashboardData.pumps.total_amount} oz`}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <Text style={styles.notFoundText}>No recent activity</Text>
            )}
          </View>
          <View style={styles.dashboardbox}>
            <View style={styles.dashboardboxHeader}>
              <View>
                <Image
                  source={Images.dashboard?.breastfeedingIcon}
                  style={styles.dashboardboxImage}
                />
              </View>
              <View style={styles.dashboardboxsessionTitle}>
                <Text style={[styles.dashboardboxTitle, {color: '#4B2785'}]}>
                  {translate('dashboardScreen.breastfeedingTitle')}
                </Text>
                {dashboardData &&
                dashboardData.breastfeeds_session_count > 0 ? (
                  <Text style={styles.dashboardboxsessionText}>
                    {dashboardData.breastfeeds_session_count} sessions
                  </Text>
                ) : (
                  <Text style={styles.dashboardboxsessionText}>0 sessions</Text>
                )}
              </View>
            </View>
            {dashboardData && dashboardData.breastfeeds ? (
              <View>
                {this.hasValue(dashboardData.breastfeeds?.left_breast) &&
                this.hasValue(dashboardData.breastfeeds?.right_breast) ? (
                  <View style={styles.listing}>
                    <Text style={styles.listBreastsIcon}>B</Text>
                    <View style={styles.mainlistText}>
                      <Text style={styles.listTextBold}>Both Breasts, </Text>
                      <Text style={styles.listText}>
                        {this.getTimeAMPM(
                          dashboardData.breastfeeds?.start_time,
                        )}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View>
                    {this.hasValue(dashboardData.breastfeeds?.left_breast) ? (
                      <View style={styles.listing}>
                        <Text style={styles.listBreastsIcon}>R</Text>
                        <View style={styles.mainlistText}>
                          <Text style={styles.listTextBold}>
                            Right Breast,{' '}
                          </Text>
                          <Text style={styles.listText}>
                            {this.getTimeAMPM(
                              dashboardData.breastfeeds?.start_time,
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                    {this.hasValue(dashboardData.breastfeeds?.right_breast) ? (
                      <View style={styles.listing}>
                        <Text style={styles.listBreastsIcon}>L</Text>
                        <View style={styles.mainlistText}>
                          <Text style={styles.listTextBold}>Left Breast, </Text>
                          <Text style={styles.listText}>
                            {this.getTimeAMPM(
                              dashboardData.breastfeeds?.start_time,
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                )}
                <View style={styles.linechart}>
                  <View style={styles.linechartOrange}>
                    {leftBreastPercentage ? (
                      <View
                        style={[
                          styles.linechartPurple,
                          {width: `${leftBreastPercentage}%`},
                        ]}
                      />
                    ) : null}
                  </View>
                  <View style={styles.linechartText}>
                    <Text style={styles.linechartpurpleText}>
                      {translate('dashboardScreen.linechartLefttext')}
                    </Text>
                    <Text style={styles.linechartorangeText}>
                      {translate('dashboardScreen.linechartRighttext')}
                    </Text>
                  </View>
                  <View style={styles.linechartMiter}>
                    <Text style={styles.linecharttextMiter}>
                      {this.convertDataIntoHM(
                        dashboardData.breastfeeds?.left_breast,
                      )}
                    </Text>
                    <Text style={styles.linecharttextboldMiter}>
                      {this.convertDataIntoHM(
                        dashboardData.breastfeeds?.total_time,
                      )}
                    </Text>
                    <Text style={styles.linecharttextMiter}>
                      {this.convertDataIntoHM(
                        dashboardData.breastfeeds?.right_breast,
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <Text style={styles.notFoundText}>No recent activity</Text>
            )}
          </View>
          <View style={styles.dashboardbox}>
            <View style={styles.dashboardboxHeader}>
              <View>
                <Image
                  source={Images.dashboard?.diaperingIcon}
                  style={styles.dashboardboxImage}
                />
              </View>
              <View>
                <Text style={styles.dashboardboxTitle}>
                  {translate('dashboardScreen.diaperingTitle')}
                </Text>
              </View>
            </View>

            {dashboardData &&
            dashboardData.diaper &&
            (dashboardData.diaper.both ||
              dashboardData.diaper.pee ||
              dashboardData.diaper.poop) ? (
              <View>
                {dashboardData.diaper.pee ? (
                  <View style={styles.listing}>
                    <View>
                      <Image
                        source={Images.dashboard?.peeIcon}
                        style={styles.listIcon}
                      />
                    </View>
                    <View style={styles.mainlistText}>
                      <Text style={styles.listTextBold}>
                        {translate('dashboardScreen.peeText')}
                      </Text>
                      <Text style={styles.listText}>
                        {this.convertTime(dashboardData.diaper.pee.start_time)}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {dashboardData.diaper.poop ? (
                  <View style={styles.listing}>
                    <View>
                      <Image
                        source={Images.dashboard?.poopIcon}
                        style={styles.listIcon}
                      />
                    </View>
                    <View style={styles.mainlistText}>
                      <Text style={styles.listTextBold}>
                        {translate('dashboardScreen.poopText')}
                      </Text>
                      <Text style={styles.listText}>
                        {this.convertTime(dashboardData.diaper.poop.start_time)}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {dashboardData.diaper.both ? (
                  <View style={styles.listing}>
                    <View>
                      <Image
                        source={Images.dashboard?.bothIcon}
                        style={styles.listIcon}
                      />
                    </View>
                    <View style={styles.mainlistText}>
                      <Text style={styles.listTextBold}>
                        {translate('dashboardScreen.bothText')}
                      </Text>
                      <Text style={styles.listText}>
                        {this.convertTime(dashboardData.diaper.both.start_time)}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            ) : (
              <Text style={styles.notFoundText}>No recent activity</Text>
            )}
          </View>
          <View style={styles.dashboardbox}>
            <View style={styles.dashboardboxHeader}>
              <View>
                <Image
                  source={Images.dashboard?.feedingIcon}
                  style={styles.dashboardboxImage}
                />
              </View>
              <View>
                <Text style={[styles.dashboardboxTitle, {color: '#4B2785'}]}>
                  {translate('dashboardScreen.feedingTitle')}
                </Text>
              </View>
            </View>
            {dashboardData &&
            dashboardData.feeding &&
            (dashboardData.feeding.brestfeead ||
              dashboardData.feeding.bottle) ? (
              <View>
                {dashboardData.feeding.brestfeead ? (
                  <View style={styles.listing}>
                    <View>
                      <Image
                        source={Images.dashboard?.breastfedIcon}
                        style={styles.listIcon}
                      />
                    </View>
                    <View style={styles.time_hours}>
                      <View style={styles.mainlistText}>
                        <Text style={styles.listTextBold}>
                          {translate('dashboardScreen.breastfedText')}
                        </Text>
                        <Text style={styles.listText}>
                          {this.convertTime(
                            dashboardData.feeding.brestfeead.start_time,
                          )}
                        </Text>
                      </View>
                      <View style={styles.hours}>
                        <Text style={styles.listText}>
                          {this.convertDataIntoHM(
                            dashboardData.feeding.brestfeead.total_time,
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null}

                {dashboardData.feeding.bottle ? (
                  <View style={styles.listing}>
                    <View>
                      <Image
                        source={Images.dashboard?.bottlefedIcon}
                        style={styles.listIcon}
                      />
                    </View>
                    <View style={styles.time_hours}>
                      <View style={styles.mainlistText}>
                        <Text style={styles.listTextBold}>
                          {translate('dashboardScreen.bottlefedText')}
                        </Text>
                        <Text style={styles.listText}>
                          {this.convertTime(
                            dashboardData.feeding.bottle.start_time,
                          )}
                        </Text>
                      </View>
                      <View style={styles.hours}>
                        <Text
                          style={
                            styles.listText
                          }>{`${dashboardData.feeding.bottle.amount} oz`}</Text>
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            ) : (
              <Text style={styles.notFoundText}>No recent activity</Text>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

// export default connect(mapStateToProps)(dashboardScreen);
export default dashboardScreen;
