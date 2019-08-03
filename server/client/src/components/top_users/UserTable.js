import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserData } from '../../actions';
class UserTable extends React.Component {
  displayText(str) {
    if(str.length > 20) {
      return str.slice(0, 17) + '...'
    }
    return str
  }
  renderTable() {
    if (this.props.table === 'most_comments') {
      return (
        <div className="ten wide column">
          <table className="ui very compact collapsing celled table" style={{marginTop: '10px'}}>
            <thead>
              <tr>
                <th>Super-Users</th>
                <th>Comments</th>
                <th>Videos</th>
                <th>Channels</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.entries.map(entry => {
                return (
                  <tr key={entry.authorChannelId}>
                    <td>
                      <h4 className="ui image header">
                        <img
                          src={entry.profileImage}
                          alt="avatar"
                          className="ui mini rounded image"
                        />
                        <div className="content">
                          {this.displayText(entry.displayName)}
                          {/* <div className="sub header">
                            {entry.authorChannelId}
                          </div> */}
                        </div>
                      </h4>
                    </td>
                    <td>{entry.comments}</td>
                    <td>{entry.videos}</td>
                    <td>{entry.channels}</td>
                    <td>
                      <button
                        className="ui primary button"
                        onClick={() => this.onUserClick(entry.authorChannelId)}
                      >
                        User Analysis
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="five wide column">
          <table className="ui very compact collapsing celled table" style={{marginTop: '10px'}}>
            <thead>
              <tr>
                <th>Most Crossovers</th>
                <th>Channels</th>
                <th>Comments</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.entries.map(entry => {
                return (
                  <tr key={entry.authorChannelId}>
                    <td>
                      <h4 className="ui image header">
                        <img
                          src={entry.profileImage}
                          alt="avatar"
                          className="ui mini rounded image"
                        />
                        <div className="content">
                          {this.displayText(entry.displayName)}
                        </div>
                      </h4>
                    </td>
                    <td>{entry.channels}</td>
                    <td>{entry.comments}</td>
                    <td>
                      <button
                        className="ui primary button"
                        onClick={() => this.onUserClick(entry.authorChannelId)}
                      >
                        User Analysis
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
  onUserClick = authorChannelId => {
    this.props.fetchUserData(authorChannelId);
    this.props.history.push("/user_analysis")
  };
  render() {
    if (Array.isArray(this.props.entries) && this.props.entries.length > 0) {
      return <div>{this.renderTable()}</div>;
    } else {
      return <div className="ui active centered inline loader" />;
    }
  }
}

export default connect(
  null,
  { fetchUserData }
)(withRouter(UserTable));
