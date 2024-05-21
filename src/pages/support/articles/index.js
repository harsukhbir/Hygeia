import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Images} from '../../../../src/assets/images';
import styles from './styles';

class ArticlesScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.articlesImgBox}
            onPress={() =>
              Linking.openURL(
                'https://www.hygeiahealth.com/blog/how-to-breastfeed/',
              )
            }>
            <Image source={Images.Articles.howTo} style={styles.articlesImg} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>How to Breastfeed</Text>
              <Text style={styles.articledescription}>
                While breastfeeding is one of the most natural acts in the
                world, that doesn’t mean it comes naturally ...
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.articlesImgBox}
            onPress={() =>
              Linking.openURL(
                'https://www.hygeiahealth.com/blog/breastfeed-understanding-benefits-breastfeeding/',
              )
            }>
            <Image
              source={Images.Articles.understanding}
              style={styles.articlesImg}
            />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>
                Understanding the Benefits of Breastfeeding{' '}
              </Text>
              <Text style={styles.articledescription}>
                Everyone knows that breastfeeding is SO beneficial for babies.
                This article from ProMom lists ...
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.articlesImgBox}
            onPress={() =>
              Linking.openURL(
                'https://www.hygeiahealth.com/blog/pumping-and-storing/',
              )
            }>
            <Image
              source={Images.Articles.pupming_storing}
              style={styles.articlesImg}
            />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>Pumping and Storing Tips </Text>
              <Text style={styles.articledescription}>
                While it would be great if it were always convenient to
                breastfeed baby directly, sometimes ...
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.articlesImgBox}
            onPress={() =>
              Linking.openURL(
                'https://www.hygeiahealth.com/blog/preparing-pumping-work/',
              )
            }>
            <Image source={Images.Articles.work} style={styles.articlesImg} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>
                Preparing for Pumping at Work{' '}
              </Text>
              <Text style={styles.articledescription}>
                Who knew? A few years ago we could only dream of a federal law
                that would provide break ...
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.articlesImgBox}
            onPress={() =>
              Linking.openURL(
                'https://www.hygeiahealth.com/guidelines-for-storing-and-thawing-breast-milk/',
              )
            }>
            <Image
              source={Images.Articles.guideline}
              style={styles.articlesImg}
            />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>
                Guidelines for Storing & Thawing Breast Milk
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.articlesImgBox}
            onPress={() =>
              Linking.openURL('https://www.hygeiahealth.com/pro/')
            }>
            <Image
              source={Images.Articles.evolve_info}
              style={styles.articlesImg}
            />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>
                Hygeia Pro Information Guide
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.articlesImgBox}
            onPress={() =>
              Linking.openURL('https://www.hygeiahealth.com/happy-customers/')
            }>
            <Image
              source={Images.Articles.reviews}
              style={styles.articlesImg}
            />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>
                Reviews for Hygeia Breast Pumps
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default ArticlesScreen;
