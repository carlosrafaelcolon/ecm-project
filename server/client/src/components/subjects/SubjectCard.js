import './List.css';
import React from 'react';
import { Link } from 'react-router-dom';

class subjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false, spans: 0 };
    this.divRef = React.createRef();
    this.imgRef = React.createRef();
  }
  componentDidMount() {
    this.imgRef.current.addEventListener('load', this.setSpans);
  }
  setSpans = () => {
    const height = this.divRef.current.clientHeight;
    const spans = Math.ceil(height / 10);
    this.setState({ spans });
  };
  render() {
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <div className="subject-card ui fluid card" ref={this.divRef}>
          <Link
            className="ui top attached blue button"
            tabIndex="0"
            to={`/videos/${this.props.subject._id}`}
          >
            <i className="video icon" />
            Videos
          </Link>
          <div className="image">
            <img
              ref={this.imgRef}
              src={this.props.subject.image_path}
              alt={this.props.subject.name}
            />
          </div>
          <div className="content">
            <div className="header">{this.props.subject.name}</div>
            <div className="meta">
              <span className="date">
                Creation Date:{' '}
                {new Date(this.props.subject.creation_date).toDateString()}
              </span>
            </div>
            <div className="ui list">
              <div className="item">
                <i className="comments outline icon" />
                Comments: <strong>{this.props.subject.commentCount}</strong>
              </div>
              <div className="item">
                <i className="file video outline icon" />
                Videos: <strong>{this.props.subject.videoCount}</strong>
              </div>
            </div>
            <button className="ui button" disabled={true}>Update Channel</button>
          </div>
          <Link
            className="ui bottom attached red button"
            to={`/channels/${this.props.subject._id}`}
            tabIndex="0"
          >
            <i className="comment icon" />
            Comments
          </Link>
        </div>
      </div>
    );
  }
}

export default subjectCard;
