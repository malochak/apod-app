import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import {firebase} from "../logon/authentication_logic";
import Comment from "./Comment.js"
import Icon from 'react-native-vector-icons/Ionicons'

export default class ApodComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCommentInput: 'none',
            comments: '',
            icon:"ios-arrow-down",
            msg:"Show comments",
        };
    }

    componentWillReceiveProps() {
        this.componentDidMount();
    }

    componentDidMount() {
        this.setState({
            displayCommentInput: 'none',
            comments: '',
            icon:"ios-arrow-down",
            msg:"Show comments",
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
                msg:"Hide comments",
                icon: "ios-arrow-up",
            });
        } else {
            this.setState({
                displayCommentInput: 'none',
                msg:"Show comments",
                icon: "ios-arrow-down",
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
                <View style={styles.commentSection}>
                    <TouchableOpacity
                        onPress={() => this.setDisplayState()}
                        style={styles.showComments}
                    >
                        <Icon name={this.state.icon} color={"#92CBC5"} size={24} style={{marginRight:15}}/>
                        <Text style={styles.btn}>{this.state.msg}</Text>
                    </TouchableOpacity>



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
    },
    showComments:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:"center",
        marginTop: 20,
        marginLeft: 20
    },
    btn:{
        fontSize:20,
        color:"#92CBC5"
    },
    commentSection:{
        marginBottom:30
    }

});