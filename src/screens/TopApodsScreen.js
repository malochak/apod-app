import React, { Component } from 'react';
import {Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
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

  navigateToApod(apodDate) {
    this.props.navigation.navigate('SelectedTopApod', {apodDate});
  }

  render() {
    if (this.state.topApods !== '') {
        if (this.state.topApods != null) {
            var keyNames = Object.keys(this.state.topApods);
            const items = [];

            keyNames.forEach(item => {
                var topApodItem = this.state.topApods[item];
                items.push(
                  <TouchableOpacity
                      key = {topApodItem.date}
                      onPress={ () => this.navigateToApod(topApodItem.date)} >
                    <TopApod
                        key = {topApodItem.date}
                        url = {topApodItem.url}
                        title = {topApodItem.title}
                        date = {topApodItem.date}
                        likes = {topApodItem.likes} />
                  </TouchableOpacity>)
            });

            return (
              <ScrollView style={styles.container} >
                <Text style={styles.header}>APODS Rank</Text>
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
    backgroundColor: '#2c3e50',
    marginTop: 10,
    },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 15,
    color: '#92CBC5'
  },
})
