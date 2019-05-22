import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

export default class Comment extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.user}</Text>
                <Text>{this.props.comment}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});