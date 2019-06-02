import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { firebase } from "../logon/authentication_logic";
import Comment from "./Comment.js"
import Icon from 'react-native-vector-icons/Ionicons'

export default class ApodComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCommentInput: 'none',
            comments: '',
            icon: "ios-arrow-down",
            msg: "Show comments",
            commentText: '',
        };
    }

    componentWillReceiveProps() {
        this.componentDidMount();
    }

    componentDidMount() {
        this.setState({
            displayCommentInput: 'none',
            comments: '',
            icon: "ios-arrow-down",
            msg: "Show comments",
        });
        firebase.app.database().ref(`apods/${this.props.date}/comments`).on('value', (snapshot) => {
            this.setState({
                comments: snapshot.val() != null ? snapshot.val() : []
            });
        });
    }

    setDisplayState() {
        if (this.state.displayCommentInput === 'none') {
            this.setState({
                displayCommentInput: 'flex',
                msg: "Hide comments",
                icon: "ios-arrow-up",
            });
        } else {
            this.setState({
                displayCommentInput: 'none',
                msg: "Show comments",
                icon: "ios-arrow-down",
            });
        }
    }

    addComment() {
        var comment = this.state.commentText;
        if (comment.trim().length > 0) {
            comment = comment.trim();
            var user = firebase.auth.currentUser.email;
            var commentToAdd = { user: user, comment: comment };
            var commentsDb = firebase.app.database().ref(`apods/${this.props.date}/comments`);
            commentsDb.push(commentToAdd);
        }
        this.setState({
            commentText: ''
        })
    }

    isUserLoggedIn() {
        return firebase.auth.currentUser != null;
    }

    render() {
        if (this.state.comments !== '') {
            var keyNames = Object.keys(this.state.comments);
            const comments = [];

            keyNames.forEach(item => {
                var comment = this.state.comments[item];
                comments.push(
                    <Comment key={item} user={comment.user} comment={comment.comment} />
                )
            });

            var addComment;
            if (this.isUserLoggedIn()) {
                addComment = (
                    <View style={{ display: this.state.displayCommentInput
                        , flexDirection: "row", flex: 1, marginTop: 20, marginBottom:20 }}>
                        <TextInput editable={true}
                                   onChangeText={commentText => this.setState({ commentText })}
                                   value={this.state.commentText}
                                   style={styles.commentInput}
                                   placeholder="Share your opinion"
                                   placeholderTextColor="#fff"
                        />
                        <TouchableOpacity
                            onPress={() => this.addComment()}
                            style={styles.addComment}
                        >
                            <Icon name='md-send' color={"#92CBC5"} size={24} style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                    </View>
                )
            }else {
                addComment =
                    <View style={{ display: this.state.displayCommentInput
                        , flexDirection: "row", flex: 1, marginTop: 20, marginBottom:20 }}>
                        <Text style={styles.commentMessage}>Log in to add comment.</Text>
                    </View>
            }

            return (
                <View style={styles.commentSection}>
                    <TouchableOpacity
                        onPress={() => this.setDisplayState()}
                        style={styles.showComments}
                    >
                        <Icon name={this.state.icon} color={"#92CBC5"} size={24} style={{ marginRight: 15 }} />
                        <Text style={styles.btn}>{this.state.msg}</Text>
                    </TouchableOpacity>
                    {addComment}
                    <View style={{ display: this.state.displayCommentInput }}>
                        {comments}
                    </View>


                </View>
            );
        } else {
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
    },
    showComments: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 20,
        marginLeft: 20
    },
    btn: {
        fontSize: 20,
        color: "#92CBC5"
    },
    commentSection: {
        marginBottom: 30,
    },
    commentInput: {
        marginTop: 30,
        height: 50,
        paddingLeft: 5,
        marginLeft: 8,
        marginRight: 8,
        borderBottomWidth: 3,
        borderColor: '#92CBC5',
        flex:0.9,
        color:"#fff"
    },
    commentMessage: {
        marginTop: 30,
        paddingLeft: 5,
        marginLeft: 8,
        marginRight: 8,
        flex:0.9,
        color:"#fff"
    },
    addComment: {
        marginTop:50,
        flex:0.1
    }
});