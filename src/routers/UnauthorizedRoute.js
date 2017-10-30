import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const UnauthorizedRoute = () => (
  <div className="unauthorized-layout">
    <Switch>
      <Route path="/auth/login" component={LoginPage} />
      <Redirect to="/auth/login" />
    </Switch>
  </div>
);

export default UnauthorizedRoute;
