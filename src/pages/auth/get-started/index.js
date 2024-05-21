import React from 'react';
import {connect} from 'react-redux';
import {isEmptyObject} from '../../../../src/utils/native';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as authActions from '../../../../src/redux/actions/authActions';
import * as userAction from '../../../../src/redux/actions/userAction';
import GetStartedForm from './form';
import styles from './styles';

class GetStartedScreen extends React.Component {
  submitForm(values) {
    // const {dispatchGetStarted, dispatchCreateProfile} = this.props;
    if (!isEmptyObject(values)) {
      // dispatchCreateProfile(values);
    }
  }

  skipNowScreen() {
    console.log('skip clicked!');
    // const {dispatchGetStarted} = this.props;
    // dispatchGetStarted(true);
  }

  render() {
    return (
      <LinearGradient style={styles.container} colors={['#E8BC7D', '#E8BC7D']}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentArea}>
            <View style={styles.getStartedHeader}>
              <Text style={styles.getStartedTitle}>
                Let's get started with your baby's profile.
              </Text>
              <TouchableOpacity
                onPress={() => this.skipNowScreen()}
                style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Skip for now </Text>
                <MaterialIcon style={styles.skipButtonIcon}>
                  keyboard_backspace
                </MaterialIcon>
              </TouchableOpacity>
            </View>
            <GetStartedForm submitForm={values => this.submitForm(values)} />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer,
});

// const mapDispatchToProps = {
//   dispatchGetStarted: data => authActions.getStartedSuccess(data),
//   dispatchCreateProfile: data => userAction.CreateProfiles(data),
// };

// export default connect(mapStateToProps, mapDispatchToProps)(GetStartedScreen);
export default GetStartedScreen;
