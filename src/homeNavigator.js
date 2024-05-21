import React, {memo, useCallback} from 'react';
import {
  Easing,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

import {isIOS} from './utils/native';
import {Images} from '../src/assets/images';

/* PAGES */
import HomeScreen from './pages/home';
import TrackScreen from './pages/track';
import DashboardScreen from './pages/dashboard';
import OrderScreen from './pages/order';
import EditProfileScreen from './pages/editprofile';
import AddProfileScreen from './pages/addprofile';
import SettingsScreen from './pages/settings';
import AddBreastfeedEntryScreen from './pages/add-breastfeed-entry';
import EditBreastfeedScreen from './pages/edit-breastfeed';
import BreastfeedEntryDetailsScreen from './pages/breastfeed-entry-details';
import SupportScreen from './pages/support';
import ProductSupportScreen from './pages/product-support';
import TechSupportScreen from './pages/tech-support';
import AddPumpEntryScreen from './pages/add-pump-entry';
import EditPumpScreen from './pages/edit-pump';
import AddBottleScreen from './pages/add-bottle';
import EditBottleScreen from './pages/edit-bottle';
import AddDiaperScreen from './pages/add-diaper';
import EditDiaperScreen from './pages/edit-diaper';
import AddGrowthScreen from './pages/add-growth';
import ChangePasswordScreen from './pages/change-password';
import {translate} from './locales/i18n';
import HeaderComponent from '../src/components/HeaderComponent';
import EvolveVideos from './pages/support/tutorials/EvolveVideos';
import ProVideos from './pages/support/tutorials/ProVideos';
import StatisticsScreen from './pages/statistics';

const HeaderLeft = memo(({navigation}) => {
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <TouchableOpacity
      onPress={handleBack}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
      }}>
      <Image source={Images.Track.prevIcon} style={{tintColor: '#000'}} />
      <Text
        style={{
          fontSize: 12,
          lineHeight: 14,
          textTransform: 'uppercase',
          color: '#000',
          marginLeft: 7,
        }}>
        Back
      </Text>
    </TouchableOpacity>
  );
});

const transitionSlideConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const {layout, position, scene} = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      });

      return {transform: [{translateX}]};
    },
  };
};

const stackHeaderStyle = {
  backgroundColor: '#fff',
  shadowOpacity: 0,
  shadowOffset: {
    height: 0,
  },
  shadowRadius: 0,
  borderBottomWidth: 0,
  elevation: 0,
  ...(Platform.OS === 'ios' && {height: getStatusBarHeight(true) + 63}),
};

const stackHeaderTitleStyle = {
  color: 'white',
  fontWeight: '400',
  marginLeft: isIOS() ? 0 : 20,
  marginRight: 0,
  textAlign: isIOS() ? 'center' : 'left',
  width: '100%',
};
/* HOME STACK */
const homeRouteConfig = {
  Home: {screen: HomeScreen},
};

const HomeTabStack = createStackNavigator(homeRouteConfig, {
  defaultNavigationOptions: {
    headerStyle: stackHeaderStyle,
    headerTitleStyle: stackHeaderTitleStyle,
    headerTintColor: 'white',
  },
  initialRouteParams: {transition: 'fade'},
  transitionConfig: transitionSlideConfig,
});

const TrackTabStack = createStackNavigator(
  {
    Track: {
      screen: TrackScreen,
      navigationOptions: {header: () => <HeaderComponent />},
    },
    AddBreastfeedEntry: {screen: AddBreastfeedEntryScreen},
    EditBreastfeed: {screen: EditBreastfeedScreen},
    BreastfeedEntryDetails: {screen: BreastfeedEntryDetailsScreen},
    AddPumpEntry: {screen: AddPumpEntryScreen},
    EditPump: {screen: EditPumpScreen},
    AddBottle: {screen: AddBottleScreen},
    EditBottle: {screen: EditBottleScreen},
    AddDiaper: {screen: AddDiaperScreen},
    EditDiaper: {screen: EditDiaperScreen},
    AddGrowth: {screen: AddGrowthScreen},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: stackHeaderStyle,
      headerTitleStyle: stackHeaderTitleStyle,
      cardStyle: {backgroundColor: '#fff'},
      title: '',
      headerLeft: () => <HeaderLeft navigation={navigation} />,
    }),
    initialRouteParams: {transition: 'fade'},
    transitionConfig: transitionSlideConfig,
  },
);

TrackTabStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    const currentScreen = getActiveRouteName(navigation.state);
    if (
      currentScreen === 'AddBreastfeedEntry' ||
      currentScreen === 'BreastfeedEntryDetails' ||
      currentScreen === 'AddPumpEntry' ||
      currentScreen === 'AddBottle' ||
      currentScreen === 'AddDiaper' ||
      currentScreen === 'AddGrowth'
    ) {
      tabBarVisible = false;
    }
  }
  return {
    tabBarVisible,
  };
};

