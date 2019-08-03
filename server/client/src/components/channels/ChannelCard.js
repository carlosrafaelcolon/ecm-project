import React from 'react';
import { connect } from 'react-redux';
import { postChannelId } from '../../actions';

const cardConfig = {
  clicked: {
    icon: 'check',
    text: 'Request Sent!'
  },
  unClicked: {
    icon: 'add',
    text: 'Add Channel'
  }
};

class ChannelCard extends React.Component {
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
    if (this.divRef.current) {
      const height = this.divRef.current.clientHeight;
      const spans = Math.ceil(height / 10);
      this.setState({ spans });
    }
  };
  renderButton() {
    if (this.state.clicked) {
      return (
        <div
          className="ui bottom attached red button"
          onClick={this.onButtonClick}
        >
          <i className={`${cardConfig.clicked.icon} icon`} />
          {cardConfig.clicked.text}
        </div>
      );
    } else {
      return (
        <div
          className="ui bottom attached red button"
          onClick={this.onButtonClick}
        >
          <i className={`${cardConfig.unClicked.icon} icon`} />
          {cardConfig.unClicked.text}
        </div>
      );
    }
  }
  onButtonClick = () => {
    this.props.postChannelId(this.props.channel.id.channelId);

    this.setState({ clicked: true });
  };

  render() {
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <div className="channel-card ui fluid card" ref={this.divRef}>
          <div className="image">
            <img
              ref={this.imgRef}
              src={this.props.channel.snippet.thumbnails.medium.url}
              alt={this.props.channel.snippet.channelTitle}
            />
          </div>
          <div className="content">
            <div className="header">
              {this.props.channel.snippet.channelTitle}
            </div>
            <div className="meta">
              <span className="date">
                {this.props.channel.snippet.publishedAt
                  ? new Date(
                      this.props.channel.snippet.publishedAt
                    ).toDateString()
                  : ''}
              </span>
            </div>
            <div className="description">
              {this.props.channel.snippet.description}
            </div>
          </div>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { postChannelId }
)(ChannelCard);
