import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getLoggedUser } from './reducers/loggedUserActionCreator';

class AuthorizedRoute extends Component {
  static propTypes = {
    getLoggedUser: PropTypes.func.isRequired,
    component: PropTypes.func.isRequired,
    logged: PropTypes.bool.isRequired
  }

  componnetWillMount() {
    this.props.getLoggedUser();
  }

  render() {
    const { component: PrimaryRoute, logged, ...rest } = this.props;
    return (
      <Route
        {...rest} render={(props) => {
          if (logged) {
            return <PrimaryRoute {...props} />;
          }
          return <Redirect to="/auth/login" />;
        }}
      />
    );
  }
}

const mapStateToProps = ({ loggedUserState }) => ({
  logged: loggedUserState.logged
});

const mapDispatchToProps = dispatch => bindActionCreators({ getLoggedUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedRoute);
