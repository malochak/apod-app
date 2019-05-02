import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView
} from 'react-native';
import ApodPic from './ApodPic.js';
import ApodVideo from './ApodVideo.js';

export default class Apod extends Component {
  render() {
    return (
      <View>
        {this.props.mediaType == 'image' ?
            (
                <ApodPic url = {this.props.url} />
            )
            :(
                <ApodVideo url = {this.props.url} style={{height: 200}} />
            )
        }
        <ScrollView>
        <Text> {this.props.title} </Text>
        <Text> {this.props.date} </Text>
        <Text> {this.props.description} </Text>
        </ScrollView>
      </View>
    );
  }
}
