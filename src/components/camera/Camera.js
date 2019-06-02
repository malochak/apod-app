import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Camera2 extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        photo: ''
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);;
        let askStatus = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    takePicture() {
        this.camera.takePictureAsync({ skipProcessing: true }).then((data) => {
            this.props.navigation.state.params.putPhoto(data);
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
                                flex: 2,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    marginBottom: 20,
                                    marginLeft:50
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Ionicons
                                    name="ios-reverse-camera"
                                    color="white"
                                    size={45}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {this.takePicture()}}
                                style={styles.photoButton}
                            >
                                <Icon name='ios-radio-button-off' color={"#fff"} size={85} />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({

    photoButton: {
        justifyContent: 'center',
        flex: 0.7,
        alignSelf: 'flex-end',
        alignItems: 'center',
    }
});