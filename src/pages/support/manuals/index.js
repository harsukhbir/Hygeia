import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Images} from '../../../../src/assets/images';
import styles from './styles';

class ManualsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.supportList}>
            <TouchableOpacity
              style={styles.supportListItem}
              onPress={() =>
                Linking.openURL(
                  'http://mobile-app-1.hygeiahealth.com/breastfeeding-api-lv/hygeia_pro_instrutions_for_use.pdf',
                )
              }>
              <Text style={styles.supportText}>
                Hygeia Pro Instructions for Use
              </Text>
              <Image
                source={Images.ContactusScreen.rightArrowIcon}
                style={styles.supportImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.supportListItem}
              onPress={() =>
                Linking.openURL(
                  'http://mobile-app-1.hygeiahealth.com/breastfeeding-api-lv/instrucciones_de_uso_hygeia_pro.pdf',
                )
              }>
              <Text style={styles.supportText}>
                Instrucciones de Uso Hygeia Pro
              </Text>
              <Image
                source={Images.ContactusScreen.rightArrowIcon}
                style={styles.supportImage}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ManualsScreen;
