import React from 'react';
import SubjectVideoItem from './SubjectVideoItem';
const SubjectVideoList = (props) => {
  const videoItems = props.videos.map(video => (
    <SubjectVideoItem key={video.id} video={video}/>
  ));
  return <div className="ui relaxed divided list">{videoItems}</div>;
};

export default SubjectVideoList;
