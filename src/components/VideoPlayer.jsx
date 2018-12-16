import React from 'react'
import ReactDOM from 'react-dom'
import YouTube from 'react-youtube';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.playClicked = this.playClicked.bind(this)
    this.pauseClicked = this.pauseClicked.bind(this)
    this.videoFinished = this.videoFinished.bind(this)
    this.stateChanged = this.stateChanged.bind(this)
    this.state = {}
  }

  componentDidMount() {
    var self = this;
    var youtube = require('youtube-random-video');
    youtube.getRandomVid('AIzaSyALQDoCiusD0Poqe2mDgGo78zoQy31U2N0', function(err, data) {
      console.log('DATA ID:', data.id.videoId);
      var videoId = data.id.videoId;
      self.setState({videoSource: videoId});
      return;
    })
  }

  playClicked() {

  }

  pauseClicked() {

  }

  stateChanged(event) {
    var videoStatus = "";
    if (event.data == 1) {
      videoStatus += "Playing"
    } else if (event.data == 2) {
      videoStatus += "Paused"
    } else if (event.data == 3) {
      videoStatus += "Buffering"
    } else if (event.data == 5) {
      videoStatus += "Loaded"
    } else if (event.data == 0) {
      videoStatus += "Completed"
    }
    this.setState({videoStatus: videoStatus})
  }

  videoFinished() {

  }

  render() {
    var src = this.state.videoSource;
    var currentVideoStatus = this.state.videoStatus ? "Video Status: " + this.state.videoStatus : null;

    var opts = {
      height: '390',
      width: '640',
      plyaerVars: {
        autoplay: 0
      }
    };

    return (
      <div className="videoPlayerView">
        <div className="videoStatus">{currentVideoStatus}</div>
        <YouTube
          videoId={src}
          opts={opts}
          className="videoPlayer"
          onPlay={this.playClicked}
          onPause={this.pauseClicked}
          onEnd={this.videoFinished}
          onStateChange={this.stateChanged}

        />
      </div>
    );
  }
}
