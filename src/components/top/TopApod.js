import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

export default class TopApod extends Component {
  render() {
    return (
        <View>
            <Image
                style={styles.image}
                source={{uri: this.props.url}} />
            <Text> {this.props.title} </Text>
            <Text> {this.props.likes} </Text>
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
