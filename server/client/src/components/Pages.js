import React from 'react';
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import SubjectVideo from './subjects/SubjectVideo';
import SubjectList from './subjects/SubjectList';
import VideoComments from './VideoComments';
import ChannelComments from './ChannelComments';
import UserData from './UserData';
import Home from './Home';
import Header from './Header';
import Video from './videos/Video';
import Channel from './channels/Channel';
import requireAuth from './requireAuth';
const Pages = ({ match }) => {
    return (
      <div className="Pages">
        <Header />
        <div className="ui main container vertical-margins-30">
          <Route path={match.path} component={Home} exact />
          <Route path={`${match.path}search`} component={SearchPage} exact />
          <Route path={`${match.path}search/videos`} component={Video} />
          <Route path={`${match.path}search/channels`} component={Channel} />
          <Route path={`${match.path}channels`} component={SubjectList} exact />
          <Route
            path={`${match.path}channels/:id`}
            component={ChannelComments}
          />
          <Route
            path={`${match.path}videos/:id`}
            component={SubjectVideo}
            exact
          />
          <Route
            path={`${match.path}videos/comments/:id`}
            component={VideoComments}
          />
          <Route path={`${match.path}user_analysis`} component={UserData} />
        </div>
      </div>
    );
}

export default requireAuth(Pages);
