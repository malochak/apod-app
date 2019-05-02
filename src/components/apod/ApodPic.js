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
      <View>
        <Image
          source={{uri: this.props.url}}
          style={{height: 300}}
          resizeMode="contain" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 300,
    justifyContent: 'center'
  }
});