import React from 'react'

import ApodScreen from '../../screens/ApodScreen';
import LogonScreen from '../../screens/LogonScreen';
import SignupScreen from '../../screens/SignupScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import FavouritesScreen from '../../screens/FavouritesScreen.js';
import TopApodsScreen from '../../screens/TopApodsScreen.js';
import SelectedApodScreen from '../../screens/SelectedApodScreen.js';

import Icon from 'react-native-vector-icons/Ionicons';
import { createSwitchNavigator} from 'react-navigation';

  const LoginStack = createSwitchNavigator({
    SignIn : {screen : LogonScreen},
    SignUp : {screen : SignupScreen },
  });

  const SelectedApodStack = createSwitchNavigator({
    Favourites: {screen: FavouritesScreen},
    SelectedApod: {screen : SelectedApodScreen},
  });

  export const signedOutElements = {
    Apod: {
      screen: props => <ApodScreen date='2018-04-05' />,
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
    };

  export const signedInElements = {
    Apod: {
      screen: props => <ApodScreen date='2018-04-05' />,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-home' color={tintColor} size={24} />
        )
      }},
    Profile: { screen: ProfileScreen,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({tintColor}) => (
            <Icon name='ios-contact' color={tintColor} size={24} />
          )
        }},
    FavouritesScreen: { screen: SelectedApodStack,
        navigationOptions: {
          tabBarLabel: 'Favourites',
          tabBarIcon: ({tintColor}) => (
            <Icon name='ios-flame' color={tintColor} size={24} />
          )
        }},
    TopApodsScreen: { screen: TopApodsScreen,
        navigationOptions: {
          tabBarLabel: 'Top Apods',
          tabBarIcon: ({tintColor}) => (
            <Icon name='ios-rocket' color={tintColor} size={24} />
          )
        }},
  };

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
 };