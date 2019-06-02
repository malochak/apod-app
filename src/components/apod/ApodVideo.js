import React, {Component} from 'react';
import {
  WebView
} from 'react-native';

export default class ApodPic extends Component {
  render() {
    var ytUrl = this.props.url;
    if (ytUrl.startsWith("//")) {
      ytUrl = "https:" + ytUrl;
    }
    return (
        <WebView
          javaScriptEnabled={true}
          source={{ uri: ytUrl  }}
          style={{
               height: 250
          }}
        />
    );
  }
}
