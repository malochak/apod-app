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
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 250
  }
});