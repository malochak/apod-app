import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

export default class FavouriteApod extends Component {
  render() {
    return (
        <View>
            <Image
                style={styles.image}
                source={{uri: this.props.url}} />
            <Text> {this.props.title} </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 80
    }
})
