
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, KeyboardAvoidingView } from 'react-native';
import { firebase } from '../components/logon/authentication_logic';
import { auth } from '../components/logon/authentication_logic/';
import UserEmail from '../components/profile/UserEmail'
import ChangePassword from '../components/profile/ChangePassword'
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      user: firebase.auth.currentUser.email,
    };
  }


  handleSignOut = () => {
    auth.doSignOut()
    .then( () => {
        Alert.alert("SIGNED OUT")
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.upperView}>
          <Image
                style='logo'
                source={require('../../assets/logo.png')}
          />
          <UserEmail style={styles.greetTextView} user ={this.state.user}/>
        </View>

        <View behavior="padding" style={styles.avoidContainer}>
          <Text style={styles.passTextView}>Change Your Password</Text>
          <ChangePassword/>
        </View>

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
        justifyContent: 'center',
        backgroundColor: '#2c3e50',
    },
    buttonContainer:{
      backgroundColor: '#B82929',
        paddingVertical: 14,
        width: '95%',
        marginBottom: 10,
    },
    avoidContainer:{
      width: '95%',
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        opacity: 0.8
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
       paddingTop:50,
    }
})
