import React from 'react';
import { Switch, withRouter } from 'react-router-dom';

import PrivateRoute from 'app/components/PrivateRoute';

import CreateEvent from './Create';
import ManageEvent from './Manage';

const defaultRoutes = ({ match, notFoundRoute }) => (
  <Switch>
    <PrivateRoute path={`${match.url}/create`} component={CreateEvent} />
    <PrivateRoute path={`${match.url}/manage`} component={ManageEvent} />
    <PrivateRoute path={`${match.url}/manage/:id`} component={ManageEvent} />
    {notFoundRoute}
  </Switch>
)
export default withRouter(defaultRoutes);