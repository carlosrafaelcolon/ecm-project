import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { yt_route } from '../apis/backend';
import { onTermReset } from '../actions';
import CommentList from './comments/CommentList';
import Pagination from './Pagination';
import CommentSearchBar from './CommentSearchBar';
// import requireAuth from './requireAuth';
class ChannelComments extends React.Component {
  state = { entries: null, currentPage: 0, loading: true };

  signal = axios.CancelToken.source();
  componentDidMount() {
    this.loadData();
  }
  onPageClick = async pageUpdate => {
    await this.setState({ currentPage: pageUpdate, loading: true });
    this.loadData(this.state.currentPage, this.props.term);
  };
  displaySubject() {
    if (this.props.subject) {
      return (
        <div
          className="vertical-margins-30"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            className="ui middle aligned avatar small image"
            alt="channel thumbnail"
            src={this.props.subject.image_path}
          />
          <h2 className="header" style={{ marginLeft: '10px' }}>
            {this.props.subject.name}
          </h2>
        </div>
      );
    }
    return;
  }
  componentWillUnmount() {
    this.signal.cancel('Api request for comments is being canceled');
    this.props.onTermReset();
  }
  onSearchTermSubmit = async () => {
    await this.setState({ currentPage: 0 });
    this.loadData(this.state.currentPage, this.props.term);
  };
  loadData = async (page = 0, text = '') => {
    const {
      match: { params }
    } = this.props;
    let filters = {
      channelId: params.id
    };
    if (text) {
      filters = { ...filters, text };
    }
    const { data } = await yt_route.post(
      '/comments',
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
          <button
            className="ui red button"
            onClick={() => this.props.history.goBack()}
          >
            Go Back
          </button>
          {this.displaySubject()}
          <CommentSearchBar searchTermSubmit={this.onSearchTermSubmit} />
          <h2 className="centered header">
            Displaying {this.state.entries.length} Comments
          </h2>
          <h2 className="centered sub header">
            Page: {this.state.currentPage + 1}
          </h2>
          <CommentList comments={this.state.entries} />
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
          <p>We're fetching those comments for you.</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const {
    match: { params }
  } = ownProps;
  const filteredSubjects = state.subjects.filter(
    subject => subject._id === params.id
  );
  let subject;
  if (filteredSubjects.length === 1) {
    subject = filteredSubjects[0];
  } else {
    subject = null;
  }
  return { term: state.searchTerm, subject };
};
export default connect(
  mapStateToProps,
  { onTermReset }
)(ChannelComments);
