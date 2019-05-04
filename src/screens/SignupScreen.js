/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import SignupForm from '../components/logon/SignupForm'

export default class SignupScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Join to the APOD's WORLD</Text>
        </View>
        <View style={styles.formContainer}>
          <SignupForm />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  titleContainer: {
    paddingTop: 50,
    flexGrow: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 26,
  },
  formContainer: {
    width: '100%'
  }
});
