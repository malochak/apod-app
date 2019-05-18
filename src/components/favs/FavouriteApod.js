import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

export default class FavouriteApod extends Component {
  render() {
    return (
        <View style={styles.container}>


            <View style={styles.grid}>
                <Image
                    style={styles.image}
                    source={{ uri: this.props.url }} />
                <Text style={styles.title}> {this.props.title} </Text>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2c3e50',
    },
    image: {
        height: 80,
        width: 100,
        marginRight: 20,
        flex:0.3,
        marginBottom: 20,
    },
    grid: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 12,
        marginBottom: 12,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#92CBC5'
    },
    title: {
        color: "#fff",
        fontSize: 15,
        flex:0.7
    }
})
