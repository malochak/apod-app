import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';

import LoginForm from '../components/logon/LoginForm'

class LogonScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.logoContainer}>

          <Image
            style='logo'
            source={require('../../assets/logo.png')}
          />

        </View>

        <View style={styles.formContainer}>
          <LoginForm />
          <TouchableOpacity style={styles.signUpButtonContainer} onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text  style={styles.buttonText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    );
  }
}

export default withNavigation(LogonScreen)

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
    width: '100%',
  },
  signUpButtonContainer:{
    padding: 5
  },
    buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    opacity: 0.7
  }
  
});
