import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import { createMaterialBottomTabNavigator, createAppContainer } from 'react-navigation';
import ApodScreen from './src/screens/ApodScreen';
import LogonScreen from './src/screens/LogonScreen';


// export default class App extends React.Component {
//   render() {
//     return (
//       <HomeScreen />
//     );
//   }
// }

const TabNavigator = createMaterialBottomTabNavigator({
  Apod: { screen: ApodScreen },
  LogIn: { screen: LogonScreen}
});

export default createAppContainer(TabNavigator);


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
