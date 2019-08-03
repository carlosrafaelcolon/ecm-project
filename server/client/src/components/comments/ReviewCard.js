import React from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { fetchUserData } from '../../actions';

class ReviewCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = { toUserData: false, spans: 0 }
    this.divRef = React.createRef()
  }
  componentDidMount() {
    const height = this.divRef.current.clientHeight;
    const spans = Math.ceil((height / 10))
    this.setState({spans})
  }
  setSpans = () => {
    const height = this.divRef.clientHeight;
    const spans = Math.ceil((height / 10))
    this.setState({spans})
  }
  onUserClick = authorChannelId => {
    this.props.fetchUserData(authorChannelId);
    this.props.history.push("/user_analysis")
  };
  render() {
    const videoSrc = `https://www.youtube.com/watch?v=${
      this.props.children.props.comment.videoId
    }`;
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}`}}>
        <div className="review-card ui fluid card" ref={this.divRef}>
          <div className="content">{this.props.children}</div>
          <div className="extra content">
            <div className="ui one centered buttons">
              <div
                className="ui basic green button"
                onClick={() =>
                  this.onUserClick(this.props.children.props.comment.authorChannelId.value)
                }
              >
                User Analysis
              </div>
              <a className="ui basic red button" href={videoSrc} target="_blank" rel="noopener noreferrer">View Video <i className="right chevron icon" /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {fetchUserData}
)(withRouter(ReviewCard));