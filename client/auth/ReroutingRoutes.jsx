
/**
 *
 * PrivateRoutes
 *
 */
import React from 'react';
import auth from './auth-helper';
import { Redirect, Route } from 'react-router-dom';

// Utils

const ReroutingRoutes = ({ component: Component, accessibleIfLoggedIn, pathToReroute, ...rest }) => {  
  var session_token = auth.isAuthenticated();
  var willReroute = false;

  if(!session_token && accessibleIfLoggedIn){
    willReroute = true;
  }
  if(session_token && !accessibleIfLoggedIn){
    willReroute = true;
  }
  return (
    <Route {...rest} render={props => (
     willReroute ? (
      < Component  {...props} />
      ) : (
            <Redirect to={{
              pathname: pathToReroute,
              state: { from: props.location }
              }}
            />
          )
      )} 
    />
  )
};


export default ReroutingRoutes;