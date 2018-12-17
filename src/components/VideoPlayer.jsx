import React from 'react'
import ReactDOM from 'react-dom'
import YouTube from 'react-youtube';
import Moment from 'react-moment';
import TimeHelper from '../helpers/TimeHelper';
import '../styles/player.css';

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
    var currentVidTime = Math.round(event.target.getCurrentTime());
    var formattedVidTime = TimeHelper.getVideoTime(currentVidTime);
    var statusFeed = this.state.sourceFeed;
    if (this.state.pausedAt) {
      var pauseDuration = TimeHelper.getPauseDuration(this.state.pausedAt);
      var resumedMessage = 'Unpaused after ' + pauseDuration;
      statusFeed.push({time: formattedVidTime, message: resumedMessage})
    } else {
      statusFeed.push({time: formattedVidTime, message: 'Play Pressed'})
    }
    this.setState({sourceFeed: statusFeed})
  }

  pauseClicked(event) {
    var currentVidTime = Math.round(event.target.getCurrentTime());
    var formattedVidTime = TimeHelper.getVideoTime(currentVidTime);
    var statusFeed = this.state.sourceFeed;
    statusFeed.push({time: formattedVidTime, message: 'Pause Pressed'})
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
      return <div key={index} className="feedLine"><div className="timeDiv">{update.time}</div> <div className="messageDiv">{update.message}</div></div>
    });

    return (
      <div className="videoPlayerView">
        <div className="videoContent">
          <div className="youtube">
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
        <div className="statusFeed">
          <h4 className="feedTitle">ACTIVITY FEED</h4>
          {statusFeed}
        </div>
        </div>
      </div>
    );
  }
}
