import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import axios from 'axios';
import { firebase } from '../components/logon/authentication_logic';
import Apod from '../components/apod/Apod.js'

export default class UserApodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apodData: '',
            date: 'today',
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
            var item = items[keyNames[Math.floor(Math.random()*keyNames.length)]];
            this.setState({
                apodData: item
            });
        });
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.getRandomApod();
        this.setState({refreshing: false});
    };

    render() {
        return (
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
            }>
                <Text style={{marginTop: 100}}>{this.state.apodData.author}</Text>
            </ScrollView>
        )
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