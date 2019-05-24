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
            <View style={styles.commentSection}>
                <Text style={styles.user}>{this.props.user}</Text>
                <Text style={{color:"#fff"}}>{this.props.comment}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    commentSection: {
        flex: 1,
        marginTop: 20,
        marginLeft: 8,
        paddingBottom:10,
        marginRight:8,
        borderRadius: 0,
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da',
    },
    user:{
        color: "#92CBC5",
        fontSize:17,
        marginBottom:8
    }
});