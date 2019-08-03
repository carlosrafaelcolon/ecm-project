
import React from 'react';
import { connect } from 'react-redux';

const StreamItem = props => {

  const videoSrc = `https://www.youtube.com/watch?v=${
      props.video.id
    }`;
  return (
    <div className="stream-item item">
      <div className="ui small image">
        <img
          src={props.video.snippet.thumbnails.medium.url}
          alt={props.video.snippet.title}
        />
      </div>
      <div className="middle aligned content">
        <div className="header">
          <span
            dangerouslySetInnerHTML={{
              __html: props.video.snippet.title
            }}
          />
        </div>
        <div className="meta">
          <span className="date">
            {props.video.liveStreamingDetails.actualStartTime
              ? new Date(
                  props.video.liveStreamingDetails.actualStartTime
                ).toLocaleTimeString()
              : new Date(props.video.liveStreamingDetails.scheduledStartTime).toLocaleTimeString()}
          </span>
        </div>
        <div className="description">
          <p>{displayMessage(props.video.snippet.description)}</p>
        </div>
        <div className="extra">
          <a className="ui right floated red button" href={videoSrc} target="_blank" rel="noopener noreferrer">
            View Stream
            <i className="right chevron icon" />
          </a>
          <div className="ui teal label">
            {props.video.snippet.channelTitle}
          </div>
          <div className="ui green label">
            {props.video.snippet.liveBroadcastContent}
          </div>
        </div>
      </div>
    </div>
  );
};
function displayMessage(str) {
  if(str.length > 300) {
    return str.slice(0, 300) + '...';
  }
  return str
}
export default connect(
  null,
  {  }
)(StreamItem);
