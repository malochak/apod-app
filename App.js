import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupScreen from './src/screens/SignupScreen'


export default class App extends React.Component {
  render() {
    return (
      <SignupScreen />
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
