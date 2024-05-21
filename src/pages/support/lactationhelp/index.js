import React, {memo, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import NestIcon from '../../../../src/assets/svg/NestIcon';
import {Images} from '../../../../src/assets/images';

const {width} = Dimensions.get('window');

const LactationHelpCart = () => {
  const goToPage = useCallback(() => {
    Linking.openURL('https://book.nestcollaborative.com/1?partner=hygeia');
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.viewHeader}>
        <NestIcon />
      </View>

      <Text style={styles.textHeader}>
        Hygeia has partnered with the Nest Collaborative to offer our patients
        virtual breastfeeding consults by Lactation Consultants anywhere,
        anytime.
      </Text>

      <Text style={styles.textUnderHeader}>
        Covered in full by most health plans. Bilingual consultants available.
      </Text>

      <View style={styles.viewCircle}>
        <TouchableOpacity onPress={goToPage} style={styles.viewButton}>
          <Text style={styles.textButton}>Make an Appointment</Text>
          <Image
            source={Images.BreastpumpCards.leftarrowIcon}
            style={styles.dashboardboxImage}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.textFooter}>
        For general questions or assistance in making an appointment, please
        reach out to the Nest Collaborative directly at (888) 598-1554.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 15},
  viewHeader: {alignItems: 'center', marginTop: 15},
  textHeader: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  textUnderHeader: {
    textAlign: 'center',
    marginTop: 10,
    color: '#999999',
    fontSize: 12,
  },
  viewCircle: {alignItems: 'center', marginVertical: 20},
  viewButton: {
    width: width / 1.7,
    height: width / 1.7,
    borderRadius: width / 1.7 / 2,
    backgroundColor: '#E4B167',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dashboardboxImage: {width: 15, height: 15},
  textButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  textFooter: {fontSize: 16},
});

export default memo(LactationHelpCart);
