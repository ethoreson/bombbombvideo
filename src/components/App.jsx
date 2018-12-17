import React from "react"
import ReactDOM from 'react-dom'
import VideoPlayer from './VideoPlayer'
import '../styles/app.css'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    window.location.reload();
  }

  render() {

    return (
      <div className="app">
        <h1>BombBomb Random Video</h1>
        <h4>A technical takehome for Emilie</h4>
        <VideoPlayer />
        <button className="reloadButton" onClick={this.onRefresh}>Do It Again</button>
      </div>
    );
  }
}
