import React from 'react';
import { yt_route } from '../../apis/backend';
import axios from 'axios';
import UserTable from './UserTable';

class TopUsers extends React.Component {
  state = { most_comments: [], most_channels: [] };
  signal = axios.CancelToken.source();
  componentDidMount() {
    this.loadData('comments');
    this.loadData('channels');
  }
  loadData = async type => {
    const { data } = await yt_route.get('/top_users', {
      params: {
        type
      },
      cancelToken: this.signal.token
    });
    let query;
    if (type === 'comments') {
      query = {
        most_comments: data
      };
    } else {
      query = {
        most_channels: data
      };
    }
    this.setState(query);
  };
  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
  }

  render() {
    return (
      <div className="ui centered grid vertical-margins-30">
        <UserTable table="most_comments" entries={this.state.most_comments} />
        <UserTable table="most_channels" entries={this.state.most_channels} />
      </div>
    );
  }
}

export default TopUsers;
