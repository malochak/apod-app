/* @flow */

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import { auth } from '../logon/authentication_logic';

const INITIAL_STATE = {
  password: '',
  newpassword: '',
  confirmPassword: '',
  error: null,
};


export default class ChangePassword extends Component {

  state = INITIAL_STATE


  handleSignUp = () => {
    Alert.alert("alert")

    const {
      password,
      newpassword,
      confirmPassword
    } = this.state


}
  render() {
    return (
      <View style={styles.container}>

          <TextInput
            secureTextEntry
            placeholder="New Password"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={newPassword => this.setState({ newPassword })}
            value={this.state.newPassword}
            placeholderTextColor='rgba(225,225,225,0.7)'
          />

          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={confirmPassowrd => this.setState({ confrimPassword })}
            value={this.state.confirmPassword}
            placeholderTextColor='rgba(225,225,225,0.7)'
          />


        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
     padding: 10,
     width: '100%',
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
        paddingVertical: 15,
    },
    buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
      opacity: 0.7,

  }
  })
