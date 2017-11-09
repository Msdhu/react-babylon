import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { logout } from '../reducers/loggedUserReducer/loggedUserActionCreator';

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

@connect(null, mapDispatchToProps)
class AppHomePage extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  handleLogout = () => {
    this.props.logout(this.props.history);
  }

  render() {
    return (
      <div>
          App Home Page
          <br /><br />
          <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default AppHomePage;
