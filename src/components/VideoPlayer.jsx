import React from 'react'
import ReactDOM from 'react-dom'

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    var self = this;
    var youtube = require('youtube-random-video');
    youtube.getRandomVid('AIzaSyALQDoCiusD0Poqe2mDgGo78zoQy31U2N0', function(err, data) {
      console.log('DATA ID:', data.id.videoId);
      var src = "https://www.youtube.com/embed/" + data.id.videoId + "?autoplay=0&rel=0&modestbranding=1"
      self.setState({videoSource: src});
      return;
    })
    //"https://www.youtube.com/embed/5OeR5XBEahU?autoplay=0&rel=0&modestbranding=1"

  }

  render() {
    var src = this.state.videoSource;
    return (
      <div className="videoPlayerView">
        <h1>Vid</h1>
        <iframe className="player" type="text/html" src={src} frameBorder="0"></iframe>
      </div>
    );
  }
}
