import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

const UserNav = ({ match }) => (
  <nav className="context-nav">
    <NavLink to={match.path} exact activeClassName="active">Browser</NavLink>
    <NavLink to={`${match.path}/add`} activeClassName="active">Add</NavLink>
  </nav>
);

UserNav.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(UserNav);
