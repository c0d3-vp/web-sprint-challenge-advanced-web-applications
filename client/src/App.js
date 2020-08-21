import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/friends" component={BubblePage} />
        <Route path="/">
          <Redirect to="/friends" />
        </Route>
      </Switch>
    </Router>
  );
}

//  LocalWords:  BubblePage PrivateRoute
