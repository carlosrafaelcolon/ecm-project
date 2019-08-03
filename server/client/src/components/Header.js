import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';

class Header extends React.Component {
  onSignOut = () => {
    this.props.logout();
  };
  displayName() {
    if (this.props.user) {
      if ('name' in this.props.user) {
        return <span className="item">{this.props.user.name}</span>;
      }
    }
  }
  render() {
    return (
      <div className="main-nav ui  menu" style={{ borderRadius: 0 }}>
        <div className="ui container">
          {this.displayName()}
          <div className="right menu">
            <Link to="/" className="item">
              Home
            </Link>
            <Link to="/search" className="item">
              Search
            </Link>
            <Link to="/channels" className="item">
              Channels
            </Link>
            <div className="item">
              <button className="ui medium  button" disabled>
                Export to CSV
              </button>
            </div>
            <div className="item">
              <div className="ui medium youtube button" onClick={this.onSignOut}>
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { auth } = state;
  return { user: auth.info };
};
export default connect(
  mapStateToProps,
  { logout }
)(Header);
