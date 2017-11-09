import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrimaryHeader from '../ui/PrimaryHeader';
import AppHomePage from '../pages/AppHomePage';
import CommentsPage from '../pages/commentApp/CommentsPage';

// Sub router
import UserSubRouter from './UserSubRouter';

const PrimaryRoute = ({ match }) => (
  <div className="primary-layout">
    <PrimaryHeader />
    <main>
      <Switch>
        <Route path={match.path} exact component={AppHomePage} />
        <Route path={`${match.path}/users`} component={UserSubRouter} />
        <Route path={`${match.path}/comments`} component={CommentsPage} />
        <Redirect to={match.path} />
      </Switch>
    </main>
  </div>
);

PrimaryRoute.propTypes = {
  match: PropTypes.object.isRequired
};

export default PrimaryRoute;
