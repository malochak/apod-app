import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Modal } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation';
import ApodScreen from './src/screens/ApodScreen';
import LogonScreen from './src/screens/LogonScreen';
import Icon from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component{
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
  Apod: { screen: ApodScreen,
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
  },
 
}

const TabNavigator = createMaterialTopTabNavigator(tabNavigationElements, tabNavigatorConfig)

const AppContainer = createAppContainer(TabNavigator);

