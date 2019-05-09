import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Modal } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebase, auth } from './src/components/logon/authentication_logic/'


import ApodScreen from './src/screens/ApodScreen';
import LogonScreen from './src/screens/LogonScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileScreen from './src/screens/ProfileScreen';

export default class App extends React.Component{
  
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? console.debug(authUser.email)
        : console.debug('NOT SIGNED IN')
    });
  }
    
  render(){
    return(
       <SafeAreaView style={styles.container}>
          <AppContainer />
        </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
})


const tabNavigationElements = {
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

const tabNavigatorConfig = {
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

const TabNavigator = createMaterialTopTabNavigator(tabNavigationElements, tabNavigatorConfig)

const AppContainer = createAppContainer(TabNavigator);
