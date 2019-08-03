import React from 'react';
import {connect} from 'react-redux';
import { updateSearchTerm } from '../actions';
class CommentSearchBar extends React.Component {

  onFormSubmit = event => {
    event.preventDefault();
    this.props.searchTermSubmit();
  };
  render() {

    return (
      <div className="search-bar ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label> Search</label>
            <div className="ui icon input">
              <input
                type="text"
                value={this.props.term}
                onChange={e => this.props.updateSearchTerm(e.target.value)}
              />
              <i className="inverted circular search link icon" onClick={this.onFormSubmit}/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { term: state.searchTerm }
}
export default connect(mapStateToProps, {updateSearchTerm})(CommentSearchBar);
