/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {Tab, Tabs, ScrollableTab} from 'native-base';
import moment from 'moment';
import {Images} from '../../../src/assets/images';
import styles from './styles';
import BreastfeedCards from './breastfeed';
import PumpCards from './pump';
import BottlesCards from './bottles';
import DiapersCards from './diapers';
import GrowthCards from './growth';

class TrackScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentDate: moment().format('MMMM DD, YYYY'),
    };
  }

  prevClick(currentDate) {
    this.setState({
      currentDate: moment(currentDate)
        .subtract(1, 'days')
        .format('MMMM DD, YYYY'),
    });
  }

  nextClick(currentDate) {
    this.setState({
      currentDate: moment(currentDate).add(1, 'days').format('MMMM DD, YYYY'),
    });
  }

  render() {
    const {currentDate} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.TrackHeader}>
          <TouchableOpacity
            style={styles.prevArrow}
            onPress={() => {
              this.prevClick(currentDate);
            }}>
            <Image source={Images.Track.prevIcon} style={styles.ArrowIcon} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexGrow: 1, marginTop: 10}}>
          <Tabs
            onChangeTab={({i, ref, from}) => {
              // if(i === this.state.activeIndex) {
              // 	return;
              // }
              // this.setState({
              // 	activeIndex: i
              // })
              //! shiva-> this.props.dispatchSetTrackActiveTab(getIndexData(i).id);
            }}
            renderTabBar={() => (
              <ScrollableTab
                style={{height: 30, backgroundColor: '#fff', borderWidth: 0}}
              />
            )}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabBgColor={{
              backgroundColor: '#fff',
              paddingLeft: 0,
              paddingRight: 0,
            }}
            tabStyle={{
              backgroundColor: '#fff',
              borderBottomWidth: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
            tabContainerStyle={{
              elevation: 0,
              backgroundColor: '#fff',
              borderBottomWidth: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}>
            <Tab
              heading="Breastfeed"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}>
              <BreastfeedCards
                currentDate={currentDate}
                navigation={navigation}
              />
            </Tab>
            <Tab
              heading="Pump"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}>
              <PumpCards currentDate={currentDate} navigation={navigation} />
            </Tab>
            <Tab
              heading="Bottles"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}>
              <BottlesCards currentDate={currentDate} navigation={navigation} />
            </Tab>
            <Tab
              heading="Diapers"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}>
              <DiapersCards currentDate={currentDate} navigation={navigation} />
            </Tab>
            <Tab
              heading="Growth"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}>
              <GrowthCards currentDate={currentDate} navigation={navigation} />
            </Tab>
          </Tabs>
        </View>
      </View>
    );
  }
}

export default TrackScreen;
