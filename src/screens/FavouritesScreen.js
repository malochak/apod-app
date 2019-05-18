import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { firebase } from '../components/logon/authentication_logic';
import FavouriteApod from '../components/favs/FavouriteApod.js';

export default class FavouritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: ''
    };
  }

  componentDidMount() {
    var userId = firebase.auth.currentUser.uid;
    firebase.app.database().ref(`users/favourites/${userId}/`).on('value', snapshot => {
      this.setState({
        favourites: snapshot.val()
      })
    });
  }

  render() {
    if (this.state.favourites !== '') {
      if (this.state.favourites != null) {
        var keyNames = Object.keys(this.state.favourites);
        const items = [];

        keyNames.forEach(item => {
          var favItem = this.state.favourites[item];
          items.push(<FavouriteApod
            key={favItem.date}
            url={favItem.url}
            title={favItem.title}
            date={favItem.date} />)
        });

        return (
          <ScrollView style={styles.container} >
            <Text style={styles.header}>Your favourite APOD</Text>
            {items}
          </ScrollView>
        );
      } else {
        return (
          <View style={styles.containerNoFav}>
            <Text style={styles.info}>There are no apods in your favourites</Text>
            <Text style={styles.info}>  Add your favourite apod to list </Text>
          </View>

        );
      }
    } else {
      /* @TODO
      */
      return (
        <Text> WAIT </Text>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50"
  },
  header: {
    color: "#fff",
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 15
  },
  info: {
    color: "#fff",
    fontSize: 23,
    textAlign: "center",
    justifyContent: 'center',
    marginTop: 20
  },
  containerNoFav:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2c3e50',
  }
})
