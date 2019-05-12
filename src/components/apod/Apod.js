import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Button
} from 'react-native';
import { firebase } from '../logon/authentication_logic';
import ApodPic from './ApodPic.js';
import ApodVideo from './ApodVideo.js';

export default class Apod extends Component {
  updateLikes(date) {
      var likes = 0;
      var likesDb = firebase.app.database().ref(`apods/${date}/likes`);
      likesDb.on('value', res => {
        likes = res.val();
      });
      likes++;
      this.props.likes = likes;
      likesDb.set(likes);
  }

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
        <Button title="LIKE"
                onPress={() => this.updateLikes(this.props.date)}/>
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
