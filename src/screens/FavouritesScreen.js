import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView } from 'react-native';
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
                            key = {favItem.date}
                            url = {favItem.url}
                            title = {favItem.title}
                            date = {favItem.date} />)
            });

            return (
              <ScrollView style={styles.container} >
                {items}
              </ScrollView>
            );
        }else {
            return (
                <Text> Add sth to favourites </Text>
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
    }
})
