/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import SignupForm from '../components/logon/SignupForm'

import { withNavigation } from 'react-navigation'


class SignupScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Join to the APOD's WORLD</Text>
        </View>
        <View style={styles.formContainer}>
          <SignupForm />
          <TouchableOpacity style={styles.signInButtonContainer} onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text  style={styles.buttonText}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default withNavigation(SignupScreen)

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
  },
  signInButtonContainer:{
    paddingTop: 15
  },
  buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
      opacity: 0.7
  }
});
