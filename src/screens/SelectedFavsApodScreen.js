import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Button,
    BackHandler,
    View,
    TouchableOpacity,Text
} from 'react-native';
import { firebase } from '../components/logon/authentication_logic';
import Apod from '../components/apod/Apod.js'
import Icon from 'react-native-vector-icons/Ionicons';

export default class SelectedFavsApodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apodData: '',
        };
    }

    componentDidMount() {
        this.getNewApod(this.props.navigation.state.params.apodDate);
        BackHandler.addEventListener('hardwareBackPress', this.goBackToFavs);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBackToFavs);
    }

    goBackToFavs = () => {
        this.props.navigation.navigate('Favourites');
        return true;
    };

    getNewApod(date) {
        firebase.app.database().ref(`apods/${date}`).on('value', (snapshot) => {
            this.setState({
                apodData: snapshot.val()
            });
        });
    }

    render() {
        if (this.state.apodData === '') {
            return <ActivityIndicator size="large" color="#841584" style={styles.loadingCircle} />
        } else {
            return (
                <ScrollView style={styles.container}>
                    {/* <View style={styles.button}>
                        <Button title='<  Favourite' style={styles.backButton} onPress={() => this.goBackToFavs()} />
                    </View> */}

                    <TouchableOpacity
                        onPress={() => this.goBackToFavs()}
                        style={styles.btnContainer}
                    >
                        <Icon name='ios-arrow-back' color={"#fff"} size={24} />
                        <Text style={styles.btn}>Back to favourites</Text>
                    </TouchableOpacity>



                    <Apod title={this.state.apodData.title} date={this.state.apodData.date}
                        url={this.state.apodData.url}
                        description={this.state.apodData.explanation}
                        mediaType={this.state.apodData.media_type}
                        likes={this.state.apodData.likes} />
                </ScrollView>
            );
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
    },
    btnContainer:{
        flex:1,
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20
    },
    btn:{

        color:"#fff",
        flex: 1,
        fontSize:20,
        marginLeft:15,
        justifyContent: 'flex-start',
    }
});