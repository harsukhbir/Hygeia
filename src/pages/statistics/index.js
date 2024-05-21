import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import {Images} from '../../../src/assets/images';
import moment from 'moment';
import styles from './styles';

const StatisticsScreen = ({statistics}) => {
  const [currentDate, setCurrentDate] = useState(
    moment().format('MMMM DD, YYYY'),
  );

  useEffect(() => {
    fetchData();
  }, []);

  const convertToSecound = hms => {
    if (!hms) {
      return '0 minute';
    }
    let a = hms.split(':');
    let total = Number(a[0]) * 60 + Number(a[1]);
    let temp = Math.ceil(Number(total / 60).toFixed(1));
    if (temp > 60) {
      let hh = Math.ceil(temp / 60);
      if (hh === 1) {
        return `${hh} hour`;
      }
      return `${hh} hours`;
    } else {
      return `${temp} minutes`;
    }
  };

  const convertToGraph = hms => {
    let a = hms.split(':');
    let total = Number(a[0]) * 60 + Number(a[1]);
    let temp = Math.ceil(Number(total / 60).toFixed(1));
    return temp;
  };

  const prevClick = () => {
    setCurrentDate(
      moment(currentDate).subtract(1, 'days').format('MMMM DD, YYYY'),
    );
  };

  const nextClick = () => {
    setCurrentDate(moment(currentDate).add(1, 'days').format('MMMM DD, YYYY'));
  };

  const fetchData = () => {
    let startDate = moment(currentDate).subtract(6, 'd').format('YYYY-MM-DD');
    let endDate = moment(currentDate).format('YYYY-MM-DD');
    let data = new FormData();
    data.append('from_date', startDate);
    data.append('to_date', endDate);
    // Fetch data based on the currentDate
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.statisticsHeader}>
          <TouchableOpacity style={styles.prevArrow} onPress={prevClick}>
            <Image
              source={Images.Statistics?.prevIcon}
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
        </View>

        <View style={styles.statisticsgraphBox}>
          <Text style={{marginBottom: 10, color: '#333333', fontWeight: '500'}}>
            Average total time will be accurate once data for an entire week has
            been entered.
          </Text>
          <Text style={styles.statisticsgraphTitle}>Breastfeeding:</Text>
          {/* Content */}
        </View>

        <View style={styles.statisticsgraphBox}>
          <Text style={styles.statisticsgraphTitle}>Pumping:</Text>
          {/* Content */}
        </View>

        <View style={styles.statisticsgraphBox}>
          <Text style={styles.statisticsgraphTitle}>Bottles:</Text>
          {/* Content */}
        </View>

        <View style={styles.statisticsgraphBox}>
          <Text style={styles.statisticsgraphTitle}>Diapers:</Text>
          {/* Content */}
        </View>
      </View>
    </ScrollView>
  );
};

export default StatisticsScreen;
