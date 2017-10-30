import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BrowseUsersPage = ({ match }) => (
  <div>
    Browse Users
    <ul>
      <li><Link to={`${match.path}/1`}>Brad</Link></li>
      <li><Link to={`${match.path}/2`}>Chris</Link></li>
      <li><Link to={`${match.path}/3`}>Michael</Link></li>
      <li><Link to={`${match.path}/4`}>Ryan</Link></li>
    </ul>
  </div>
);

BrowseUsersPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default BrowseUsersPage;
