/* @flow */

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';

const handleLogin = () => {
  Alert.alert('LOGIN HANDLING');
};

export default class SignupForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput style = {styles.input}
             autoCapitalize="none"
             onSubmitEditing={() => this.passwordInput.focus()}
             autoCorrect={false}
             keyboardType='email-address'
             returnKeyType="next"
             placeholder='Email'
             placeholderTextColor='rgba(225,225,225,0.7)'/>

          <TextInput style = {styles.input}
            returnKeyType="go"
            ref={(input)=> this.passwordInput = input}
            placeholder='Password'
            placeholderTextColor='rgba(225,225,225,0.7)'
            secureTextEntry/>

          <TextInput style = {styles.input}
            returnKeyType="go"
            ref={(input)=> this.passwordInput = input}
            placeholder='Re-type password'
            placeholderTextColor='rgba(225,225,225,0.7)'
            secureTextEntry/>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
            <Text  style={styles.buttonText}>Sign Up</Text>
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
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
  })
