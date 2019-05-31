import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import { RNCamera } from 'react-native-camera';

const INITIAL_STATE = {
  title: '',
  errorMessage: null
};

export default class ImageData extends Component {
  
  state = { title: '', errorMessage: null };

  launchCamera() {

      this.props.navigation.navigate('Camera');

  }

  render() {
    return (
         <View style={styles.container}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Title"
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            multiline = {true}
            numberOfLines = {4}
            editable = {true}
            placeholder="Description"
            onChangeText={description => this.setState({ description })}
            value={this.state.description}
          />
          <TouchableOpacity style={styles.buttonContainer} >
            <Text  style={styles.buttonText}>Choose photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={ () => this.launchCamera()}>
            <Text  style={styles.buttonText}>Take new photo</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({

    container: {
      padding: 20
    },
    input:{
      height: 40,
      backgroundColor: 'rgba(225,225,225,0.2)',
      marginBottom: 10,
      padding: 10,
      color: '#fff'
    },
    buttonContainer:{
      backgroundColor: '#92cbc5',
      paddingVertical: 15,
      marginBottom: 5
    },
    buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
      opacity: 0.7
    }


  });