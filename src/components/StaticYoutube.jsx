import React from 'react'
import ReactDOM from 'react-dom'
import '../styles/dataBoxes'

export default class StaticYoutube extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="dataView staticYoutube">
        <div className="vidStats">
          <div>Title: {this.props.data.snippet.title}</div>
          <div>Video Status: {this.props.status}</div>
          <div>Description: {this.props.data.snippet.description}</div>
          <div>Published on: {this.props.data.snippet.publishedAt}</div>
          <div>From Channel: {this.props.data.snippet.channelTitle}</div>
        </div>
      </div>
    )
  }
}
