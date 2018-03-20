import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import AudienceEventRoutes from './Event/routes';

const AudienceRoutes = ({ match, notFoundRoute }) => (
  <Switch>
    <Route path={`${match.url}/event`}>
      <AudienceEventRoutes notFoundRoute={notFoundRoute}/> 
    </Route>
    {notFoundRoute}
  </Switch>
)
export default withRouter(AudienceRoutes);