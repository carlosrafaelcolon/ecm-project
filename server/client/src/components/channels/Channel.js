import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../SearchBar';
import ChannelList from './ChannelList';
import { onContentReset } from '../../actions';
class Channel extends React.Component {
  componentDidMount() {
    this.props.onContentReset();
  }
  displayResponse() {
    if (this.props.message) {
      return (
        <div className="ui warning message">
          <i className="exclamation icon" />
          {this.props.message}
        </div>
      );
    }
    return;
  }
  render() {
    return (
      <div>
        <button
          className="ui red button"
          onClick={() => this.props.history.goBack()}
        >
          Go Back
        </button>
        <SearchBar type="channel" />
        <div className="ui info big message">
          <div className="header">
            When adding a channel to the database the:
          </div>
          <ul className="list">
            <li>Selected channel will appear in the channels page.</li>
            <li>All videos are extracted from the channel</li>
            <li>All comments from all those videos are extracted (or at least until points run out)</li>
          </ul>
        </div>
        {this.displayResponse()}
        <ChannelList />
      </div>
    );
  }
}
const mapStateToProps = state => {
  let message
  if(state.selectedChannel) {
    message = state.selectedChannel.message
  } else {
    message = null
  }
  return { message };
};
export default connect(
  mapStateToProps,
  { onContentReset }
)(Channel);
