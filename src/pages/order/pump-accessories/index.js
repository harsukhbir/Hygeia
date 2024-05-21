import React from 'react';
import {View, Text, Image, ScrollView, Linking} from 'react-native';
import {Images} from '../../../../src/assets/images';
import styles from './styles';

class PumpAccessoriesCards extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.breastpumptext}>
            Hygeia is proud to offer hospital-grade breast pumps and
            accessories.
          </Text>
          <View>
            <View style={styles.savebuttonStyle}>
              <Text
                style={styles.savebuttontextStyle}
                onPress={() =>
                  Linking.openURL(
                    'https://www.hygeiahealth.com/product-category/evolve-pump-accessories-parts/',
                  )
                }>
                Browse our latest breast pumps and accessories{' '}
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
                    'https://www.hygeiahealth.com/product-category/evolve-pump-accessories-parts/',
                  )
                }>
                https://www.hygeiahealth.com/product-category/evolve-pump-accessories-parts/
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PumpAccessoriesCards;
