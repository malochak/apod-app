import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ApodScreen from './src/screens/ApodScreen';
import LogonScreen from './src/screens/LogonScreen';
import Icon from 'react-native-vector-icons/Ionicons'

// export default class App extends React.Component{
//   render(){
//     return(
//         <TabNavigator />
//     )
//   }
// }

const TabNavigator = createMaterialBottomTabNavigator({
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
}, {
  initialRouteName: 'Apod',
  activeTintColor: 'white',
  activeColor: 'black',
  inactiveColor: 'orange',
  barStyle: { backgroundColor: '#FFF' }
})

export default createAppContainer(TabNavigator);
