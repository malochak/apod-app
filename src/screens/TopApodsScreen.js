import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../components/logon/authentication_logic/';

export default class TopApodsScreen extends Component {


  render() {
    return (
      <View style={styles.container}>
            <Text >TopApods</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
})
