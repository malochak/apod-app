/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import LogonScreen from './LogonScreen'

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <LogonScreen />
        </View>
        <View style={styles.navbarContainer}>
          <Text> NAVBAR </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',

  },
  contentContainer: {
    flex: 1,
    height: '90%'
  },
  navbarContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  }
});

const tabM
