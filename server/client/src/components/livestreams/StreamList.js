import React from 'react';
import StreamItem from './StreamItem';
const StreamList = (props) => {
  const streamItems = props.videos.map(video => <StreamItem key={video.id} video={video}/>);
  return <div className="ui items">{streamItems}</div>;
};

export default StreamList;
