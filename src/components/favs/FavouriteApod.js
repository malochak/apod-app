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
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 4,
        borderWidth: 3,
        flex:0.3,
        borderColor: '#92CBC5',
    },
    grid: {
        marginTop: 12,
        marginBottom: 12,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',

    },
    title: {
        color: "#fff",
        fontSize: 15,
        flex:0.7
    }
})
