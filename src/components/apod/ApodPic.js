import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator
} from 'react-native';

export default class ApodPic extends Component {
  render() {
    {/* @TODO loading img icon
        sth like
        <ActivityIndicator size="large" color="#2980b6"  />
    */}
    return (
      <View style={styles.border}>
        <Image style={styles.container}
          source={{uri: this.props.url}}
          style={{height: 300}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin:5
  },
  border:{
  borderRadius: 4,
  borderWidth: 3,
  borderColor: '#92CBC5',
  marginLeft:10,
  marginRight:10
  }
});