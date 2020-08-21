import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  const { loggedIn } = rest;

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
  };
}
export default connect(mapStateToProps)(PrivateRoute);
