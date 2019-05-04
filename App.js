import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApodScreen from './src/screens/ApodScreen.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ApodScreen date='today' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
