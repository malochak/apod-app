import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView } from 'react-native';
import { firebase } from '../components/logon/authentication_logic';


export default class TopApodScreen extends Component {

 
  readUserData() {
    firebase.database().ref(`users/favourites/${userId}`).on('value', snapshot => {

      this.setState({
        favourites: snapshot.val()
      })
    });
  }
 

  render() {
   
    /*var keyNames = null;
    let favour = [];
    let fullList;

    keyNames = Object.keys(this.state.favourites);

    if(keyNames !== null){
          keyNames.forEach(e=>{
            favour.push(
              <div> <img src={this.state.favourites[e]}  alt=""
              /> </div>
            )
          })

          fullList = keyNames.map(e => (
              <div className="col-md-3 my-3" key={e} style={{display:'inline-block'}}>
                <img className='media-object' id="favourites"
                 src={this.state.favourites[e]}
                alt="" style={{width:'75%', border:'1px solid white'}} />
              </div>
            ))
    }*/
    return (
     
      <ScrollView style={styles.container} >
     
        <View title = {this.state.favourites.apodData.title}>
            
            </View>
      </ScrollView>
        
     
    );
  }
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      height: 250
    }

})
