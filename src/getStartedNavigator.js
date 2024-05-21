import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PurchasedScreen from './pages/auth/purchased';
import GetStartedScreen from './pages/auth/get-started';

const getStartedRouteConfig = {
  Purchased: {screen: PurchasedScreen},
  GetStarted: {screen: GetStartedScreen},
};

const GetStartedNavigator = createStackNavigator(getStartedRouteConfig, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'white',
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowRadius: 0,
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerTitleStyle: {
      color: '#323232',
      fontSize: 20,
      letterSpacing: 0.2,
      fontWeight: 'normal',
      marginHorizontal: 0,
    },
    headerShown: false,
  },
});

// const CreateProfileContainer = createAppContainer(CreateProfileNavigator)

export default createAppContainer(GetStartedNavigator);
