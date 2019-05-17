import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView,Alert } from 'react-native';
import { firebase } from '../components/logon/authentication_logic';
import TopApod from '../components/top/TopApod.js';

export default class TopApodsScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        topApods: ''
      };
   }

  componentDidMount() {
    var topApods = [];
    firebase.app.database().ref(`apods/`).orderByChild('likes').limitToLast(10).on('value', snapshot => {
      snapshot.forEach(child => {
             topApods.push(child.val());
      });
      topApods = topApods.reverse();
      this.setState({
        topApods: topApods
      })
    });
  }
  
  
  render() {
    if (this.state.topApods !== '') {
        if (this.state.topApods != null) {
            var keyNames = Object.keys(this.state.topApods);
            const items = [];
            
            keyNames.forEach(item => {
                var favItem = this.state.topApods[item];
                items.push(<TopApod
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
