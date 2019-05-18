import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    Text
} from 'react-native';
import {firebase} from '../components/logon/authentication_logic';
import Apod from '../components/apod/Apod.js'

export default class SelectedApodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apodData: '',
        };
    }

    componentDidMount() {
        console.debug(this.props.date)
        console.debug(this.props)
        console.debug('elo')
        this.getNewApod(this.props.date);
    }

    getNewApod(date) {
        var apodDate = date;
        if (date === 'today') {
            apodDate = this.createTodaysDate();
        } else if (date === 'random') {
            apodDate = this.getRandomApodDate();
        }
        firebase.app.database().ref(`apods/${apodDate}`).on('value', (snapshot) => {
            this.setState({
                apodData: snapshot.val()
            });
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>elo</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2c3e50"
    }
});