import './Login.css';
import React from 'react';
import { compose } from 'redux';
import { reduxForm, Field  } from 'redux-form';
import {connect} from 'react-redux';
import { login } from '../actions'
class LoginForm extends React.Component {
  onSubmit = (formProps) => {
    this.props.login(formProps, () => {
      this.props.history.push('/')
    })
  }
  renderForm() {
    const { handleSubmit } = this.props;
    
    return (
      <form className="ui large form" onSubmit={handleSubmit(this.onSubmit)}>
        <div className="ui stacked segment">
          <div className="field">
            <div className="ui left icon input">
              <i className="user icon" />
              <Field
                name="email"
                type="text"
                placeholder="E-mail address"
                component="input"
                autoComplete="none"
              />
              {/* <input type="text" name="email" placeholder="E-mail address" /> */}
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="lock icon" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="none"
                component="input"
              />
              {/* <input type="password" name="password" placeholder="Password" /> */}
            </div>
          </div>
          <button className="ui fluid large blue submit button">Login</button>
        </div>
      </form>
    );
  }
  renderMessage() {
    const { errorMessage } = this.props;
    if(errorMessage ) {
      return(
        <div className="ui message">
            {errorMessage}
          </div>
      )
    }
    if(errorMessage && typeof errorMessage === 'object') {
      if(errorMessage.message && typeof errorMessage.message === 'string') {
        return(
          <div className="ui message">
              {errorMessage.message}
            </div>
        )
      }
      
    }
    return
  }
  render() {
    return (
      <div className="login-comp ui middle aligned center aligned grid" style={{height: '100vh'}}>
        <div className="column">
          <h2 className="ui blue image header">
            <div className="content">Log-in to your account</div>
          </h2>
          {this.renderForm()}
          {this.renderMessage()}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { auth } = state
  return { errorMessage: auth.error }
}
export default compose(
  connect(mapStateToProps, {login}),
  reduxForm({form: 'login'})
)(LoginForm);
