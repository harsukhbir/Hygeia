import PropTypes from 'prop-types';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {showAPIErrorAlert} from '../utils/native';

const styles = StyleSheet.create({
  container: {},
  getStartedFBView: {
    marginTop: 12,
    backgroundColor: '#4367b3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loginWithText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  contentIcon: {
    color: 'white',
    marginRight: 10,
    fontSize: 14,
    marginTop: 2,
  },
});

export default function FacebookButton({fbClicked, text, style}) {
  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            fbClicked(data);
          });
        }
      },
      error => {
        showAPIErrorAlert(error);
      },
    );
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => loginWithFacebook()}>
        <View style={styles.getStartedFBView}>
          <Icon style={styles.contentIcon} name="facebook" />
          <Text style={styles.loginWithText}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

FacebookButton.propTypes = {
  fbClicked: PropTypes.func,
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
};

/* SPECIFIES THE DEFAULT VALUES FOR PROPS */
FacebookButton.defaultProps = {
  fbClicked: () => {},
  style: {},
};
