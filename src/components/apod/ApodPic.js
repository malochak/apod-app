import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

export default class ApodPic extends Component {
  render() {
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
