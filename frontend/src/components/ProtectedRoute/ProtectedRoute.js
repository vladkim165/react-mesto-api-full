import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ components: Components, ...props }) => {
  return (
    <Route>
      {
        () => props.loggedIn ? Components : <Redirect to="/sign-in" />
      }
    </Route>
  )
}

export default ProtectedRoute;