import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { dataIsReady } from './data/meta/selectors';

import NavBar from './components/NavBar';
import Loading from './components/Loading';
import NotFound from './screens/NotFound';
import Landing from './screens/Landing';
import AudienceRoutes from './screens/Audience/routes';
import AdminRoutes from './screens/Admin/routes';

const mapStateToProps = state => ({
  dataIsReady: dataIsReady(state),
})

const RootRouter = ({ dataIsReady }) => {
  const NotFoundRoute = <Route component={NotFound}/>;
  
  return dataIsReady ? (
    <Router>
      <div className="container is-fluid">
        <NavBar />
        <div className="route-container">
          <Switch>
            
            <Route exact path="/" component={Landing}/>
            
            <Route path="/admin">
              <AdminRoutes notFoundRoute={NotFoundRoute}/>
            </Route>
            
            <Route path="/audi">
              <AudienceRoutes notFoundRoute={NotFoundRoute}/>
            </Route>
            
            <Route component={NotFound}/>
          
          </Switch>
        </div>
      </div>
    </Router>
  ) : <Loading fullscreen visible={true}/>;
}

export default connect(mapStateToProps)(RootRouter);