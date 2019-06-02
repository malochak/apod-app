import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default class ApodPic extends Component {
  render() {
    {}
    if(this.props.url !== undefined) {
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