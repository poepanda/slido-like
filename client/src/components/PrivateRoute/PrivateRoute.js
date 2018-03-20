import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, inProgress, authenticated, ...rest}) => {
  // return nothing while waiting for user state
  if (inProgress) return null;
  return (
    <Route {...rest} component={(props) => (
      authenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect 
          to={{
            pathname: "/admin",
            // TODO: how to use this param to send you back to where he/she
            // wanna get to after logging in 
            state: { from: props.location }
          }}/>
      )
    )}/>
  )
}