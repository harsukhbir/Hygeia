import React from 'react';
import {View, Text, Image, ScrollView, Linking} from 'react-native';
import {Images} from '../../../../src/assets/images';
import styles from './styles';

class BreastpumpCards extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.breastpumptext}>
            Many moms can receive a hospital-grade pump, bottles, and
            accessories at NO COST with qualifying insurance.
          </Text>
          <View>
            <View style={styles.savebuttonStyle}>
              <Text
                style={styles.savebuttontextStyle}
                onPress={() =>
                  Linking.openURL(
                    'https://form.abreastpumpandmore.com/?source=Google',
                  )
                }>
                See if you qualify for a pump through your insurance today{' '}
              </Text>
              <Image
                source={Images.BreastpumpCards.leftarrowIcon}
                style={styles.dashboardboxImage}
              />
            </View>
            <View style={styles.learnmorebutton}>
              <Text style={styles.learnmoreText}>
                If the button doesn't work, copy and paste the following link in
                your browser:
              </Text>
              <Text
                style={styles.learnmoreTextCopy}
                onPress={() =>
                  Linking.openURL(
                    'https://form.abreastpumpandmore.com/?source=Google',
                  )
                }>
                https://form.abreastpumpandmore.com/?source=Google
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default BreastpumpCards;
