import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class Camera2 extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        photo: ''
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    takePicture() {
        this.camera.takePictureAsync({ skipProcessing: true }).then((data) => {
            this.setState({
                photo: data.uri
            });
            this.props.navigation.state.params.putPhoto(data.uri);
        });
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type}
                            ref={ (ref) => {this.camera = ref} }>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Ionicons
                                    name="md-reverse-camera"
                                    color="white"
                                    size={30}
                                />
                            </TouchableOpacity>
                            <Button title='Take a picture' style={{height: 50}} onPress={() => {this.takePicture()}}/>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}
