import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthorizedRoute from './AuthorizedRoute';
import store from './store/store';
import './app.css';

// Layouts
import UnauthorizedRoute from './routers/UnauthorizedRoute';
import PrimaryRoute from './routers/PrimaryRoute';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={UnauthorizedRoute} />
        <AuthorizedRoute path="/app" component={PrimaryRoute} />
        <Redirect to="/auth" />
      </Switch>
    </BrowserRouter>
  </Provider>
);

if (process.env.NODE_ENV === 'production') {
  ReactDOM.render(<App />, document.getElementById('_j_root'));
}

export default App;
