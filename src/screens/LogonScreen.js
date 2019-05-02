/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import LoginForm from '../components/logon/LoginForm'

export default class LogonScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.logoContainer}>

          <Image
            style='logo'
            source={require('../../assets/logo.png')}
          />
          <Text style={styles.title}> APPOD APP </Text>

        </View>

        <View style={styles.formContainer}>
          <LoginForm />
        </View>

      </KeyboardAvoidingView >
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
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: '#FFF',
    marginTop: 5,
    fontSize: 20,
    textAlign: 'center',
    opacity: 0.7
  },
  formContainer: {
    width: '100%'
  }
});
