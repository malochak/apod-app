import ApodScreen from './src/screens/ApodScreen';
import LogonScreen from './src/screens/LogonScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import Icon from 'react-native-vector-icons/Ionicons';


export const tabNavigationElements = {
    Apod: { screen: props => <ApodScreen date='today' />,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-home' color={tintColor} size={24} />
        )
      }},
    Logon: { screen: LogonScreen,
        navigationOptions: {
          tabBarLabel: 'Sign In',
          tabBarIcon: ({tintColor}) => (
            <Icon name='ios-log-in' color={tintColor} size={24} />
          )
        }},
      SignUp: { screen: SignupScreen,
        navigationOptions: {
          tabBarLabel: 'Sign Up',
          tabBarIcon: ({tintColor}) => (
            <Icon name='ios-log-in' color={tintColor} size={24} />
          )
        }},
        Profile: { screen: ProfileScreen,
          navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => (
              <Icon name='ios-contact' color={tintColor} size={24} />
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