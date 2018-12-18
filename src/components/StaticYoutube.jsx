import React from 'react'
import ReactDOM from 'react-dom'
import '../styles/dataBoxes'

export default class StaticYoutube extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

  var borderFormat = this.props.status;

    return (
      <div className="videoFacts" id={borderFormat}>
        <div className="statsCols">
          <div className="colName">
            <div className="row">Title: {this.props.data.snippet.title}</div>
            <div className="row">Description: {this.props.data.snippet.description}</div>
          </div>
          <div className="colName">
            <div className="row">Video Status: {this.props.status}</div>
            <div className="row">Published on: {this.props.data.snippet.publishedAt}</div>
            <div className="row">From Channel: {this.props.data.snippet.channelTitle}</div>
          </div>
        </div>
      </div>
    )
  }
}
