import React from 'react';
import { Link } from 'react-router-dom';
const SearchPage = () => {
  return (
    <div>
      <div className="ui three column grid">
        <div className="column">
          <Link to="/search/channels" className="ui centered card">
            <div className="image" style={{ textAlign: 'center' }}>
              <i className="massive youtube icon" />
            </div>
            <div className="content">
              <div className="header">YouTube Channels</div>
            </div>
          </Link>
        </div>
        <div className="column">
          <Link to="/search/videos" className="ui centered card">
            <div className="image" style={{ textAlign: 'center' }}>
              <i className="massive youtube square icon" />
            </div>
            <div className="content">
              <div className="header">YouTube Videos</div>
            </div>
          </Link>
        </div>
        <div className="column">
          <div className="ui centered card">
            <div className="image" style={{ textAlign: 'center' }}>
              <i className="massive twitter icon" />
            </div>
            <div className="content">
              <div className="header">Tweets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
