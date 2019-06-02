import React from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import { firebase} from './src/components/logon/authentication_logic/'

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

  render() {
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
    backgroundColor: '#2c3e50'
  },
});

console.disableYellowBox = true;