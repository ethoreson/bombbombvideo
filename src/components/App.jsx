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
        <div className="headerView">
          <div className='titles'>
            <h1>BombBomb Random Video</h1>
            <h4>A technical takehome for Emilie</h4>
          </div>
          <div className="reloadButton">
            <button className="reloadButton" onClick={this.onRefresh}>Do It Again</button>
          </div>
        </div>
        <div>
        <VideoPlayer />
        </div>
      </div>
    );
  }
}