const SupportTabStack = createStackNavigator(
  {
    Support: {
      screen: SupportScreen,
      navigationOptions: {header: () => <HeaderComponent />},
    },
    ProductSupport: {screen: ProductSupportScreen},
    TechSupport: {screen: TechSupportScreen},
    EvolveVideos: {screen: EvolveVideos},
    ProVideos: {screen: ProVideos},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: stackHeaderStyle,
      headerTitleStyle: stackHeaderTitleStyle,
      cardStyle: {backgroundColor: '#fff'},
      title: '',
      headerLeft: () => <HeaderLeft navigation={navigation} />,
    }),
    initialRouteParams: {transition: 'fade'},
    transitionConfig: transitionSlideConfig,
  },
);

const OrderTabStack = createStackNavigator(
  {
    Order: {
      screen: OrderScreen,
      navigationOptions: {header: () => <HeaderComponent />},
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: stackHeaderStyle,
      headerTitleStyle: stackHeaderTitleStyle,
      headerTintColor: 'white',
      cardStyle: {backgroundColor: '#fff'},
    },
    initialRouteParams: {transition: 'fade'},
    transitionConfig: transitionSlideConfig,
  },
);

const DashboardTabStack = createStackNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: {header: () => <HeaderComponent />},
    },
    EditProfile: {screen: EditProfileScreen},
    AddProfile: {screen: AddProfileScreen},
    Settings: {screen: SettingsScreen},
    ChangePassword: {screen: ChangePasswordScreen},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: stackHeaderStyle,
      headerTitleStyle: stackHeaderTitleStyle,
      cardStyle: {backgroundColor: '#fff'},
      title: '',
      headerLeft: () => <HeaderLeft navigation={navigation} />,
    }),
    initialRouteParams: {transition: 'fade'},
    transitionConfig: transitionSlideConfig,
  },
);

const StatisticsTabStack = createStackNavigator(
  {
    Statistics: {
      screen: StatisticsScreen,
      navigationOptions: {header: () => <HeaderComponent />},
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: stackHeaderStyle,
      headerTitleStyle: stackHeaderTitleStyle,
      headerTintColor: 'white',
      cardStyle: {backgroundColor: '#fff'},
    },
    initialRouteParams: {transition: 'fade'},
    transitionConfig: transitionSlideConfig,
  },
);

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];

  if (route.routes) {
    return this.getActiveRouteName(route);
  }
  return route.routeName;
}

DashboardTabStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    const currentScreen = getActiveRouteName(navigation.state);
    if (
      currentScreen === 'EditProfile' ||
      currentScreen === 'Settings' ||
      currentScreen === 'ChangePassword' ||
      currentScreen === 'AddProfile'
    ) {
      tabBarVisible = false;
    }
  }
  return {
    tabBarVisible,
  };
};

/* BOTTOM TAB NAVIGATOR */
const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardTabStack,
      navigationOptions: {
        tabBarIcon: ({focused, color}) => (
          <Image
            resizeMode="contain"
            source={Images.Footertab.dashboardBlackIcon}
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? '#000' : '#757575',
            }}
          />
        ),
        title: translate('tabTitle.dashboard'),
        tabBarButtonComponent: TouchableOpacity,
      },
    },

    Track: {
      screen: TrackTabStack,
      navigationOptions: {
        tabBarIcon: ({focused, color}) => (
          <Image
            resizeMode="contain"
            source={Images.Footertab.trackBlackIcon}
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? '#000' : '#757575',
            }}
          />
        ),
        title: translate('tabTitle.track'),
        tabBarButtonComponent: TouchableOpacity,
      },
    },
    Statistics: {
      screen: StatisticsTabStack,
      navigationOptions: {
        tabBarIcon: ({focused, color}) => (
          <Image
            resizeMode="contain"
            source={Images.Footertab.statisticsBlackIcon}
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? '#000' : '#757575',
            }}
          />
        ),
        title: translate('tabTitle.statistics'),
        tabBarButtonComponent: TouchableOpacity,
      },
    },
    Support: {
      screen: SupportTabStack,
      navigationOptions: {
        tabBarIcon: ({focused, color}) => (
          <Image
            resizeMode="contain"
            source={Images.Footertab.supportBlackIcon}
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? '#000' : '#757575',
            }}
          />
        ),
        title: translate('tabTitle.support'),
        tabBarButtonComponent: TouchableOpacity,
      },
    },
    Order: {
      screen: OrderTabStack,
      navigationOptions: {
        tabBarIcon: ({focused, color}) => (
          <Image
            resizeMode="contain"
            source={Images.Footertab.orderBlackIcon}
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? '#000' : '#757575',
            }}
          />
        ),
        title: translate('tabTitle.order'),
        tabBarButtonComponent: TouchableOpacity,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#000',
      inactiveTintColor: '#888888',
      labelStyle: {
        fontSize: Dimensions.get('screen').width < 375 ? 11 : 12,
        fontWeight: 'bold',
      },
    },
  },
);

const RootStack = createStackNavigator(
  {
    Dashboard: TabNavigator,
    Home: HomeTabStack,
  },
  {
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default RootStack;
