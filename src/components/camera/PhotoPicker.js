import React, { Component } from 'react';
import CameraRollPicker from 'react-native-camera-roll-picker';

export default class PhotoPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

passPhotoToAddApodScreen = (photo) => {
    this.props.navigation.state.params.putPhoto(photo[0]);
}

  render() {
    return (
      <CameraRollPicker callback={this.passPhotoToAddApodScreen} maximum={1} selectSingleItem={true} backgroundColor={'#2c3e50'}/>
    );
  }
}
