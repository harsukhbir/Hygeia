import {Easing, Animated} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from './pages/auth/welcome/welcome';
import LoginScreen from './pages/auth/login/login';
import SignupScreen from './pages/auth/signup/signup';
import ForgotPasswordScreen from './pages/auth/forgot-password';
import RootStack from './homeNavigator';

const transitionSlideConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: false,
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

const authRouteConfig = {
  Welcome: {screen: WelcomeScreen},
  Login: {screen: LoginScreen},
  Signup: {screen: SignupScreen},
  ForgotPassword: {screen: ForgotPasswordScreen},
  Home: {screen: RootStack},
};

const LogInNavigator = createStackNavigator(authRouteConfig, {
  defaultNavigationOptions: {headerShown: false},
  initialRouteParams: {transition: 'fade'},
  transitionConfig: transitionSlideConfig,
});

export default createAppContainer(LogInNavigator);
