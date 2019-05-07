/* @flow */

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import { auth } from './authentication_logic/auth';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

export default class LoginForm extends Component {

  state = { email: '', password: '', errorMessage: null }
  
  handleLogin = (event) => {
    Alert.alert("login handling")
  }

  render() {

    return (
      <View style={styles.container}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <TextInput
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.signInButtonContainer} onPress={this.handleLogin}>
          <Text  style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButtonContainer} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text  style={styles.buttonText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    signInButtonContainer:{
        backgroundColor: '#92cbc5',
        paddingVertical: 15
    },
    signUpButtonContainer:{
        paddingTop: 15
  },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        opacity: 0.7
    }
  })
