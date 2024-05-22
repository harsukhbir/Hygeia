import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, ScrollView} from 'react-native';
import LanguageSwitcher from '../../../src/components/LanguageSwitcher';
import HeaderComponent from '../../../src/components/HeaderComponent';
import {Images} from '../../../src/assets/images';
import {translate} from '../../../src/locales/i18n';
import styles from './styles';
import {resetAuthState} from '../../store/slices/authSlice';

class TutorialsScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps: {i18n, insets}}) => {
    return {
      title: translate('tutorialsScreen.headerTitle'),
      headerRight: () => (
        <LanguageSwitcher navigation={navigation} i18n={i18n} insets={insets} />
      ),
      header: () => <HeaderComponent />,
    };
  };

  componentDidMount() {}

  logOutHandler() {
    const {dispatchResetAuthState} = this.props;
    dispatchResetAuthState();
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.tutorialsTitle}>Tutorials</Text>
          <View>
            <View style={styles.tutorialsVideoBox}>
              <Image
                source={Images.Tutorials.tutorialsVideo}
                style={styles.tutorialsVideo}
              />
              <Text style={styles.tutorialsvideoText}>
                Hygeia Evolve Instructional Video
              </Text>
            </View>
            <View style={styles.tutorialsVideoBox}>
              <Image
                source={Images.Tutorials.tutorialsVideo}
                style={styles.tutorialsVideo}
              />
              <Text style={styles.tutorialsvideoText}>
                Hygeia Evolve Instructional Video in Spanish
              </Text>
            </View>
            <View style={styles.tutorialsVideoBox}>
              <Image
                source={Images.Tutorials.tutorialsVideo}
                style={styles.tutorialsVideo}
              />
              <Text style={styles.tutorialsvideoText}>
                Hygeia Evolve Troubleshooting Video
              </Text>
            </View>
            <View style={styles.tutorialsVideoBox}>
              <Image
                source={Images.Tutorials.tutorialsVideo}
                style={styles.tutorialsVideo}
              />
              <Text style={styles.tutorialsvideoText}>
                Hygeia Evolve Troubleshooting Video in Spanish
              </Text>
            </View>
            <View style={styles.tutorialsVideoBox}>
              <Image
                source={Images.Tutorials.tutorialsVideo}
                style={styles.tutorialsVideo}
              />
              <Text style={styles.tutorialsvideoText}>
                Hygeia Evolve Instructions for Use Document
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = {
  dispatchResetAuthState: () => resetAuthState(),
};

export default connect(null, mapDispatchToProps)(TutorialsScreen);
