import React from 'react';
import axios from 'axios';
import {yt_route} from '../../apis/backend';
import SubjectVideoList from './SubjectVideoList';
import Pagination from '../Pagination';
class SubjectVideo extends React.Component {
  signal = axios.CancelToken.source();
  state = { entries: null, currentPage: 0, loading: true };

  componentDidMount() {
    this.loadData();
  }
  onPageClick = async pageUpdate => {
    await this.setState({ currentPage: pageUpdate, loading: true });
    this.loadData(this.state.currentPage);
  };
  componentWillUnmount() {
    this.signal.cancel('Api request for videos is being canceled');
  }
  loadData = async (page = 0) => {
    const {
      match: { params }
    } = this.props;
    let filters = {
      channelId: params.id
    };

    const { data } = await yt_route.post(
      '/videos',
      {
        filters,
        page
      },
      {
        cancelToken: this.signal.token
      }
    );
    this.setState({
      entries: data,
          loading: false
    });
  };
  render() {
    if (!this.state.loading) {
      return (
        <div>
          <button className="ui red button" onClick={() => this.props.history.goBack()}>
            Go Back
          </button>
          <h2 className="header">
            Displaying {this.state.entries.length} Comments
          </h2>
          <h2 className="sub header">Page: {this.state.currentPage + 1}</h2>
          <SubjectVideoList videos={this.state.entries} />
          <Pagination
            currentPage={this.state.currentPage}
            onPageClick={this.onPageClick}
          />
        </div>
      );
    }
    return (
      <div className="ui icon message">
        <i className="notched circle loading icon" />
        <div className="content">
          <div className="header">Just one second</div>
          <p>We're fetching those videos for you.</p>
        </div>
      </div>
    );
  }
}

export default SubjectVideo;
