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
    if(this.props.url !== undefined || this.props.url !== null || this.props.url !== '') {
      return (
          <View style={styles.border}>
            <Image style={styles.container}
                   source={{uri: this.props.url}}
            />
          </View>
      );
    }else {
      return <Text>NO IMAGE</Text>
    }
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