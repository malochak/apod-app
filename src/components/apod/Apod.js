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
      <View style={styles.container}>
        {this.props.mediaType == 'image' ?
            (
                <ApodPic url = {this.props.url} />
            )
            :(
                <ApodVideo url = {this.props.url} style={{height: 200}} />
            )
        }
        <View style={styles.infoContainer}>
        <Text style={styles.title}> {this.props.title} </Text>
        <Text> {this.props.likes} </Text>
        <Text style={styles.date}> {this.props.date} </Text>
        <Text> {this.props.description} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 10
    },
    infoContainer: {
      margin: 5,
      textAlign: 'justify'
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16
    },
    date: {
      marginBottom: 5
    }
})
