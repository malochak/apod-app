import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { Permissions, Notifications } from 'expo';
import { firebase } from '../components/logon/authentication_logic';
import Apod from '../components/apod/Apod.js'

import {APOD_API_KEY} from 'react-native-dotenv'

export default class ApodScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apodData: '',
      date: 'today',
      refreshing: false
    };
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    try {
      let token = await Notifications.getExpoPushTokenAsync();

      firebase.app
        .database()
        .ref('users/notifications/' + firebase.auth.currentUser.uid + '/push_token')
        .set(token);
    } catch (error) {
      console.log(error);
    }
  }



  async componentDidMount() {
    this.registerForPushNotificationsAsync();
    this.getNewApod(this.props.date);
  }

  getNewApod(date) {
    var apodDate = date;
    if (date === 'today') {
        apodDate = this.createTodaysDate();
    }else if (date === 'random') {
        apodDate = this.getRandomApodDate();
    }
    firebase.app.database().ref(`apods/${apodDate}`).on('value', (snapshot) => {
         if (snapshot.exists()) {
            this.setState({
                 apodData: snapshot.val()
            });
         }
         else {
            this.setAndSaveApodToDatabase(apodDate);
         }
    });
  }

  setAndSaveApodToDatabase(apodDate) {
    axios.get('https://api.nasa.gov/planetary/apod', {
        params: {
          api_key: APOD_API_KEY,
          date: apodDate === 'today' ? '' : apodDate
        }
    })
    .then(( {data} ) =>  {
        this.setState({
            apodData: data
        });
        var newItem = firebase.app.database().ref(`apods/`);
        newItem.update({ [apodDate]: data});
        var likes = firebase.app.database().ref(`apods/${apodDate}`);
        likes.update( { 'likes': 0});
    })
    .catch((error) =>  {
         this.setState({
             apodData: 'error'
       });
    });
  }

  createTodaysDate() {
      var now = new Date();
      var year = now.getFullYear().toString();
      var month = (0+(now.getMonth()+1).toString()).slice(-2);
      var day = (0+(now.getDate().toString())).slice(-2);

      return year + "-" + month + "-" + day;
  }


  getRandomApodDate() {
    //an algorithm from https://apod.nasa.gov/apod/random_apod.html
    var now = new Date(); //right now
  	var min = new Date(1995, 5, 16).getTime(); // 1995 June 16 00:00:00, the first APOD
  	var max = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 18, 59, 59, 999).getTime(); // now converted UTC time at 03:59:59.999

  	max = max-(5*60*60*1000);

  	var random_date = Math.round(min+(Math.random()*(max-min)));

  	var missing_min = new Date(1995, 5, 17).getTime();
  	var missing_max = new Date(1995, 5, 19, 23, 59, 59, 999).getTime();

  	//if our random date falls in this range, remake it.
  	while(random_date >= missing_min && random_date <= missing_max) {
  		random_date = Math.round(min+(Math.random()*(max-min)));
  	}

  	//convert the timestamp back into a date object
  	random_date = new Date(random_date);
  	random_year = random_date.getFullYear().toString();
  	random_month = (0+(random_date.getMonth()+1).toString()).slice(-2); //zero pad the month
  	random_day = (0+(random_date.getDate().toString())).slice(-2); //zero pad the day

  	return random_year+ '-' +random_month + '-' + random_day;
  }

  onRefresh = () => {
    this.setState({refreshing: true, apodData: ''});
    this.getNewApod('random');
    this.setState({refreshing: false});
  };

  render() {
    var content;
    if (this.state.apodData === '') {
      return <ActivityIndicator size="large" color="#2980b6" style={styles.loadingCircle} />
    }else if (this.state.apodData === 'error') {
      content = <Text style={styles.info}> There is no APOD for today yet. Refresh the page</Text>
    }else {
        content = <Apod title = {this.state.apodData.title} date = {this.state.apodData.date}
                        url = {this.state.apodData.url}
                        description = {this.state.apodData.explanation}
                        mediaType = {this.state.apodData.media_type}
                        likes = {this.state.apodData.likes} />
    }
    return (
      <ScrollView style={styles.container} refreshControl={
                                  <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                  />
                                }>
          {content}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c3e50"
  },
  loadingCircle: {
    flex: 1,
    backgroundColor: "#2c3e50"
  },
  info: {
      color: "#fff",
      fontSize: 23,
      textAlign: "center",
      justifyContent: 'center',
      marginTop: 20
  }
});