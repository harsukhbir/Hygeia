import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import {Images} from '../../../../src/assets/images';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import styles from './styles';
import {handleGrowthListing} from '../../../store/slices/growthSlice';
import {resetAuthState} from '../../../store/slices/authSlice';
import {getActiveBaby} from '../../../store/selectors';

let temp = [];
const chartData = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
class GrowthCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPoint: null,
      from: null,
      isModalOpen: false,
      heightList: null,
      weightLBList: null,
      weightOZList: null,
    };
  }

  componentDidMount() {
    const {currentDate, activeBaby} = this.props;
    this.growthFunction(currentDate, activeBaby);
    let height = [];
    for (let i = 0; i < 100; i++) {
      height.push({label: `${i / 2} Inches`, value: i / 2});
    }

    let weightLB = [];
    for (let i = 0; i < 50; i++) {
      weightLB.push({label: `${i} lb`, value: i});
    }

    let weightOZ = [];
    for (let i = 0; i < 50; i++) {
      weightOZ.push({label: `${i} oz`, value: i});
    }
    this.setState({
      weightOZList: weightOZ,
      weightLBList: weightLB,
      heightList: height,
    });
  }

  componentDidUpdate(prevProps) {
    const {currentDate, activeBaby} = this.props;
    if (
      currentDate !== prevProps.currentDate ||
      (prevProps.activeBaby &&
        activeBaby &&
        prevProps.activeBaby.id !== activeBaby.id)
    ) {
      this.growthFunction(currentDate, activeBaby);
    }

    if (
      prevProps.tab.trackActiveTab !== this.props.tab.trackActiveTab &&
      activeBaby &&
      activeBaby.id
    ) {
      if (this.props.tab.trackActiveTab === 'Growth') {
        this.growthFunction(currentDate, activeBaby);
      }
    }
  }

  growthFunction(currentDate, activeBaby) {
    const {dispatchGrowthListing} = this.props;
    if (activeBaby) {
      const data = {
        babyprofile_id: activeBaby.id,
        date: moment(currentDate).format('YYYY-MM-DD'),
      };
      dispatchGrowthListing(data);
    }
  }

  redirectToAddEntry() {
    const {navigation} = this.props;
    navigation.navigate('AddGrowth');
  }

  checkMonth(date) {
    let month = '';

    if (date >= 1 && date < 2) {
      month = 'Jan';
    }
    if (date >= 2 && date < 3) {
      month = 'Feb';
    }
    if (date >= 3 && date < 4) {
      month = 'March';
    }

    return month;
  }

  setPoint(data) {
    if (JSON.stringify(data) === JSON.stringify(this.state)) {
      this.setState({
        from: null,
        selectedPoint: null,
      });
      return;
    }
    this.setState({...data});
  }

  getHidePointIndexs(items) {
    let pointIndexes = [];
    for (let i in items) {
      if (items[i] == 0) {
        pointIndexes.push(Number(i));
      } else {
        pointIndexes = [];
      }
    }
    return pointIndexes;
  }

  render() {
    temp = [];
    const {growth} = this.props;
    let list = growth.growthListing || [];

    const tmpStaticData = [];
    let counter = 5;
    for (let i in chartData) {
      if (Number(i) < 1) {
        for (let j = 0; j < 4; j++) {
          tmpStaticData.push(counter);
          counter += 1;
        }
      } else {
        for (let j = 0; j < 4; j++) {
          tmpStaticData.push(0);
          // counter +=2;
        }
      }
      // if(chartData !== "Mar" & )
    }

    list = list.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA - dateB;
    });

    const _newMonths = [];
    const _newHeights = [];
    const _newWeightOz = [];
    const _newWeightLbs = [];
    // let _counter = 0;
    // let currentMonth = moment().format("MMM");
    // let currentMonthData;
    for (let i in list) {
      const monthName = moment(list[i].date).format('MMM');
      const existingMonthIndex = _newMonths.findIndex(x => x === monthName);
      if (existingMonthIndex === -1) {
        _newMonths.push(monthName);
      }
      // const existingMonthIndex = _newMonths.findIndex((x) => x === monthName);
      // if(currentMonth === monthName && _newMonths.length !== 12) {
      // 	if(list[i].height != 0 ) {
      // 		currentMonthData = list[i];
      // 	}
      // }
      // if(existingMonthIndex === -1) {
      // 	_newMonths.push(monthName);
      // }
      // if(_newHeights.length < 48) {

      // if(Number(i) < 10) {
      // 	_newHeights.push(_counter);
      // 	_newWeightOz.push(_counter);
      // 	_newWeightLbs.push(_counter);
      // } else {
      // 	_newHeights.push(0);
      // 	_newWeightOz.push(0);
      // 	_newWeightLbs.push(0);
      // }
      // _counter = _counter+2;
      _newHeights.push(Number(list[i].height));
      _newWeightOz.push(Number(list[i].weight_oz));
      _newWeightLbs.push(Number(list[i].weight_lb));
      // }
    }
    // const heightList = [];
    // const weightList = [];
    // const graphItems = [];
    // const graphItemMonths = [];

    // const monthListings = [];
    // const itemsHeightWithMonths = [];
    // const itemsWeightWithMonths = [];
    // const itemsWeightLBSWithMonths = [];

    // const _itemHeight = [];
    // const _itemWeightWithLBS = [];
    // const _itemWeightWithOZ = [];

    // // Last 4 Months
    // for(let i=4;i>=1; i--) {
    // 	let startMonth = moment().subtract(i, 'months').startOf("month");
    // 	let endMonth = moment().subtract(i, 'months').endOf("month");
    // 	_itemHeight.push({
    // 		month: moment().subtract(i, 'months').startOf("month").format("MMM"),
    // 		number: Number(moment().subtract(i, 'months').startOf("month").format("M")),
    // 		values: []
    // 	})
    // 	_itemWeightWithLBS.push({
    // 		month: moment().subtract(i, 'months').startOf("month").format("MMM"),
    // 		number: Number(moment().subtract(i, 'months').startOf("month").format("M")),
    // 		values: []
    // 	})
    // 	_itemWeightWithOZ.push({
    // 		month: moment().subtract(i, 'months').startOf("month").format("MMM"),
    // 		number: Number(moment().subtract(i, 'months').startOf("month").format("M")),
    // 		values: []
    // 	})

    // 	const index = _itemHeight.findIndex((x) => x.month === moment().subtract(i, 'months').startOf("month").format("MMM"));
    // 	for(let j in list) {

    // 		if((moment(list[j].date).isAfter(startMonth) && moment(list[j].date).isBefore(endMonth)) || moment(list[j].date).isSame(endMonth) || moment(list[j].date).isSame(startMonth)) {

    // 			_itemHeight[index].values.push(Number(list[j].height));
    // 			_itemWeightWithLBS[index].values.push(Number(list[j].weight_lb));
    // 			_itemWeightWithOZ[index].values.push(Number(list[j].weight_oz));

    // 			// OLD
    // 			itemsHeightWithMonths.push(Number(list[j].height));
    // 			itemsWeightWithMonths.push(Number(list[j].weight_oz));
    // 			itemsWeightLBSWithMonths.push(Number(list[j].weight_lb));
    // 		}
    // 	}
    // 	monthListings.push(moment().subtract(i, 'months').startOf("month").format("MMM"));
    // }

    // // CURRENT MONTH
    // monthListings.push(moment().add(1,"months").format("MMM"));
    // let startMonth = moment().add(1,"months").startOf("month");
    // let endMonth = moment().add(1,"months").endOf("month");

    // _itemHeight.push({
    // 	month: moment().add(1,"months").startOf("month").format("MMM"),
    // 	number: Number(moment().add(1,"months").startOf("month").format("M")),
    // 	values: []
    // })
    // _itemWeightWithLBS.push({
    // 	month: moment().add(1,"months").startOf("month").format("MMM"),
    // 	number: Number(moment().add(1,"months").startOf("month").format("M")),
    // 	values: []
    // })
    // _itemWeightWithOZ.push({
    // 	month: moment().add(1,"months").startOf("month").format("MMM"),
    // 	number: Number(moment().add(1,"months").startOf("month").format("M")),
    // 	values: []
    // })
    // const index = _itemHeight.findIndex((x) => x.month === moment().add(1,"months").startOf("month").format("MMM"));
    // for(let j in list) {
    // 	if((moment(list[j].date).isAfter(startMonth) && moment(list[j].date).isBefore(endMonth)) || moment(list[j].date).isSame(endMonth) || moment(list[j].date).isSame(startMonth)) {

    // 		const startOfWeek = moment().add(1,"months").startOf('month').week();
    // 		const endOfWeek = moment().add(1,"months").endOf('month').week();
    // 		const currentWeek = moment().add(1,"months").week();
    // 		// for(let i = startOfWeek; i<=currentWeek; i++) {

    // 			if(moment(list[j].date).week() == currentWeek) {
    // 				_itemHeight[index].values.push(Number(list[j].height));
    // 				_itemWeightWithLBS[index].values.push(Number(list[j].weight_lb));
    // 				_itemWeightWithOZ[index].values.push(Number(list[j].weight_oz));
    // 			} else if(moment(list[j].date).week() < currentWeek){
    // 				// _itemHeight[index].values.push(_itemHeight[index-1].values[_itemHeight[index-1].values.length-1]);
    // 			}
    // 		// }
    // 		// for()

    // 		// const dateWeek = moment(list[j].date).startOf().week();
    // 		// const startOfWeek = moment().startOf().week()

    // 		// // if(dateWeek > startOfWeek && )
    // 		/// OLD
    // 		itemsHeightWithMonths.push(Number(list[j].height));
    // 		itemsWeightWithMonths.push(Number(list[j].weight_oz));
    // 		itemsWeightLBSWithMonths.push(Number(list[j].weight_lb));
    // 		// /// NEW
    // 		// _itemHeight[index].values.push(Number(list[j].height));
    // 		// _itemWeightWithLBS[index].values.push(Number(list[j].weight_lb));
    // 		// _itemWeightWithOZ[index].values.push(Number(list[j].weight_oz));
    // 	}
    // }

    // const _itemsListForGraph = [];
    // const _itemsListForGraphWeightOZ = [];

    // /// height Graph
    // for(let i in _itemHeight) {
    // 	if(_itemHeight[i].month !== moment().add(1,"months").startOf("month").format("MMM")) {
    // 		for(let j=0; j<4; j++) {
    // 			if(_itemHeight[i].values[j]) {
    // 				_itemsListForGraph.push(_itemHeight[i].values[j])
    // 			} else {
    // 				_itemsListForGraph.push(_itemsListForGraph[_itemsListForGraph.length-1] || 0);
    // 			}
    // 		}
    // 	} else {
    // 		for(let j=0; j<4; j++) {
    // 			if(_itemHeight[i].values[j]) {
    // 				_itemsListForGraph.push(0)
    // 			} else {
    // 				_itemsListForGraph.push(0);
    // 			}
    // 		}
    // 	}

    // 	// if(_itemHeight[i].values.length != 4) {
    // 	// 	for(let j=0; j<4; j++) {
    // 	// 		if(_itemHeight[i].values[j]) {
    // 	// 			_itemsListForGraph.push(_itemHeight[i].values[j])
    // 	// 		} else {
    // 	// 			_itemsListForGraph.push(_itemsListForGraph[_itemsListForGraph.length-1] || 0);
    // 	// 		}
    // 	// 	}
    // 	// } else {
    // 	// 	for(let j=0; j<4; j++) {
    // 	// 		if(_itemHeight[i].values[j]) {
    // 	// 			_itemsListForGraph.push(_itemHeight[i].values[j])
    // 	// 		} else {
    // 	// 			_itemsListForGraph.push(_itemsListForGraph[_itemsListForGraph.length-1] || 0);
    // 	// 		}
    // 	// 	}
    // 	// }
    // }
    // // Weight Graph
    // for(let i in _itemWeightWithOZ) {
    // 	if(_itemWeightWithOZ[i].values.length != 4) {
    // 		for(let j=0; j<4; j++) {
    // 			if(_itemWeightWithOZ[i].values[j]) {
    // 				_itemsListForGraphWeightOZ.push(_itemWeightWithOZ[i].values[j])
    // 			} else {
    // 				_itemsListForGraphWeightOZ.push(_itemsListForGraphWeightOZ[_itemsListForGraphWeightOZ.length-1] || 0);
    // 			}
    // 		}
    // 	} else {
    // 		for(let j=0; j<4; j++) {
    // 			if(_itemWeightWithOZ[i].values[j]) {
    // 				_itemsListForGraphWeightOZ.push(_itemWeightWithOZ[i].values[j])
    // 			} else {
    // 				_itemsListForGraphWeightOZ.push(_itemsListForGraphWeightOZ[_itemsListForGraphWeightOZ.length-1] || 0);
    // 			}
    // 		}
    // 	}
    // }

    const {selectedPoint, from, isModalOpen} = this.state;

    const currentHeight = list.length > 0 ? list[list.length - 1].height : 0;
    const currentWeight = list.length > 0 ? list[list.length - 1].weight_lb : 0;
    const currentOz = list.length > 0 ? list[list.length - 1].weight_oz : 0;

    // const hidePointIndexes = this.getHidePointIndexs(tmpStaticData);

    // const hidePointIndexesOfHeight = this.getHidePointIndexs(_newHeights);

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalOpen}
          onRequestClose={() => {
            this.setState({isModalOpen: false});
          }}>
          <View style={styles.setModalCentered}>
            <View style={styles.setModalView}>
              <View style={styles.setModalHeader}>
                <Text
                  style={styles.cancelText}
                  onPress={() => this.setState({isModalOpen: false})}>
                  Cancel
                </Text>
              </View>
              {selectedPoint && (
                <View>
                  <Text>
                    Date:
                    {selectedPoint.x} {from == 'height' ? 'Height' : 'Weight'}:{' '}
                    {selectedPoint.y}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Modal>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{paddingBottom: 10}}>
          {/* <GrahDemo /> */}
          <View style={styles.graphTitle}>
            <Text style={styles.graphTitleText}>Current Height:</Text>
            <Text style={styles.graphTitleSelect}>{currentHeight} in</Text>
          </View>
          {_newMonths.length > 0 && (
            <View>
              <LineChart
                fromZero={true}
                // hidePointsAtIndex={this.getHidePointIndexs(_newHeights)}
                data={{
                  labels: _newMonths,
                  datasets: [
                    {
                      data: _newHeights,
                    },
                  ],
                }}
                yAxisSuffix=" in"
                width={Dimensions.get('window').width - 15} // from react-native
                height={230}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(243, 146, 31, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                bezier={false}
                style={{
                  marginVertical: 20,
                  marginLeft: -25,
                }}
              />
            </View>
          )}

          <View style={styles.graphTitle}>
            <Text style={styles.graphTitleText}>Current Weight:</Text>
            <Text style={styles.graphTitleSelect}>
              {currentWeight} lbs
              {', '}
              {currentOz}
              oz
            </Text>
          </View>
          {_newMonths.length > 0 && (
            <View widh>
              <LineChart
                yAxisSuffix=" lbs"
                fromZero={true}
                // hidePointsAtIndex={hidePointIndexes}
                data={{
                  labels: _newMonths,
                  datasets: [
                    {
                      data: _newWeightLbs,
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 15} // from react-native
                height={230}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(243, 146, 31, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                bezier={false}
                style={{
                  marginVertical: 20,
                  marginLeft: -25,
                }}
              />
            </View>
          )}
          {/* <Svg width={400} height={300} viewBox="0 0 400 300" style={{ width: "100%", height: "auto" }}>
						<VictoryChart standalone={false} minDomain={{ y: 0 }} maxDomain={{ y: 35 }}>
							<VictoryGroup data={weightList}>
								<VictoryLine style={{
									data: { stroke: "#E4B167" },
									parent: { border: "1px solid #F0F0F0" }
								}}
								/>
								<VictoryScatter
									style={{ data: { fill: "#E4B167" } }}
									size={9}
									events={[{
										target: "data",
										eventHandlers: {
											onPressIn: (data, item, vlaue) => {
												this.setPoint({
													selectedPoint: item.datum,
													from: "width",
													isModalOpen: true
												});
												return [];
											}
										}
									}]}
								/>
							</VictoryGroup>
							<VictoryAxis
								tickFormat={(x) => {
									return x;
								}}
							/>
							<VictoryAxis tickValues={[0, 10, 20, 30, 40]} dependentAxis tickFormat={(x) => (`${Number(x)} oz`)} />
						</VictoryChart>
					</Svg> */}
        </ScrollView>
        <TouchableOpacity
          style={styles.addBreastfeed}
          onPress={() => this.redirectToAddEntry()}>
          <Image source={Images.GrowthCards.plusIcon} style={styles.dotsIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  growth: state.growth,
  activeBaby: getActiveBaby(state),
  tab: state.tab,
  track: state.track,
});

const mapDispatchToProps = {
  dispatchGrowthListing: data => handleGrowthListing(data),
  dispatchResetAuthState: () => resetAuthState(),
};

export default connect(mapStateToProps, mapDispatchToProps)(GrowthCards);
