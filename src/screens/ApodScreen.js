import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import axios from 'axios';

export default class ApodScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { status: 'dede' };

    this.setTodaysApodData = this.setTodaysApodData.bind(this);
  }

  componentDidMount(){
    if (this.props.date == 'main') {
      this.setTodaysApodData();
    }else {

    }
  }

  setTodaysApodData() {
    var that = this;
    axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: 'A5SWdHubcRJvC3q8gSz9NBU8U0JdRH4cc54fNQSe'
      }
    })
    .then(({ data }) =>  {
      that.setState({
          status: data
      });
    })
    .catch(function (error) {
      that.setState({
          status: 'error'
      });
    });
  }

  getRandomApodData() {
    return 'random';
  }

  render() {
    return (
      <View>
        <Text> {this.state.status.date} </Text>
        <Text>elo</Text>
      </View>
    );
  }
}
