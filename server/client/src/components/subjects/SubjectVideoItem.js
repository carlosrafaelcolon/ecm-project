import React from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { onCommentVideoSelect } from '../../actions';
class SubjectVideoItem extends React.Component {
  displayMessage(str) {
    if (str.length > 400) {
      return str.slice(0, 400) + '...';
    }
    return str;
  }
  onVideoSelected(video) {
    this.props.onCommentVideoSelect(video);
    this.props.history.push(`/videos/comments/${video.contentDetails.videoId}`);
  }
  render() {
    const videoSrc = `https://www.youtube.com/watch?v=${
      this.props.video.contentDetails.videoId
    }`;
    return (
      <div className="stream-item item">

        <div className="image">
          <img
            src={this.props.video.snippet.thumbnails.medium.url}
            alt={this.props.video.snippet.title}
          />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <h2>
              <span
                dangerouslySetInnerHTML={{
                  __html: this.props.video.snippet.title
                }}
              />
            </h2>
          </div>
          <div className="meta">
            <span className="date">
              {new Date(
                this.props.video.contentDetails.videoPublishedAt
              ).toLocaleTimeString()}
            </span>
          </div>
          <div className="description">
            <p>{this.displayMessage(this.props.video.snippet.description)}</p>
          </div>
          <div className="extra">
            <a
              className="ui right floated blue button"
              href={videoSrc}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="video icon" />
              Watch Video
            </a>
            {this.props.video.commentsExtracted ? (
              <button
                className="ui right floated red button"
                onClick={() => this.onVideoSelected(this.props.video)}
              >
                <i className="comment icon" />
                View Comments
              </button>
            ) : (
              <button disabled={true} className="ui right floated button">
                <i className="comment icon" />
                View Comments
              </button>
            )}

            <div className="ui teal label">
              {this.props.video.snippet.channelTitle}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { onCommentVideoSelect }
)(withRouter(SubjectVideoItem));
