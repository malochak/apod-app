import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import {firebase} from "../logon/authentication_logic";
import Comment from "./Comment.js";

export default class ApodComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCommentInput: 'none',
            comments: ''
        };
    }

    componentWillReceiveProps() {
        this.componentDidMount();
    }

    componentDidMount() {
        this.setState({
            displayCommentInput: 'none'
        });
        firebase.app.database().ref(`apods/${this.props.date}/comments`).on('value', (snapshot) => {
            this.setState({
                comments: snapshot.val()
            });
        });
    }

    setDisplayState() {
        if (this.state.displayCommentInput === 'none') {
            this.setState({
                displayCommentInput: 'flex'
            });
        } else {
            this.setState({
                displayCommentInput: 'none'
            });
        }
    }

    render() {
        if (this.state.comments !== '') {
            var keyNames = Object.keys(this.state.comments);
            const comments = [];

            keyNames.forEach(item => {
                var comment = this.state.comments[item];
                comments.push(
                   <Comment user={comment.user} comment={comment.comment} />
                )
            });

            return (
                <View>
                    <Button title='Show comments' onPress={ () => this.setDisplayState()}/>
                    <View style={{display: this.state.displayCommentInput}}>
                        {comments}
                    </View>
                </View>
            );
        }else {
            return (
                <ActivityIndicator size="large" color="#2980b6" style={styles.loadingCircle} />
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height: 250
    },
    loadingCircle: {
        flex: 1,
        backgroundColor: "#2c3e50"
    }
});