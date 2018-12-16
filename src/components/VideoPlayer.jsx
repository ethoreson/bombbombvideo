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
    this.state = {sourceFeed: []}
  }

  componentDidMount() {
    var self = this;
    var youtube = require('youtube-random-video');
    youtube.getRandomVid('AIzaSyALQDoCiusD0Poqe2mDgGo78zoQy31U2N0', function(err, data) {
      var videoId = data.id.videoId;
      self.setState({videoSource: videoId});
      return;
    })
  }

  playClicked(event) {
    var currentTime = Math.round(event.target.getCurrentTime() * 100) / 100;
    var statusFeed = this.state.sourceFeed;
    if (this.state.pausedAt) {
      var d = new Date();
      var t = d.getTime();
      let timeUnit;
      var timePaused = (t - this.state.pausedAt) / 1000
      if (timePaused < 60) {
        timePaused = Math.round(timePaused * 100) / 100;
        timeUnit = " seconds"
      } else if (timePaused > 3600) {
        var hours = Math.floor(timePaused / 3600);
        //var mins = Math.floor(timePaused - hours )
        timeUnit = " hours"
      } else {
        var mins = Math.floor(timePaused / 60);
        var secs = Math.round(timePaused - mins * 60);
        timePaused = mins + ':' + secs;
        timeUnit = " minutes"
      }
      var resumedMessage = 'unpaused after ' + timePaused + timeUnit;
      statusFeed.push({time: currentTime, message: resumedMessage})
    } else {
      statusFeed.push({time: currentTime, message: 'played'})
    }
    this.setState({sourceFeed: statusFeed})
  }

  pauseClicked(event) {
    var currentTime = Math.round(event.target.getCurrentTime() * 100) / 100;
    var statusFeed = this.state.sourceFeed;
    statusFeed.push({time: currentTime, message: 'paused'})
    var d = new Date();
    var t = d.getTime();
    this.setState({sourceFeed: statusFeed, pausedAt: t})

  }

  stateChanged(event) {
    var videoStatus = "";
    if (event.data == 0) {
      videoStatus += "Completed"
    } else if (event.data == 1) {
        videoStatus += "Playing"
    } else if (event.data == 2) {
      videoStatus += "Paused"
    } else if (event.data == 3) {
      videoStatus += "Buffering"
    } else if (event.data == 5) {
      videoStatus += "Loaded"
    }
    this.setState({videoStatus: videoStatus})
  }

  videoFinished() {

  }

  render() {
    var src = this.state.videoSource ? this.state.videoSource : "";
    var currentVideoStatus = this.state.videoStatus ? "Video Status: " + this.state.videoStatus : null;

    var opts = {
      height: '390',
      width: '640',
      plyaerVars: {
        autoplay: 0
      }
    };

    var statusFeed = this.state.sourceFeed.map(function(update, index) {
      return <div key={index}>{update.time} - {update.message}</div>
    });

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
        <div className="statusFeed">
          {statusFeed}
        </div>
      </div>
    );
  }
}
