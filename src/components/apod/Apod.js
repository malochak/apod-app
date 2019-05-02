import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import ApodPic from './ApodPic.js';

export default class Apod extends Component {
  render() {
    return (
      <View>
        <Text> {this.props.title} </Text>
        <Text> {this.props.date} </Text>
        <Text> {this.props.mediaType} </Text>
        {this.props.mediaType == 'image' ?
         (
          <ApodPic url = {this.props.url} />
         )
        :(
          <Text> vid </Text>
        )}
        <Text> {this.props.description} </Text>
      </View>
    );
  }
}
