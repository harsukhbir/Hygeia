import PropTypes from 'prop-types';
import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Button} from 'native-base';
import {AppTheme} from '../utils/appTheme';

const styles = StyleSheet.create({
  container: {},
  loginButton: {
    width: '100%',
    backgroundColor: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    elevation: 0,
    paddingVertical: 8,
    borderRadius: 4,
    height: 54,
    maxWidth: 300,
  },
  loginButtonText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: AppTheme.primaryColor,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ButtonComponent({
  buttonClicked,
  buttonText,
  style,
  buttonStyle,
  buttonTextStyle,
  disabled,
  isLoading,
}) {
  return (
    <View style={[styles.container, style]}>
      <Button
        style={[styles.loginButton, buttonStyle, {opacity: disabled ? 0.5 : 1}]}
        onPress={buttonClicked}
        disabled={disabled}>
        {!isLoading && (
          <Text style={[styles.loginButtonText, buttonTextStyle]}>
            {buttonText}
          </Text>
        )}
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={styles.activityIndicator}
          />
        )}
      </Button>
    </View>
  );
}

ButtonComponent.propTypes = {
  buttonClicked: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
  style: PropTypes.object,
  buttonStyle: PropTypes.object,
  buttonTextStyle: PropTypes.object,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

/* SPECIFIES THE DEFAULT VALUES FOR PROPS */
ButtonComponent.defaultProps = {
  buttonClicked: () => {},
  style: {},
  buttonStyle: {},
  buttonTextStyle: {},
  disabled: false,
  isLoading: false,
};
