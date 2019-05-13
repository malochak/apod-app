import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Modal } from 'react-native';
import { firebase, auth } from './src/components/logon/authentication_logic/'

import AppContainer from './src/components/navigation/TabBarNavigation'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
   
  }

  componentDidMount = () => firebase.auth.onAuthStateChanged( 
      user => user ? this.setState({authUser: true}) : this.setState({authUser : false})
    )

  refreshAuth = () => this.setState({authUser : authUser, refresh: !this.state.refresh} )

  render() {
    console.debug('in app : ' + this.state.authUser)
    return (
      <SafeAreaView style={styles.container}>
        <AppContainer authUser = {this.state.authUser}/>
      </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262e3d'
  },
})