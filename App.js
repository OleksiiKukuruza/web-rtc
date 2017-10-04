import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {RTCView, RTCPeerConnection, MediaStreamTrack} from 'react-native-webrtc';


var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
var pc = new RTCPeerConnection(configuration);

let isFront = true;
MediaStreamTrack.getSources(sourceInfos => {
  console.log(sourceInfos);
  let videoSourceId;
  for (const i = 0; i < sourceInfos.length; i++) {
    const sourceInfo = sourceInfos[i];
    if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
      videoSourceId = sourceInfo.id;
    }
  }
  getUserMedia({
    audio: true,
    video: {
      mandatory: {
        minWidth: 500, // Provide your own width, height and frame rate here
        minHeight: 300,
        minFrameRate: 30
      },
      facingMode: (isFront ? "user" : "environment"),
      optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
    }
  }, function (stream) {
    console.log('dddd', stream);
    callback(stream);
  }, logError);
});

pc.createOffer((desc) => {
  pc.setLocalDescription(desc, () => {
    // Send pc.localDescription to peer
  }, function(e) {});
}, function(e) {});

pc.onicecandidate = function (event) {
  // send event.candidate to peer
};




export default class App extends Component {
  componentDidMount() {
    this.setState({videoURL: stream.toURL()});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>wow</Text>
        <RTCView streamURL={this.state.videoURL} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
