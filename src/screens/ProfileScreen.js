
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { firebase } from '../components/logon/authentication_logic';
import { auth } from '../components/logon/authentication_logic/';
import ChangePassword from '../components/profile/ChangePassword'
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
    };
  }
 

  handleSignOut = () => {
    auth.doSignOut()
    .then( () => {
        Alert.alert("SIGNED OUT")
    })
  }

  handleChangePassword = () => {
   
        Alert.alert("Password changed")
  
  }

  render() {
  
    return (
      <View style={styles.container}>
        <View style={styles.upperView}>
          <Image
                style='logo'
                source={require('../../assets/logo.png')}
          />
          
          
        
        </View>

        <Text style={styles.passTextView}>Change Your Password</Text>
        <ChangePassword/>
        <TouchableOpacity style={styles.submitContainer} onPress={this.handleChangePassword}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSignOut}>
            <Text style={styles.buttonText}>SignOut</Text>
        </TouchableOpacity>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    buttonContainer:{
        backgroundColor: '#d31010',
        paddingVertical: 15,
        width: '100%',
        marginBottom: 10,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        opacity: 0.7
    },
    passTextView:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
      opacity: 0.7
    },
    greetTextView:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
      opacity: 0.7,
    },
    submitContainer:{
      backgroundColor: '#59b3ba',
      paddingVertical: 15,
      width: '50%',
      marginBottom: 38,
    },
    logo: {
      alignItems: 'center',
      width: 100,
      height: 100,
      marginBottom:30,
     
    },
    upperView: {
       alignItems: 'center',
       textAlign: 'center',
       flex: 1,
       paddingTop:70,
    }
})
