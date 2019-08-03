import React from 'react';
import { connect } from 'react-redux';
import { searchTermSubmit } from '../actions';
class SearchBar extends React.Component {
  state = { term: '' };
  onFormSubmit = event => {
    event.preventDefault();
    this.props.searchTermSubmit(this.state.term, this.props.type);
  };
  render() {

    return (
      <div className="search-bar ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>{this.props.type.toUpperCase()} Search</label>
            <div className="ui icon input">
              <input
                type="text"
                value={this.state.term}
                onChange={e => this.setState({ term: e.target.value })}
              />
              <i className="inverted circular search link icon" onClick={this.onFormSubmit}/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { searchTermSubmit }
)(SearchBar);
