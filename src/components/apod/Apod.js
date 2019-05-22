import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import { firebase } from '../logon/authentication_logic';
import ApodPic from './ApodPic.js';
import ApodVideo from './ApodVideo.js';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Apod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star: 'ios-star-outline',
      heart: 'ios-heart-empty'
    };
  }

  componentWillReceiveProps() {
    this.componentDidMount();
  }

  componentDidMount() {
    if(this.isUserLoggedIn()) {
        if (this.checkIfUserAlreadyLikedThisApod()) {
            this.setState({ heart: 'ios-heart' })
        } else {
            this.setState({ heart: 'ios-heart-empty' })
        }
        if (this.hasUserApodInFavourites()) {
            this.setState({ star: 'ios-star' });
        } else {
            this.setState({ star: 'ios-star-outline' });
        }
    } else {
        this.setState({
          heart: 'ios-heart-empty',
          star: 'ios-star-outline'
         });
    }
  }

  updateLikes(date) {
    if (this.isUserLoggedIn()) {
        if (!this.checkIfUserAlreadyLikedThisApod()) {
            var likes = 0;
            var likesDb = firebase.app.database().ref(`apods/${date}/likes`);
            likesDb.on('value', res => {
              likes = res.val();
            });
            likes++;
            this.props.likes = likes;
            this.setState({ heart: 'ios-heart' });
            likesDb.set(likes);
            var userId = firebase.auth.currentUser.uid;
            var userLikeDb = firebase.app.database().ref(`users/likes/${userId}/${date}`);
            userLikeDb.set(date);
        } else {
            this.setState({ heart: 'ios-heart' })
        }
    } else {
       Alert.alert("Log in to like an APOD.")
    }
  }

  checkIfUserAlreadyLikedThisApod() {
     var exists = false;
     if (this.isUserLoggedIn()) {
        var userId = firebase.auth.currentUser.uid;
        var date = this.props.date;
        firebase.app.database().ref(`users/likes/${userId}/${date}`).on('value', (snapshot) => {
                if (snapshot.exists()) {
                     exists = true;
                     this.setState({ heart: 'ios-heart' });
                }
                else {
                    exists = false;
                    this.setState({ heart: 'ios-heart-empty' });
                }
        });
     }
     return exists;
  }

  updateFavourites(date) {
    if (this.isUserLoggedIn()) {
        var userId = firebase.auth.currentUser.uid;
        var favs = firebase.app.database().ref(`users/favourites/${userId}/${date}`);
        if (this.hasUserApodInFavourites()) {
            favs.remove();
            this.setState({ star: 'ios-star-outline' })
        } else {
            favs.update({ 'title': this.props.title});
            favs.update({ 'url': this.props.url});
            favs.update({ 'date': this.props.date});
            this.setState({ star: 'ios-star' });
        }
    } else {
       Alert.alert("Log in to add an APOD to favourites.")
    }
  }

  hasUserApodInFavourites() {
     var exists = false;
     if (this.isUserLoggedIn()) {
        var userId = firebase.auth.currentUser.uid;
        var date = this.props.date;
        firebase.app.database().ref(`users/favourites/${userId}/${date}`).on('value', (snapshot) => {
                if (snapshot.exists()) {
                     exists = true;
                     this.setState({ star: 'ios-star' });
                }
                else {
                    exists = false;
                    this.setState({ star: 'ios-star-outline' });
                }
        });
     }
     return exists;
  }

  isUserLoggedIn() {
    return firebase.auth.currentUser != null;
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.topGrid}>
          <Icon style={{ marginRight: 25 }} name={this.state.star} color='#92CBC5' size={28}
            onPress={() => this.updateFavourites(this.props.date) } />
          <Text style={{ marginTop: 6, color: "#fff" }}> {this.props.date} </Text>
        </View>
        <Text style={styles.title}> {this.props.title} </Text>
        {this.props.mediaType == 'image' ?
          (
            <ApodPic url={this.props.url} />
          )
          : (
            <ApodVideo url={this.props.url} style={{ height: 200 }} />
          )
        }
        <View style={styles.infoContainer}>

          <View style={styles.grid}>
            <Icon style={{ marginRight: 10 }} name={this.state.heart} color='#92CBC5' size={24}
             onPress={() =>  this.updateLikes(this.props.date) } />

            <Text style={{ marginLeft: 10, marginTop: 3, color: '#fff' }}> {this.props.likes} </Text>
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
  topGrid: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 12,
    marginRight: 20,
    marginLeft: 20,
    flex: 1,
    flexDirection: 'row'
  },
  grid: {
    marginTop: 12,
    marginBottom: 12,
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
    color: 'white',
    textAlign: 'justify',
    marginLeft: 6,
    marginRight:6
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
