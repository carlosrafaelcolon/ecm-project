import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import { onContentSelect, searchTermSubmit } from '../../actions';

class Video extends React.Component {
  componentDidMount() {
    this.props.searchTermSubmit('artificial intelligence', 'video')
  }
  componentDidUpdate() {
    if(!this.props.selectedContent) {
      this.props.onContentSelect(this.props.videos[0])
    }
  }
  render() {
    return(
      <div>
         <button className="ui red button" onClick={() => this.props.history.goBack()}>
            Go Back
          </button>
        <SearchBar type="video" />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail /> 
            </div>
            <div className="five wide column">
              <VideoList/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {videos: state.searchResults, selectedContent: state.selectedContent}
}
export default connect(mapStateToProps, {searchTermSubmit, onContentSelect})(Video);