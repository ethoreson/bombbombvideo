import React from "react"
import ReactDOM from 'react-dom'
import VideoPlayer from './VideoPlayer'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    window.location.reload();
  }

  render() {
    var stylings = {
      backgroundColor: '#133337',
      color: 	'#eeeeee'
    }

    return (
      <div className="app" style={stylings}>
        <h1>Hello, World!!</h1>
        <VideoPlayer />
        <button className="reloadButton" onClick={this.onRefresh}>Do It Again</button>
      </div>
    );
  }
}
