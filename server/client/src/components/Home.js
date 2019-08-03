import React from 'react';
import { Link } from 'react-router-dom';
import TopUsers from './top_users/TopUsers';
import LiveStream from './livestreams/LiveStream';
// import requireAuth from './requireAuth';
const Home = () => {
  
  return (
    <div>
      <LiveStream />
      <div className="ui placeholder segment">
        <div className="ui two column stackable center aligned grid">
          <div className="ui vertical divider">Or</div>
          <div className="middle aligned row">
            <div className="column">
              <div className="ui icon header">
                <i className="search icon" />
                Add More Case Studies
              </div>
              <Link to="/search" className="ui primary button">
                Search
              </Link>
            </div>
            <div className="column">
              <div className="ui icon header">
                <i className="unlock alternate icon" />
                View Current Case Studies
              </div>
              <Link to="/channels" className="ui primary button">Case Studies</Link>
            </div>
          </div>
        </div>
      </div>
      <TopUsers />
    </div>
  );
};

export default Home;
