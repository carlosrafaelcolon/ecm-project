import './List.css';
import React from 'react';
import { connect } from 'react-redux';
import ChannelCard from './ChannelCard';
const ChannelList = props => {
  const channelItems = props.channels.map((channel) => (
    <ChannelCard key={channel.id.channelId} channel={channel} />
  ));
  if (!props.channels.length > 0) {
    return(
      <div ></div>
    )
  }
  return <div className="channel-list">{channelItems}</div>;
};
const mapStateToProps = state => {
  return { channels: state.searchResults };
};
export default connect(mapStateToProps)(ChannelList);
