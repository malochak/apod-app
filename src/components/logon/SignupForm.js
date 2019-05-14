/* @flow */

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import { auth } from './authentication_logic/';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};


export default class SignupForm extends Component {

  state = INITIAL_STATE


  handleSignUp = () => {
    Alert.alert(this.state.email)

    const {
      email,
      password
    } = this.state

    auth.doCreateUserWithEmailAndPassword(email, password)
    .then(authUser => {
      this.setState( () => ({...INITIAL_STATE}))
    }).catch(error => {
      Alert.alert("ERROR")
    })

}

  render() {
    return (
      <View style={styles.container}>

          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.input}

            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholderTextColor='rgba(225,225,225,0.7)'
          />

          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholderTextColor='rgba(225,225,225,0.7)'
          />
		  
		  <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor='rgba(225,225,225,0.7)'
          />

          <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
    buttonContainer:{
      backgroundColor: '#92CBC5',
        paddingVertical: 15
    },
    buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
      opacity: 0.7
  }
  })
