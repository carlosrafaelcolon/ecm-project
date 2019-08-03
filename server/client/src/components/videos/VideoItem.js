import './VideoItem.css'
import React from 'react';
import { connect } from 'react-redux';
import { onContentSelect } from '../../actions'
const VideoItem = (props) => {
  return (
    <div onClick={() => props.onContentSelect(props.video)} className="video-item item">
      <img
        className="ui image"
        src={props.video.snippet.thumbnails.medium.url}
        alt={props.video.snippet.title}
      />
      <div className="content">
        <div className="header">
          <span
            dangerouslySetInnerHTML={{
              __html: props.video.snippet.title
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(null, {onContentSelect})(VideoItem);
