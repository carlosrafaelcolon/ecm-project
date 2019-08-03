import React from 'react';
import { connect } from 'react-redux';

import StreamList from './StreamList';

class LiveStream extends React.Component {
  displayMessage() {
    if (this.props.error) {
      return (
        <div className="ui error message">
          <div className="header">{this.props.error.message}</div>
        </div>
      );
    }
    return (
      <div className="ui blue message">
        <div className="header">
          There are no upcoming/active broadcasts at this time. Please check
          back in later.
        </div>
      </div>
    );
  }
  render() {
    if (this.props.videos.length > 0) {
      return (
        <div>
          <h2 className="header">Scheduled Live Streams</h2>
          <div className="ui divider" />
          <StreamList videos={this.props.videos} />
        </div>
      );
    }
    return (
      <div>
        <h2 className="header">Scheduled Live Streams</h2>
        <div className="ui divider" />
        {this.displayMessage()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  let errorMessage;
  if (state.streamsError) {
    errorMessage = state.streamsError.error;
  } else {
    errorMessage = null;
  }
  return { videos: state.streams, error: errorMessage };
};
export default connect(mapStateToProps)(LiveStream);
