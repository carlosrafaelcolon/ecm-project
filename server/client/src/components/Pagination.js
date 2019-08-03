import React from 'react';

class Pagination extends React.Component {
  state = { disablePrev: true, disableNext: false, page: 0 };

  onPreviousPageClick = () => {
    this.props.onPageClick(this.props.currentPage - 1);
  }
  onNextPageClick = () => {
    this.props.onPageClick(this.props.currentPage + 1);
  }
  isDisabled() {
    return this.props.currentPage === 0 ? true : false
  }
  render() {
    return (
      <div className="ui large buttons">
        <button className="ui button" disabled={this.isDisabled()} onClick={this.onPreviousPageClick}>Previous</button>
        <div className="or" />
        <button className="ui button"  disabled={false} onClick={this.onNextPageClick}>Next</button>
      </div>
    );
  }
}

export default Pagination;
