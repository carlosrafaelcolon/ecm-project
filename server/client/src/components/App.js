import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import Login from './Login';
import { checkAuthStatus, fetchSubjectsAndStreams } from '../actions';
import Pages from './Pages';
class App extends React.Component {
  constructor(props) {
    super(props)
    props.checkAuthStatus()
  }
  componentDidMount() {
    this.props.fetchSubjectsAndStreams();
    const one_hour = (1000 * 60 * 60)
    setInterval(() => this.props.fetchSubjectsAndStreams(), (one_hour * 6));
    
  }
  render() {
    
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={Pages} path="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, {checkAuthStatus, fetchSubjectsAndStreams})(App);
