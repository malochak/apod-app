import React, { Component } from 'react';
import { KeyboardAvoidingView, View, StyleSheet} from 'react-native';
import ImageData from '../components/storage/ImageData';

export default class AddApodScreen extends Component {

  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            
            <View style={styles.imageDataContainer}>
             <ImageData  />
            </View>

 
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    imageDataContainer:{
        width: '100%',      
    }

  });