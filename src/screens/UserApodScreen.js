import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import { firebase } from '../components/logon/authentication_logic';
import UserApod from "../components/apod/userapod/UserApod";

export default class UserApodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apodData: '',
            apodId: '',
            refreshing: false
        };
    }

    componentDidMount() {
        this.getRandomApod();
    }

    getRandomApod() {
        firebase.app.database().ref(`userApods/`).on('value', (snapshot) => {
            var items = snapshot.val();
            var keyNames = Object.keys(items);
            var id = keyNames[Math.floor(Math.random()*keyNames.length)];
            var item = items[id];
            this.setState({
                apodData: item,
                apodId: id
            });
            console.debug(id);
        });
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.getRandomApod();
        this.setState({refreshing: false});
    };

    render() {
        if (this.state.apodData === '') {
            return <ActivityIndicator size="large" color="#2980b6" style={styles.loadingCircle} />
        }else {
            return (
                <ScrollView style={styles.container} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>
                    <UserApod id={this.state.apodId}
                              title={this.state.apodData.title}
                              date={this.state.apodData.date}
                              url={this.state.apodData.url}
                              description={this.state.apodData.explanation}
                              likes={this.state.apodData.likes}
                              author={this.state.apodData.author}/>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2c3e50"
    },
    loadingCircle: {
        flex: 1,
        backgroundColor: "#2c3e50"
    }
});