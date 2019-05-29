import React, {Component} from 'react';
import {KeyboardAvoidingView, View, StyleSheet, TextInput, TouchableOpacity, Text, Button, Image} from 'react-native';
import { firebase } from '../components/logon/authentication_logic';

export default class AddApodScreen extends Component {
    state = {title: '', errorMessage: null, photo: ''};

    launchCamera() {
        console.debug('in ImageData handling method');
        this.props.navigation.navigate('Camera', {putPhoto: this.putPhoto.bind(this)});
    }

    putPhoto(photo) {
        this.props.navigation.navigate('AddApod');
        this.uploadPhoto(photo);
    }

    async uploadPhoto(photo) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', photo, true);
            xhr.send(null);
        });
        var ref = firebase.app.storage().ref('img.jpg');
        ref.put(blob);
    }

    pepe() {



    }

    render() {
        var image;
        console.debug(this.props.photo)
        if (this.props.photo !== '') {
            image = <Image source={{uri: this.props.photo}}></Image>
        }else {
            image = <Text>Add image</Text>
        }
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.imageDataContainer}>
                    <View style={styles.content}>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="Title"
                            onChangeText={title => this.setState({title})}
                            value={this.state.title}
                        />
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            multiline={true}
                            numberOfLines={4}
                            editable={true}
                            placeholder="Description"
                            onChangeText={description => this.setState({description})}
                            value={this.state.description}
                        />
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Choose photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.launchCamera()}>
                            <Text style={styles.buttonText}>Take new photo</Text>
                        </TouchableOpacity>
                        <Button title='Upload' style={styles.buttonContainer} onPress={() => this.pepe()}/>
                        {image}
                    </View>
                </View>


            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    content: {
        padding: 20
    },
    imageDataContainer: {
        width: '100%',
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