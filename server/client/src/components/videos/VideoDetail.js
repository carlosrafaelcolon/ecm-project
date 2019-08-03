import React from 'react';
import { connect } from 'react-redux';
class VideoDetail extends React.Component {
  render() {
    if (!this.props.video) {
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
    const videoSrc = `https://www.youtube.com/embed/${
      this.props.video.id.videoId
    }`;
    return (
      <div>
        <div className="ui embed">
          <iframe title="Video Player" src={videoSrc} />
        </div>
        <div className="ui segment">
          <h4 className="ui header">
            <span
              dangerouslySetInnerHTML={{
                __html: this.props.video.snippet.title
              }}
            />
          </h4>
          <p>{this.props.video.snippet.description}</p>
          <button className="ui right  button " disabled={true}>
              Extract Comments
            </button>
          {/* <h4>Video Id</h4>
          <div className="ui action input">
            <input value={this.props.video.id.videoId} type="text" readOnly />
            <button className="ui teal right labeled icon button">
              <i className="copy icon" />
              Copy
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { video: state.selectedContent };
};
export default connect(mapStateToProps)(VideoDetail);
