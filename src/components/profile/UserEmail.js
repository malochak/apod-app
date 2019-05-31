import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

export default class UserEmail extends Component {
    render() {
        return (
            <View >
                <Text style={styles.user}>Email[{" "}{this.props.user}{" "}]</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    user:{
        color: "#92CBC5",
        fontSize:17,
    }
});