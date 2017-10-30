import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../reducers/loggedUserActionCreator';

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  handleLogin = () => {
    this.props.login(this.props.history);
  }

  render() {
    return (
      <div>
          <h1>Login Page</h1>
          <p>
            For this example application, we cannot visit <Link to="/app">/app</Link> until we are logged in.
            Clicking the 'Login' button will simulate a login by setting Redux state.
          </p>
          <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

export default connect(null, mapDispatchToProps)(LoginPage);
