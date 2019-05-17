import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class TopApods extends Component {
  render() {
    return (
        <View>
            <Image
                style={styles.image}
                source={{uri: this.props.url}} />
            <Text> {this.props.title} </Text>
            <Text> {this.props.likes} 
            <Icon name='ios-heart'  size={17} />
            </Text>
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
