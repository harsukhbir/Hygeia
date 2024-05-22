import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {
  VictoryBar,
  VictoryAxis,
  VictoryStack,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryGroup,
} from 'victory-native';
import {Images} from '../../../src/assets/images';
import moment from 'moment';
import {isEmptyObject} from '../../../src/utils/native';
import styles from './styles';
import {getStatistics} from '../../store/selectors/statistics';
import {getActiveBaby, getActiveScreen} from '../../store/selectors';
import {resetAuthState} from '../../store/slices/authSlice';
import {getStatisticsList} from '../../store/slices/statisticsSlice';

class StatisticsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentDate: moment().format('MMMM DD, YYYY'),
    };
  }

  componentDidUpdate(prevProps) {
    const {activeBaby, navigation, activeScreen} = this.props;
    const {routeName} = navigation.state;

    if (
      prevProps.activeBaby &&
      activeBaby &&
      prevProps.activeBaby.id !== activeBaby.id
    ) {
      let startDate = moment(this.state.currentDate)
        .subtract(6, 'd')
        .format('YYYY-MM-DD');
      let endDate = moment(this.state.currentDate).format('YYYY-MM-DD');

      let data = new FormData();
      const activeBaby = this.props.activeBaby;

      data.append('babyprofile_id', activeBaby.id);
      data.append('from_date', startDate);
      data.append('to_date', endDate);

      setTimeout(() => {
        this.props.dispatchGetStatisticsList(data);
      }, 100);
    }
    if (
      activeScreen !== null &&
      activeScreen === 'Statistics' &&
      routeName === 'Statistics' &&
      prevProps.activeScreen !== 'Statistics'
    ) {
      if (!isEmptyObject(activeBaby)) {
        let startDate = moment(this.state.currentDate)
          .subtract(6, 'd')
          .format('YYYY-MM-DD');
        let endDate = moment(this.state.currentDate).format('YYYY-MM-DD');

        let data = new FormData();
        const activeBaby = this.props.activeBaby;

        data.append('babyprofile_id', activeBaby.id);
        data.append('from_date', startDate);
        data.append('to_date', endDate);

        this.props.dispatchGetStatisticsList(data);
      }
    }
  }

  componentDidMount() {
    let startDate = moment().subtract(6, 'd').format('YYYY-MM-DD');
    let endDate = moment().format('YYYY-MM-DD');

    let data = new FormData();
    const {activeBaby} = this.props;

    if (activeBaby && activeBaby.id) {
      data.append('babyprofile_id', activeBaby.id);
      data.append('from_date', startDate);
      data.append('to_date', endDate);

      this.props.dispatchGetStatisticsList(data);
    }
  }

  convertToSecound(hms) {
    if (!hms) {
      return '0 minute';
    }
    let a = hms.split(':'); // split it at the colons
    let total = Number(a[0]) * 60 + Number(a[1]);
    let temp = Math.ceil(Number(total / 60).toFixed(1));
    if (temp > 60) {
      let hh = Math.ceil(temp / 60);
      if (hh == 1) {
        return `${hh} hour`;
      }
      return `${hh} hours`;
    } else {
      return `${temp} minutes`;
    }
  }

  convertToGraph(hms) {
    let a = hms.split(':'); // split it at the colons
    let total = Number(a[0]) * 60 + Number(a[1]);
    let temp = Math.ceil(Number(total / 60).toFixed(1));
    return temp;
  }
  prevClick(currentDate) {
    this.setState(
      {
        currentDate: moment(currentDate)
          .subtract(1, 'days')
          .format('MMMM DD, YYYY'),
      },
      () => this.fetchData(),
    );
  }

  nextClick(currentDate) {
    this.setState(
      {currentDate: moment(currentDate).add(1, 'days').format('MMMM DD, YYYY')},
      () => this.fetchData(),
    );
  }

  fetchData() {
    let startDate = moment(this.state.currentDate)
      .subtract(6, 'd')
      .format('YYYY-MM-DD');
    let endDate = moment(this.state.currentDate).format('YYYY-MM-DD');
    let data = new FormData();
    const activeBaby = this.props.activeBaby;

    data.append('babyprofile_id', activeBaby.id);
    data.append('from_date', startDate);
    data.append('to_date', endDate);

    this.props.dispatchGetStatisticsList(data);
  }

  getRange(startDate, endDate, type) {
    let fromDate = moment(startDate);
    let toDate = moment(endDate);
    let diff = toDate.diff(fromDate, type);
    let range = [];
    for (let i = 0; i <= diff; i++) {
      range.push(moment(startDate).add(i, type));
    }
    return range;
  }

  getDaysArray(start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  }

  converTime = time => {
    const [hour, min] = time.split(':').map(i => Number(i));

    let value = '';

    if (hour > 0) {
      if (hour > 1) {
        value += `${hour} hours `;
      } else {
        value += `${hour} hour `;
      }
    }
    if (min > 0) {
      if (min > 1) {
        value += `${min} minutes`;
      } else {
        value += `${min} minute`;
      }
    }

    return value;
  };

  render() {
    const {statistics} = this.props;

    let breastfeeds = null;
    let breastfeedsItems = {
      left: [],
      right: [],
    };
    let breastfeeds_total_time_avg;
    let breastfeeds_total_session_avg;

    let pumps = null;
    let pumpItems = {
      left: [],
      right: [],
    };
    let pumps_total_time_avg;
    let pump_total_session_avg;
    let total_ounces_avg;

    let bottles = null;
    let bottleItems = [];
    let bottle_total_ounces_avg;

    let diaper = null;
    let daily_average_poop;
    let daily_average_pee;
    const both = [];
    const pee = [];
    const poop = [];
    let startDate = moment(this.state.currentDate)
      .subtract(6, 'd')
      .set({hours: 0, minutes: 0, seconds: 0});
    let endDate = moment(this.state.currentDate).set({
      hours: 23,
      minutes: 59,
      seconds: 59,
    });

    const tmpDateRanges = this.getRange(startDate, endDate, 'days');
    const dateRange = [];
    for (let i in tmpDateRanges) {
      let name = moment(tmpDateRanges[i]).format('ddd');
      dateRange.push(name);

      breastfeedsItems.left.push({
        x: name,
        y: 0,
      });
      breastfeedsItems.right.push({
        x: name,
        y: 0,
      });

      pumpItems.left.push({
        x: name,
        y: 0,
      });
      pumpItems.right.push({
        x: name,
        y: 0,
      });

      bottleItems.push({
        x: name,
        y: 0,
      });

      pee.push({
        x: name,
        y: 0,
      });
      poop.push({
        x: name,
        y: 0,
      });
      both.push({
        x: name,
        y: 0,
      });
    }

    if (
      statistics &&
      statistics.Breastfeeds &&
      statistics.Breastfeeds.Breastfeeds &&
      statistics.Breastfeeds.Breastfeeds.length > 0
    ) {
      breastfeeds = statistics.Breastfeeds;
      const todayItems = breastfeeds.Breastfeeds;
      if (todayItems.length > 0) {
        breastfeeds_total_session_avg = this.converTime(
          breastfeeds.breastfeeds_total_session_avg,
        );
        breastfeeds_total_time_avg = this.converTime(
          breastfeeds.breastfeeds_total_time_avg,
        );
      }

      const left = JSON.parse(JSON.stringify(breastfeedsItems.left));
      const right = JSON.parse(JSON.stringify(breastfeedsItems.right));

      for (let i in breastfeeds.Breastfeeds) {
        const index = left.findIndex(
          x =>
            x.x === moment(breastfeeds.Breastfeeds[i].created_at).format('ddd'),
        );
        if (index > -1) {
          // Need to add in prev record
          let tmpLeft =
            this.convertToGraph(breastfeeds.Breastfeeds[i].left_breast) +
            left[index].y;
          let tmpRight =
            this.convertToGraph(breastfeeds.Breastfeeds[i].right_breast) +
            right[index].y;

          left[index] = {
            x: moment(breastfeeds.Breastfeeds[i].created_at).format('ddd'),
            y: tmpLeft,
          };
          right[index] = {
            x: moment(breastfeeds.Breastfeeds[i].created_at).format('ddd'),
            y: tmpRight,
          };
        }
      }
      breastfeedsItems = {
        left,
        right,
      };
    }

    if (
      statistics &&
      statistics.pumps &&
      statistics.pumps.pumps &&
      statistics.pumps.pumps.length > 0
    ) {
      pumps = statistics.pumps;
      const todayItems = pumps.pumps;

      if (todayItems.length > 0) {
        pump_total_session_avg = this.converTime(pumps.pump_total_session_avg);
        pumps_total_time_avg = this.converTime(pumps.pumps_total_time_avg);
        total_ounces_avg = Math.round(Number(pumps.total_ounces_avg));
      }

      const left = JSON.parse(JSON.stringify(pumpItems.left));
      const right = JSON.parse(JSON.stringify(pumpItems.right));

      for (let i in pumps.pumps) {
        const index = left.findIndex(
          x => x.x === moment(pumps.pumps[i].created_at).format('ddd'),
        );

        if (index > -1) {
          let tmpLeft = Number(pumps.pumps[i].total_amount) + left[index].y;

          left[index] = {
            x: moment(pumps.pumps[i].created_at).format('ddd'),
            y: tmpLeft,
          };
        }
      }
      pumpItems = {
        left,
        right,
      };
    }

    if (
      statistics &&
      statistics.bottles &&
      statistics.bottles.bottles &&
      statistics.bottles.bottles.length > 0
    ) {
      bottles = statistics.bottles;

      bottle_total_ounces_avg = Number(bottles.bottle_total_ounces_avg);

      const items = JSON.parse(JSON.stringify(bottleItems));

      for (let i in bottles.bottles) {
        const index = items.findIndex(
          x => x.x === moment(bottles.bottles[i].created_at).format('ddd'),
        );
        if (index > -1) {
          let tmpLeft = Number(bottles.bottles[i].amount) + items[index].y;
          items[index] = {
            x: moment(bottles.bottles[i].created_at).format('ddd'),
            y: tmpLeft,
          };
        }
      }
      bottleItems = items;
    }

    if (
      statistics &&
      statistics.Diaper &&
      statistics.Diaper.Diaper &&
      statistics.Diaper.Diaper.length > 0
    ) {
      diaper = statistics.Diaper;

      daily_average_pee = Number(diaper.daily_average_pee).toFixed(2);
      daily_average_poop = Number(diaper.daily_average_poop).toFixed(2);

      for (let i in diaper.Diaper) {
        let type = diaper.Diaper[i].type_of_diaper;

        if (type === 'Pee') {
          const index = pee.findIndex(
            x => x.x === moment(diaper.Diaper[i].created_at).format('ddd'),
          );

          if (index == -1) {
            pee.push({
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: 1,
            });
            poop.push({
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: 0,
            });
            both.push({
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: 0,
            });
          } else {
            pee[index] = {
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: pee[index].y + 1,
            };
          }
        }

        if (type === 'Both') {
          const index = pee.findIndex(
            x => x.x === moment(diaper.Diaper[i].created_at).format('ddd'),
          );

          if (index == -1) {
            both.push({
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: 1,
            });
            pee.push({
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: 0,
            });
            poop.push({
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: 0,
            });
          } else {
            both[index] = {
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: both[index].y + 1,
            };
          }
        }

        if (type === 'Poop') {
          const index = pee.findIndex(
            x => x.x === moment(diaper.Diaper[i].created_at).format('ddd'),
          );

          if (index == -1) {
            poop.push({
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: 1,
            });
            pee.push({
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: 0,
            });
            both.push({
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: 0,
            });
          } else {
            poop[index] = {
              x: moment(diaper.Diaper[i].created_at).format('ddd'),
              y: poop[index].y + 1,
            };
          }
        }
      }
    }

    const {currentDate} = this.state;
    const items = [];
    for (let i in bottleItems) {
      items.push(bottleItems[i].y);
    }

    let maxValue = Math.max(...items);
    if (maxValue < 1) {
      maxValue = 1;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.statisticsHeader}>
            <TouchableOpacity
              style={styles.prevArrow}
              onPress={() => {
                this.prevClick(currentDate);
              }}>
              <Image
                source={Images.Statistics.prevIcon}
                style={styles.ArrowIcon}
              />
            </TouchableOpacity>
            <Text style={styles.statisticsTitle}>
              {currentDate == moment().format('MMMM DD, YYYY')
                ? 'Today'
                : (currentDate ==
                    moment().subtract(1, 'days').format('MMMM DD, YYYY')) ==
                  true
                ? 'Yesterday'
                : currentDate}
            </Text>

            {currentDate == moment().format('MMMM DD, YYYY') ? (
              <TouchableOpacity style={styles.nextArrow}>
                <Image source={Images.Track.nextIcon} style={styles.Disable} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.nextArrow}
                onPress={() => {
                  this.nextClick(currentDate);
                }}>
                <Image
                  source={Images.Track.nextIcon}
                  style={styles.ArrowIcon}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* 1 */}

          <View style={styles.statisticsgraphBox}>
            <Text
              style={{marginBottom: 10, color: '#333333', fontWeight: '500'}}>
              Average total time will be accurate once data for an entire week
              has been entered.
            </Text>
            <Text style={styles.statisticsgraphTitle}>Breastfeeding:</Text>
            <View style={styles.statisticsgraphContent}>
              <Text style={styles.statisticsgraphText}>
                Daily Average Session Time:
              </Text>
              <Text style={styles.statisticsgraphTextOrange}>
                {breastfeeds_total_session_avg || '0 minute'}
              </Text>
            </View>
            <View style={styles.statisticsgraphContent}>
              <Text style={styles.statisticsgraphText}>
                Daily Average Total Time:
              </Text>
              <Text style={styles.statisticsgraphTextOrange}>
                {breastfeeds_total_time_avg || '0 minute'}
              </Text>
            </View>
            <View style={styles.statisticsgraphchart}>
              <View style={styles.statisticsVictoryStack}>
                <VictoryChart height={160} domainPadding={10}>
                  <VictoryStack
                    colorScale={['#4B2785', '#E4B167']}
                    height={160}>
                    <VictoryBar barRatio={1} data={breastfeedsItems.left} />
                    <VictoryBar
                      barRatio={1}
                      labels={({datum}) => {
                        return `${datum._y1}m`;
                      }}
                      style={{
                        labels: {
                          fill: '#000',
                          padding: 2.5,
                          margin: 0,
                          fontSize: 12,
                          lineHeight: 16,
                          letterSpacing: 0.4,
                        },
                      }}
                      data={breastfeedsItems.right}
                    />
                  </VictoryStack>
                  <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6, 7]}
                    tickFormat={dateRange}
                    style={{
                      axis: {stroke: '#fff'},
                      tickLabels: {fontSize: 12},
                    }}
                  />
                </VictoryChart>
              </View>
              <View style={styles.maincolorscaleStatic}>
                <View style={styles.colorscaleStatic}>
                  <View style={styles.colorscaleblue} />
                  <Text style={styles.statisticsgraphcolorTitle}>
                    Left Breast
                  </Text>
                </View>
                <View style={styles.colorscaleStatic}>
                  <View style={styles.colorscaleorange} />
                  <Text style={styles.statisticsgraphcolorTitle}>
                    Right Breast
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* 2 */}

          <View style={styles.statisticsgraphBox}>
            <Text style={styles.statisticsgraphTitle}>Pumping:</Text>
            <View style={styles.statisticsgraphContent}>
              <Text style={styles.statisticsgraphText}>
                Daily Average Ounces:
              </Text>
              <Text style={styles.statisticsgraphTextOrange}>
                {total_ounces_avg || 0}{' '}
                {total_ounces_avg && total_ounces_avg > 1 ? 'ounces' : 'ounce'}
              </Text>
            </View>
            <View style={styles.statisticsgraphContent}>
              <Text style={styles.statisticsgraphText}>
                Daily Average Session Time:
              </Text>
              <Text style={styles.statisticsgraphTextOrange}>
                {pump_total_session_avg || '0 minute'}
              </Text>
            </View>
            <View style={styles.statisticsgraphContent}>
              <Text style={styles.statisticsgraphText}>
                Daily Average Total Time:
              </Text>
              <Text style={styles.statisticsgraphTextOrange}>
                {pumps_total_time_avg || '0 minute'}
              </Text>
            </View>
            <View style={styles.statisticsgraphchart}>
              <View style={styles.statisticsVictoryStack}>
                <VictoryChart height={160} domainPadding={10}>
                  <VictoryStack
                    colorScale={['#E4B167', '#E4B167']}
                    height={160}>
                    <VictoryBar
                      barRatio={1}
                      style={{
                        labels: {
                          fill: '#000',
                          padding: 2.5,
                          margin: 0,
                          fontSize: 12,
                          lineHeight: 16,
                          letterSpacing: 0.4,
                        },
                      }}
                      labels={({datum}) => `${datum._y1} oz`}
                      data={pumpItems.left}
                    />
                    {/* <VictoryBar
											barRatio={1}
											labels={({ datum }) => `${datum._y1} oz`}
											style={{ labels: { fill: "#000", padding: 2.5, margin: 0, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 } }}
											data={pumpItems.right}
										/> */}
                  </VictoryStack>
                  <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6, 7]}
                    tickFormat={dateRange}
                    style={{
                      axis: {stroke: '#fff'},
                      tickLabels: {fontSize: 12},
                    }}
                  />
                </VictoryChart>
              </View>
              {/* <View style={styles.maincolorscaleStatic}>
								<View style={styles.colorscaleStatic}>
									<View style={styles.colorscaleblue} />
									<Text style={styles.statisticsgraphcolorTitle}>Breast</Text>
								</View>
								<View style={styles.colorscaleStatic}>
									<View style={styles.colorscaleorange} />
									<Text style={styles.statisticsgraphcolorTitle}>Right Breast</Text>
								</View>
							</View> */}
            </View>
          </View>

          {/* 3 */}

          <View style={styles.statisticsgraphBox}>
            <Text style={styles.statisticsgraphTitle}>Bottles:</Text>
            <View style={styles.statisticsgraphContent}>
              <Text style={styles.statisticsgraphText}>
                Daily Average Ounces:
              </Text>
              <Text style={styles.statisticsgraphTextOrange}>
                {bottle_total_ounces_avg || 0}{' '}
                {bottle_total_ounces_avg && bottle_total_ounces_avg > 1
                  ? 'ounces'
                  : 'ounce'}
              </Text>
            </View>
            <View style={styles.statisticsgraphchart}>
              <VictoryChart
                domainPadding={30}
                domain={{y: [0, Number(maxValue)]}}>
                <VictoryGroup>
                  <VictoryLine
                    style={{
                      data: {stroke: '#E4B167'},
                      parent: {border: '1px solid #ccc'},
                    }}
                    data={bottleItems}
                  />
                  <VictoryScatter
                    maxDomain={1}
                    style={{data: {fill: '#E4B167', stroke: '#E4B167'}}}
                    size={5}
                    data={bottleItems}
                  />
                </VictoryGroup>
              </VictoryChart>
            </View>
          </View>

          {/* 4 */}

          <View style={styles.statisticsgraphBox}>
            <Text style={styles.statisticsgraphTitle}>Diapers:</Text>
            <View style={styles.statisticsgraphContent}>
              <Text style={styles.statisticsgraphText}>
                Daily Average of Pee:
              </Text>
              <Text style={styles.statisticsgraphTextOrange}>
                {Math.ceil(daily_average_pee) || 0}{' '}
                {daily_average_pee && daily_average_pee > 1
                  ? 'diapers'
                  : 'diaper'}
              </Text>
            </View>
            <View style={styles.statisticsgraphContent}>
              <Text style={styles.statisticsgraphText}>
                Daily Average of Poop:
              </Text>
              <Text style={styles.statisticsgraphTextOrange}>
                {Math.ceil(daily_average_poop) || 0}{' '}
                {daily_average_poop && daily_average_poop > 1
                  ? 'diapers'
                  : 'diaper'}
              </Text>
            </View>
            <View style={styles.statisticsgraphchart}>
              <View style={styles.statisticsVictoryStack}>
                <VictoryChart height={260}>
                  <VictoryStack
                    colorScale={['#4B2785', '#E4B167', '#F3921F']}
                    height={260}>
                    <VictoryBar barRatio={0.8} data={pee} />
                    <VictoryBar barRatio={0.8} data={poop} />
                    <VictoryBar barRatio={0.8} data={both} />
                  </VictoryStack>
                  <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6, 7]}
                    tickFormat={dateRange}
                    style={{
                      axis: {stroke: '#fff'},
                      tickLabels: {fontSize: 12},
                    }}
                  />
                </VictoryChart>
              </View>
              <View style={styles.maincolorscaleStatic}>
                <View style={styles.colorscaleStatic}>
                  <View style={styles.colorscaleblue} />
                  <Text style={styles.statisticsgraphcolorTitle}>Pee</Text>
                </View>
                <View style={styles.colorscaleStatic}>
                  <View style={styles.colorscaleorange} />
                  <Text style={styles.statisticsgraphcolorTitle}>Poop</Text>
                </View>
                <View style={styles.colorscaleStatic}>
                  <View style={styles.colorscaledarkorange} />
                  <Text style={styles.statisticsgraphcolorTitle}>Both</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  statistics: getStatistics(state),
  activeBaby: getActiveBaby(state),
  activeScreen: getActiveScreen(state),
});
const mapDispatchToProps = {
  dispatchResetAuthState: () => resetAuthState(),
  dispatchGetStatisticsList: data => getStatisticsList(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen);
