import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import EventRoom from './Room';

const EventRoutes = ({ match, notFoundRoute }) => (
  <Switch>
    <Route path={`${match.url}/:code`} component={EventRoom}/>
    <Route path={`${match.url}/`} component={EventRoom}/>
    {notFoundRoute}
  </Switch>
)
export default withRouter(EventRoutes);