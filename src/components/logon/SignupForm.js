/* @flow */

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import { auth } from './authentication_logic/';

const INITIAL_STATE = {
  email: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  error: null,
  PasswordErrorStatus : true,
  EmailErrorStatus : true,
  NicknameErrorStatus : true
};


export default class SignupForm extends Component {

  state = INITIAL_STATE

  onEnterPassword = (password) =>{
   
    if(password.trim() != 0){
     this.setState({password : password, PasswordErrorStatus : true}) ;
   }else if(password.trim() == 0){
       this.setState({password : password, PasswordErrorStatus : true}) ;
   }
  }

  onEnterConfirmPassword = (confirmPassword) =>{
   
    if(confirmPassword.trim() != 0){
     this.setState({confirmPassword : confirmPassword, PasswordErrorStatus : true}) ;
   }else if(confirmPassword.trim() == 0){
       this.setState({confirmPassword : confirmPassword, PasswordErrorStatus : true}) ;
   }
  }

  onEnterEmail = (email) =>{
   
    if(email.trim() != 0){
     this.setState({email : email, EmailErrorStatus : true}) ;
   }else if(email.trim() == 0){
       this.setState({email : email, EmailErrorStatus : true}) ;
   }
  }

  onEnterNickname = (nickname) =>{
   
    if(nickname.trim() != 0){
     this.setState({nickname : nickname, NicknameErrorStatus : true}) ;
   }else if(nickname.trim() == 0){
       this.setState({nickname : nickname, NicknameErrorStatus : true}) ;
   }
  }
  
  
  handleSignUp = () => {
    

    const {
      email,
      nickname,
      password,
      confirmPassword
    } = this.state

		if(confirmPassword === password && password.length >= 6){
		  if(nickname.length >= 4){
			auth.doCreateUserWithEmailAndPassword(email, password)
			.then(authUser => {        
				authUser.user.updateProfile({
				  displayName: nickname,
				}).then(function() {
				}).catch(function(error) {
				  console.debug('in update: ', error)
				});
				this.setState( () => ({...INITIAL_STATE}))
		  
			}).catch(error => {
			  this.setState({EmailErrorStatus : false}) ;
			})
		  } else {
			this.setState({NicknameErrorStatus : false}) ;
		  }
		} else {
		  this.setState({PasswordErrorStatus : false}) ;
		  if(nickname.length < 4){this.setState({NicknameErrorStatus : false}) ;}
		}
}
  render() {
    return (
      <View style={styles.container}>
	  
		   { this.state.EmailErrorStatus == false ? (
             <Text style={styles.errorMessage}>
              Invalid email or already registered
             </Text>
            ) : null  }
			
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            onChangeText={email => this.onEnterEmail(email)}
            placeholderTextColor='rgba(225,225,225,0.7)'
          />

			{ this.state.NicknameErrorStatus == false ? (
             <Text style={styles.errorMessage}>
              Nickname must be at least 4 characters long
             </Text>
            ) : null  }

          <TextInput
            placeholder="Nickname"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={nickname => this.setState({ nickname })}
            value={this.state.nickname}
            onChangeText={nickname => this.onEnterNickname(nickname)}
            placeholderTextColor='rgba(225,225,225,0.7)'
          />

			{ this.state.PasswordErrorStatus == false ? (
             <Text style={styles.errorMessage}>
              Password don't match or is to short
             </Text>
            ) : null  }
			
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            onChangeText={password => this.onEnterPassword(password)}
            placeholderTextColor='rgba(225,225,225,0.7)'
          />

          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.onEnterConfirmPassword(confirmPassword)}
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
  },
    errorMessage: {
      fontSize: 15,
      color:"red",
    }
  })
