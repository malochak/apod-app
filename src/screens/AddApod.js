import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class AddApod extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container} >
                <Icon onPress={() => this.props.navigation.navigate('Camera')} name='ios-camera' color={"#fff"} size={100} />
                <Text style={styles.label}>Open camera</Text>
            </View>
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
    label:{
        fontSize:30,
        color:"#fff"
    }
})
