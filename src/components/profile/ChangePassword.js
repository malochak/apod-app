import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert ,StyleSheet} from 'react-native';
import { auth } from '../logon/authentication_logic';

const INITIAL_STATE = {
  newPassword: '',
  confirmPassword: '',
  error: null,
};


export default class ChangePassword extends Component {

  state = INITIAL_STATE

  handleChangePassword = () => {
      if(this.state.newPassword === this.state.confirmPassword && newPassword.length >= 6) {
    console.log(this.state.newPassword, this.state.confirmPassword)
        auth.doPasswordUpdate(this.state.newPassword)
      } else {
       Alert.alert("Typed passwords are not identical") 
      }
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
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            value={this.state.confirmPassword}
            placeholderTextColor='rgba(225,225,225,0.7)'
          />

          <TouchableOpacity style={styles.submitContainer} onPress={this.handleChangePassword}>
              <Text style={styles.buttonText}>Submit</Text>
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

    buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
      opacity: 0.7,

  },
  submitContainer:{
    backgroundColor: '#59b3ba',
    paddingVertical: 15,
    marginBottom: 25,
  },
  })
