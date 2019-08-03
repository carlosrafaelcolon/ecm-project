import React from 'react';
import { connect } from 'react-redux';
import VideoItem from './VideoItem';
const VideoList = (props) => {
  const videoItems = props.videos.map(video => (
    <VideoItem key={video.id.videoId} video={video}/>
  ));

  return <div className="ui relaxed divided list">{videoItems}</div>;
};
const mapStateToProps = (state) => {
  return { videos: state.searchResults }
}
export default connect(mapStateToProps)(VideoList);
