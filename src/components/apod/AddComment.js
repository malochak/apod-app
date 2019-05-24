import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Button,
    TouchableOpacity,
    Text
} from 'react-native';
import {firebase} from "../logon/authentication_logic";
import Icon from 'react-native-vector-icons/Ionicons'

export default class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCommentInput: 'none',
            commentText: ''
        };
    }

    componentWillReceiveProps() {
        this.componentDidMount();
    }

    componentDidMount() {
        this.setState({
            displayCommentInput: 'none'
        });
    }

    setDisplayState() {
        if (this.state.displayCommentInput === 'none') {
            this.setState({
                displayCommentInput: 'flex'
            });
        }else {
            this.setState({
                displayCommentInput: 'none'
            });
        }
    }

    addComment() {
        var comment = this.state.commentText;
        if (comment.trim().length > 0) {
            //@TODO change to user nickname
            //date user for testing - 2018-04-05

            comment = comment.trim();
            var user = firebase.auth.currentUser.email;
            var commentToAdd = {user: user, comment: comment};
            var commentsDb = firebase.app.database().ref(`apods/${this.props.date}/comments`);
            commentsDb.push(commentToAdd);
        }
        this.setState({
            commentText: ''
        })

    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.setDisplayState()}
                    style={styles.addComment}
                >
                    <Icon name='ios-add' color={"#92CBC5"} size={29} style={{ marginRight: 15, marginTop:3 }} />
                    <Text style={styles.btn}> Add comment</Text>
                </TouchableOpacity>

                <View style={{display: this.state.displayCommentInput}}>
                    <TextInput editable={true}
                               onChangeText={commentText => this.setState({commentText})}
                               value={this.state.commentText}/>
                    <Button title='Add' onPress={ () => this.addComment()}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height: 250
    },
    addComment: {
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
});