import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Modal } from 'react-native';
import { firebase, auth } from './src/components/logon/authentication_logic/'

import AppContainer from './src/components/navigation/TabBarNavigation'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? console.debug(authUser.email)
        : console.debug('NOT SIGNED IN')
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AppContainer />
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