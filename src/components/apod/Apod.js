import React, {Component} from 'react';
import {
  View,
  ListView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TouchableOpacity,
  Button
} from 'react-native';
import { firebase } from '../logon/authentication_logic';
import ApodPic from './ApodPic.js';
import ApodVideo from './ApodVideo.js';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Apod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.likes,
      star: 'ios-star-outline',
      heart: 'ios-heart-empty'
    };
  }

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
        <View style={styles.grid}>
          <Icon style={{ marginRight: 25 }} name={this.state.star} color='#92CBC5' size={28}
            onPress={() => this.setState(prev => (
              { star: this.state.star === 'ios-star-outline' ?  'ios-star' : 'ios-star-outline' }
          ))} />
          <Text style={styles.title}> {this.props.title} </Text>
          <Text> {this.props.date} </Text>
        </View>
        {this.props.mediaType == 'image' ?
            (
                <ApodPic url = {this.props.url} />
            )
            :(
                <ApodVideo url = {this.props.url} style={{height: 200}} />
            )
        }
        <View style={styles.infoContainer}>

          <View style={styles.grid}>
            <Icon style={{ marginRight: 10 }} name={this.state.heart} color='#92CBC5' size={24} onPress={() => {
              this.updateLikes(this.props.date)
              this.setState({heart: 'ios-heart'})
          }}/>

            <Text style={{ marginLeft: 10, marginTop:3, color:'#fff' }}> {this.props.likes} </Text>
          </View>

          <Text style={styles.description}>  {this.props.description} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  grid: {
    marginTop:12,
    marginBottom:12,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  infoContainer: {
    margin: 5,
    textAlign: 'justify',
    color: "white"
  },
  description: {
    color: 'white'
  },
  title: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#92CBC5'
  },
  date: {
    marginBottom: 5
  }
})
