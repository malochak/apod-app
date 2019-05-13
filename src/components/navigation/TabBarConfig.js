import React from 'react'

import ApodScreen from '../../screens/ApodScreen';
import LogonScreen from '../../screens/LogonScreen';
import SignupScreen from '../../screens/SignupScreen';
import ProfileScreen from '../../screens/ProfileScreen';

import Icon from 'react-native-vector-icons/Ionicons';
import { createSwitchNavigator} from 'react-navigation';

const LoginStack = createSwitchNavigator({
  SignIn : {screen : LogonScreen},
  SignUp : {screen : SignupScreen }
}
)

export const tabNavigationElements = {
    Apod: { screen: props => <ApodScreen date='today' />,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-home' color={tintColor} size={24} />
        )
      }},
    Logon: { screen: LoginStack,
        navigationOptions: {
          tabBarLabel: 'Sign In',
          tabBarIcon: ({tintColor}) => (
            <Icon name='ios-log-in' color={tintColor} size={24} />
          )
        }},
  }

 export const tabNavigatorConfig = {
    initialRouteName: 'Apod',
    tabBarPosition: 'bottom',
    tabBarOptions : {
      activeTintColor: '#92cbc5',
      inactiveTintColor: '#FFF',
      style: { backgroundColor: '#262e3d' },
      indicatorStyle: {
        height: 0
      },
      showIcon: 'true',
      labelStyle: {
       fontSize: 10
       }
    },
  
  }