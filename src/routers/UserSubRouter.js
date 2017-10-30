import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserNav from '../ui/UserNav';

// Sub Layouts
import BrowseUsersPage from '../pages/BrowseUsersPage';
import AddUserPage from '../pages/AddUsersPage';
import UserProfilePage from '../pages/UserProfilePage';

const UserSubRouter = ({ match }) => (
    <div className="user-sub-layout">
      <aside>
        <UserNav />
      </aside>
      <div className="primary-content">
        <Switch>
          <Route path={match.path} exact component={BrowseUsersPage} />
          <Route path={`${match.path}/add`} component={AddUserPage} />
          <Route path={`${match.path}/:userId`} component={UserProfilePage} />
          <Redirect to={match.path} />
        </Switch>
      </div>
    </div>
);

UserSubRouter.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserSubRouter;
