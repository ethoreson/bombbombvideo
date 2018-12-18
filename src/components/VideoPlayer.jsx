import React from 'react'
import ReactDOM from 'react-dom'
import YouTube from 'react-youtube';
import TimeHelper from '../helpers/TimeHelper';
import StaticYoutube from './StaticYoutube';
import '../styles/player.css';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.playClicked = this.playClicked.bind(this)
    this.pauseClicked = this.pauseClicked.bind(this)
    this.stateChanged = this.stateChanged.bind(this)
    this.playbackQualityChanged = this.playbackQualityChanged.bind(this)
    this.rateChanged = this.rateChanged.bind(this)
    this.settingsChanged = this.settingsChanged.bind(this)
    this.state = {sourceFeed: []}
  }

  componentDidMount() {
    var self = this;
    var youtube = require('youtube-random-video');
    youtube.getRandomVid('AIzaSyALQDoCiusD0Poqe2mDgGo78zoQy31U2N0', function(err, data) {
      var videoId = data.id.videoId;
      self.setState({videoSource: videoId, youtubeData: data});
      return;
    })
  }

  playClicked(event) {
    var currentVidTime = Math.round(event.target.getCurrentTime());
    var formattedVidTime = TimeHelper.getVideoTime(currentVidTime);
    var statusFeed = this.state.sourceFeed;
    if (event.target.getCurrentTime() < this.state.lastRecordedTime) {
      var rewoundInSecs = 'Rewound ' + Math.round(this.state.lastRecordedTime - event.target.getCurrentTime()) + '  seconds';
      statusFeed.push({time: formattedVidTime, message: rewoundInSecs})
      this.setState({sourceFeed: statusFeed, lastRecordedTime: event.target.getCurrentTime()})
      return;
    }
    if (statusFeed.length && statusFeed[statusFeed.length - 1].message.includes('Rewound')) {
      return;
    }
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
    if (this.state.lastRecordedTime && this.state.lastRecordedTime > currentVidTime) {
      var rewoundInSecs = 'Rewound ' + Math.round(this.state.lastRecordedTime - currentVidTime) + '  seconds';
      statusFeed.push({time: formattedVidTime, message: rewoundInSecs})
      this.setState({sourceFeed: statusFeed, lastRecordedTime: event.target.getCurrentTime()})
      return;
    }
    statusFeed.push({time: formattedVidTime, message: 'Pause Pressed'})
    var d = new Date();
    var t = d.getTime();
    this.setState({sourceFeed: statusFeed, pausedAt: t, lastRecordedTime: event.target.getCurrentTime()})

  }

  stateChanged(event) {
    var videoStatus = "";
    if (event.data == 0) {
      videoStatus += "Completed"
      var currentVidTime = Math.round(event.target.getCurrentTime());
      var formattedVidTime = TimeHelper.getVideoTime(currentVidTime);
      var statusFeed = this.state.sourceFeed;
      statusFeed.push({time: formattedVidTime, message: 'Video Finished'})
      this.setState({sourceFeed: statusFeed})
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


  playbackQualityChanged(event) {
    this.settingsChanged('quality', event);
  }

  rateChanged(event) {
    this.settingsChanged('rate', event);
  }

  settingsChanged(command, event) {
    var currentVidTime = Math.round(event.target.getCurrentTime());
    var formattedVidTime = TimeHelper.getVideoTime(currentVidTime);
    if (formattedVidTime == '0:00' && command == 'quality') {
      return;
    }
    var statusFeed = this.state.sourceFeed;
    let playbackMessage;
    if (command == "quality") {
      playbackMessage = 'Video Quality now at ' + event.target.getPlaybackQuality();
    } else if (command == "rate") {
      playbackMessage = 'Playback Rate now at ' + event.target.getPlaybackRate();
    }
    statusFeed.push({time: formattedVidTime, message: playbackMessage})
    this.setState({sourceFeed: statusFeed});
  }

  render() {
    var src = this.state.videoSource ? this.state.videoSource : "";

    var opts = {
      height: '468',
      width: '768',
      plyaerVars: {
        autoplay: 0
      }
    };

    var staticYoutube = this.state.youtubeData ? <div><StaticYoutube data={this.state.youtubeData} status={this.state.videoStatus} /></div> : null;


    var statusFeed = this.state.sourceFeed.map(function(update, index) {
      return <div key={index} className="feedLine"><div className="timeDiv">{update.time}</div> <div className="messageDiv">{update.message}</div></div>
    });

    return (
      <div className="videoPlayerView">
        <div className="videoContent">
          <div className="youtube">
            <YouTube
              videoId={src}
              opts={opts}
              className="videoPlayer"
              onPlay={this.playClicked}
              onPause={this.pauseClicked}
              onStateChange={this.stateChanged}
              onPlaybackQualityChange={this.playbackQualityChanged}
              onPlaybackRateChange={this.rateChanged}
            />
          </div>
          <div className="statusFeed">
            <h4 className="feedTitle">ACTIVITY FEED</h4>
            {statusFeed}
          </div>
        </div>
          {staticYoutube}
      </div>
    );
  }
}
