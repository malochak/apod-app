import React, {Component} from 'react';
import {KeyboardAvoidingView, View, StyleSheet, TextInput, TouchableOpacity, Text, Button, Image} from 'react-native';
import { firebase } from '../components/logon/authentication_logic';


const INIT = {
    title : 'elo',
    errorMessage: null,
    photo: 'ttt'
}

export default class AddApodScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            title: '', 
            errorMessage: null, 
            photo: ''
        };
    }

    launchCamera() {
        this.props.navigation.navigate('Camera');
    }

    putPhoto(photo) {
        this.props.navigation.navigate('AddApod', {photo});
        //should change the state with photo.....
        // this.uploadApod(photo);
        this.setState(...INIT)
        
    }

    componentDidMount() {
        this.getPhoto(this.props.navigation.state.params)
    }

    getPhoto = (param) => {

        if(param != undefined){
        this.setState({title : 'test',
                    errorMessage: null,
                    photo : param.data.uri} )
            console.debug(this.state)
        }else {
            console.debug('equals undef')
        }

    }

    async uploadApod(photo) {
        var userApodRef = firebase.app.database().ref('userApods/');
        var userApod = {title: 'title', explanation: 'explanation', date: '2099-01-01', likes: 0};
        userApodRef.push(userApod).then(res => {
            var userApodId = res.getKey();
            this.uploadPhoto(photo, userApodId, firebase.app.database().ref(`userApods/${userApodId}`));
        });
    }
        
    changeState = (state) => this.setState({title : 'test', errorMessage : null, photo : state})

    async uploadPhoto(photo, imgName, userApodRef) {
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
        var ref = firebase.app.storage().ref(`${imgName}.jpg`);
        ref.put(blob).then(res => {
            ref.getDownloadURL().then(function(url) {
                userApodRef.update({ 'url': url});
            })
        });
    }

    pepe() {



    }

    render() {
        var image;
        console.debug(this.state)
        console.debug(this.state.photo)
        if (this.state.photo !== '') {
            image = <Text> {this.state.photo} </Text>
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