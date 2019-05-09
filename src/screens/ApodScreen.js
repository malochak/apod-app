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
import { firebase } from '../components/logon/authentication_logic';
import Apod from '../components/apod/Apod.js'

export default class ApodScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apodData: '',
      date: 'today',
      refreshing: false
    };
  }

  componentDidMount() {
    this.getNewApod(this.props.date);
  }

  getNewApod(date) {
    {/* '2007-12-21' use that date to test horizontal img*/}
    var apodDate = date == 'today' ? this.createTodaysDate() : this.getRandomApodDate();
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
          api_key: process.env.APOD_API_KEY,
          date: apodDate
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
         console.debug(error)
         {/* @TODO
           do sth with errors
         */}
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
    this.setState({refreshing: true});
    this.getNewApod('random');
    this.setState({refreshing: false});
  }

  render() {
    if (this.state.apodData == '') {
      return <ActivityIndicator size="large" color="#2980b6"  />
    }
    return (
      <ScrollView refreshControl={
                                  <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                  />
                                }>
        {/* @TODO
           if user is not logged show only apod
            if is logged show also comments section, rate panel and adding to favourities
        */}
        <Apod title = {this.state.apodData.title} date = {this.state.apodData.date}
              url = {this.state.apodData.url} description = {this.state.apodData.explanation}
              mediaType = {this.state.apodData.media_type}
              likes = {this.state.apodData.likes} />
      </ScrollView>
    );
  }
}
