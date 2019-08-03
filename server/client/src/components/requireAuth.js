import React, {Component} from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }
    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push("/login")
      } 
    }
    render() {
      return <ChildComponent  {...this.props}/>
    }
  }
  const mapStateToProps = (state) => {
    const { auth } = state
    return { auth: auth.auth_token }

  }
  return connect(mapStateToProps)(ComposedComponent);
}