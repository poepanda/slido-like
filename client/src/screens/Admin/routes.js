import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Admin from './'
import EventRoutes from './Event/routes';

const defaultRoutes = ({ match, notFoundRoute }) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={Admin}/>
    <Route path={`${match.url}/event`}>
      <EventRoutes notFoundRoute={notFoundRoute}/>
    </Route>
    {notFoundRoute}
  </Switch>
)
export default withRouter(defaultRoutes);