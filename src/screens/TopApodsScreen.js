import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView,Alert } from 'react-native';
import { firebase } from '../components/logon/authentication_logic';
import TopApods from '../components/favs/TopApods.js';

export default class TopApodsScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        apodData: ''
      };
   }

  componentDidMount() {
    var userId = firebase.auth.currentUser.uid;
    firebase.app.database().ref(`apods/`).orderByChild('likes').limitToLast(10).on('value', snapshot => {
      this.setState({
        apodData: snapshot.val()
      })
    });
  }
  
  
  render() {
    if (this.state.apodData !== '') {
        if (this.state.apodData != null) {
            var keyNames = Object.keys(this.state.apodData);
            const items = [];
            
            keyNames.forEach(item => {
                var favItem = this.state.apodData[item];
                items.push(<TopApods
                    key = {favItem.date}
                    url = {favItem.url}
                    title = {favItem.title}
                    date = {favItem.date}
                    likes = {favItem.likes}
                             />)
            });

            return (
              <ScrollView style={styles.container} >
                {items}
              </ScrollView>
            );
        }else {
            return (
                <Text> Like sth  </Text>
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
