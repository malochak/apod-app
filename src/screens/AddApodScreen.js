import React, {Component} from 'react';
import {Alert, KeyboardAvoidingView, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, Button, Image} from 'react-native';
import { firebase } from '../components/logon/authentication_logic';
import Icon from 'react-native-vector-icons/Ionicons';

const TITLE_MIN_LENGTH = 2;
export default class AddApodScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            errorMessage: null,
            photo: ''
        };
    }

    refreshScreen() {
        this.setState({
            title: '',
            description: '',
            errorMessage: null,
            photo: ''
        })
    }

    launchCamera() {
        this.props.navigation.navigate('Camera', {putPhoto: this.putPhoto.bind(this)});
    }

    putPhoto(data) {
        console.debug('aas ', data)
        this.props.navigation.navigate('AddApod', {
            data:data,
            title:this.state.title,
            description: this.state.description
        });
    }

    componentDidMount() {
        this.getPhoto(this.props.navigation.state.params)
    }

    getPhoto = (param) => {
        if(param != undefined){
        this.setState({
                    title: param.title,
                    description: param.description,
                    errorMessage: null,
                    photo: param.data.uri} )
        }
    };

    createTodaysDate() {
        var now = new Date();
        var year = now.getFullYear().toString();
        var month = (0+(now.getMonth()+1).toString()).slice(-2);
        var day = (0+(now.getDate().toString())).slice(-2);

        return year + "-" + month + "-" + day;
    };

    checkAndUpload() {
        if (this.isApodValid()) {
            this.uploadApod();
        }else {
            Alert.alert("Error adding an APOD", this.getMessageForInvalidApod());
        }
    }

    isApodValid() {
        return this.state.title.length > TITLE_MIN_LENGTH && this.state.photo !== '';
    }

    getMessageForInvalidApod() {
        var message = '';
        if (this.state.title.length > TITLE_MIN_LENGTH) {
            console.debug('title valid')
        }else {
            message += `Enter a title with at least ${TITLE_MIN_LENGTH+1} characters. `;
        }
        if (this.state.photo !== '') {
            console.debug('photo valid')
        }else {
            message += `Add a picture. `;
        }
        return message;
    }

    async uploadApod() {
        var userApodRef = firebase.app.database().ref('userApods/');
        var userApod = {
            title: this.state.title,
            explanation: this.state.description,
            date: this.createTodaysDate(),
            author: firebase.auth.currentUser.email,
            likes: 0};
        userApodRef.push(userApod).then(res => {
            var userApodId = res.getKey();
            this.uploadPhoto(this.state.photo, userApodId, firebase.app.database().ref(`userApods/${userApodId}`));
        });
    }

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
        this.refreshScreen();
    }

    launchPhotoPicker = () => {
        this.props.navigation.navigate('PhotoPicker', {putPhoto: this.putPhoto.bind(this)});
    }

    render() {
        var image;
        if (this.state.photo !== '') {
            image = <Image  source={{uri: this.state.photo}} style={{height: 300, width: 200}}/>
        }
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <ScrollView style={styles.imageDataContainer}>
                    <View style={styles.content}>
                        <Text style={styles.header}>Add your own APOD</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="Title"
                            placeholderTextColor="#fff"
                            onChangeText={title => this.setState({title})}
                            value={this.state.title}
                        />
                        <TextInput
                            style={styles.inputField}
                            autoCapitalize="none"
                            multiline={true}
                            numberOfLines={4}
                            placeholderTextColor="#fff"
                            editable={true}
                            placeholder="Description"
                            onChangeText={description => this.setState({description})}
                            value={this.state.description}
                        />
                        <TouchableOpacity style={styles.buttonContainer} onPress={ () => this.launchPhotoPicker()}>
                            <Text style={styles.buttonText}>Choose photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.launchCamera()}>
                            <Text style={styles.buttonText}>Take a picture</Text>
                        </TouchableOpacity>
                        <View style={styles.imageStyle}>{image}</View>
                        <TouchableOpacity style={styles.uploadContainer} onPress={() => this.checkAndUpload()}>
                            <Icon style={styles.photo} name='ios-cloud-upload' color={"#fff"} size={40} />
                            <Text style={styles.upload}> Upload </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>


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
    header:{
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 15,
        color: '#92CBC5'
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
        color: '#fff',
    },
    inputField: {
        height: 140,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff',},
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
        opacity: 0.9
    },
    imageStyle:{
        alignItems: 'center',
        flex: 1,
        marginTop:16,
    },
    uploadContainer:{
        flex:2,
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'center',
        marginBottom:15,
    },
    upload:{
        color: "#fff",
        fontSize:20,
    },
    photo:{
        marginTop:10,
        marginRight: 10
    }

});