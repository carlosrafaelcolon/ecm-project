import React from 'react';
import { connect } from 'react-redux';

class UserData extends React.Component {

  renderedComments() {
    if (this.props.user) {
      return this.props.user.entries.map(entry => (

        <div className="comment" key={entry._id}>
          <div className="content">
            <div className="metadata">
              <span className="date">
                {new Date(entry.publishedAt).toDateString()}
              </span>
            </div>
            <div className="metadata">
          <span>
            <i className="id badge icon" />
            {entry.id}
          </span>
        </div>
            <div className="text">
              <span
                dangerouslySetInnerHTML={{
                  __html: entry.textDisplay
                }}
              />
            </div>
          </div>
        </div>
      ));
    }
  }
  render() {
    if (this.props.user) {
      return (
        <div>
          <button className="ui red button" onClick={() => this.props.history.goBack()}>
            Go Back
          </button>
          <h2 className="header">
            Information associated with the following authorChannelId:{' '}
            <span className="blue">{this.props.user.summary[0]._id}</span>
          </h2>
          {this.props.user.summary[0].profileImages.map((img, i) => (
            <div className="card" key={i}>
              <div className="image">
                <img src={img} alt="avatar"/>
              </div>
            </div>
          ))}
          <h3 className="sub header">
            Display names: {this.props.user.summary[0].displayNames.join(', ')}
          </h3>
          <p>Visit user's <a href={this.props.user.summary[0].site} target="_blank" rel="noopener noreferrer">YouTube Channel</a></p>
          <div className="ui inverted segment">
            <div className="ui red inverted huge statistic">
              <div className="value">
                {this.props.user.summary[0].channels.length}
              </div>
              <div className="label">Channels</div>
            </div>
            <div className="ui green inverted huge statistic">
              <div className="value">
                {this.props.user.summary[0].videoCount}
              </div>
              <div className="label">Videos</div>
            </div>
            <div className="ui teal inverted huge statistic">
              <div className="value">
                {this.props.user.summary[0].numOfComments}
              </div>
              <div className="label">Comments</div>
            </div>

            <div className="ui yellow inverted huge statistic">
              <div className="value">
                {this.props.user.summary[0].displayNames.length}
              </div>
              <div className="label">Display Names</div>
            </div>
            <div className="ui olive inverted huge statistic">
              <div className="value">
                {this.props.user.summary[0].profileImages.length}
              </div>
              <div className="label">Profile Images</div>
            </div>
          </div>
          <div className="ui centered grid">
            <div className="seven wide column">
              <div className="ui relaxed divided list">
                <div className="description">
                  User appears in{' '}
                  <strong>
                    <b>{this.props.user.summary[0].channels.length}</b>
                  </strong>{' '}
                  channel(s).
                </div>
                {this.props.user.summary[0].channels.map((channel, i) => (
                  <div className="item" key={i}>
                    {/* <img className="ui avatar image" src="/images/avatar2/small/rachel.png" /> */}
                    <div className="content">
                      <div className="header">
                      <img className="ui avatar image" alt="channel thumbnail" src={channel.image_path} />
                      <span>{channel.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="seven wide column">
              <div className="ui relaxed divided list">
                <div className="description">
                  User appears in{' '}
                  <strong>
                    <b>{this.props.user.summary[0].videoCount}</b>
                  </strong>{' '}
                  video(s). Samples below:
                </div>
                {this.props.user.summary[0].videos.map((video, i) => (
                  <div className="item" key={i}>
                    <div className="content">
                      <div className="header">
                      <img className="ui avatar image" alt="video thumbnail" src={video.snippet.thumbnails.default.url} />
                      <span>{video.snippet.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="ui centered grid">
            <div className="fourteen wide column">
              <div className="ui comments">
                <h3 className="ui dividing header">Recent Comments</h3>
                {this.renderedComments()}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return  (
      <div className="ui icon message">
          <i className="notched circle loading icon" />
          <div className="content">
            <div className="header">Just one second</div>
            <p>We're loading user's data.</p>
          </div>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(mapStateToProps)(UserData);
