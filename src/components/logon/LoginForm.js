/* @flow */

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import { auth } from './authentication_logic/';


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

export default class LoginForm extends Component {

  state = { email: '', password: '', errorMessage: null,
  ErrorStatus : true, }

  onEnterText = (email) =>{
   
    if(email.trim() != 0){
     this.setState({email : email, ErrorStatus : true}) ;
   }else if(email.trim() == 0){
       this.setState({email : email, ErrorStatus : true}) ;
   }
 }

 onEnterPassword = (password) =>{
   
  if(password.trim() != 0){
   this.setState({password : password, ErrorStatus : true}) ;
 }else if(password.trim() == 0){
     this.setState({password : password, ErrorStatus : true}) ;
 }
}


  handleLogin = (event) => {
 

    const {
      email,
      password,
    } = this.state;

   

    auth.doSignInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState(() => ({...INITIAL_STATE}))
      Alert.alert("You are logged in")
    })
    .catch( error => {
      this.setState({ErrorStatus : false}) ;
     
    })
  }

  render() {

    return (
      <View style={styles.container}>

        { this.state.ErrorStatus == false ? (
             <Text style={styles.errorMessage}>
              Email or Password is incorrect
             </Text>
            ) : null  }


        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })} 
          value={this.state.email} 
          onChangeText={email => this.onEnterText(email)}

        />

        <TextInput
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          onChangeText={password => this.onEnterPassword(password)}

        />
         
        <TouchableOpacity style={styles.signInButtonContainer} onPress={this.handleLogin}>
          <Text  style={styles.buttonText}>Sign In</Text>
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
    },
    errorMessage: {
      fontSize: 15,
      color:"red",
      padding: 5,
      marginBottom: 5,
    }
  })
