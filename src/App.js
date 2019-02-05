import React, { Fragment } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        component={() => (
          <Fragment>
            <input type="text" id="username" placeholder="username" />
            <button
              onClick={() => {
                localStorage.setItem(
                  "auth",
                  JSON.stringify(document.getElementById("username").value)
                );
              }}
            >
              Entrar
            </button>
          </Fragment>
        )}
      />
      <PrivateRoute
        exact
        path="/app"
        component={() => (
          <Fragment>
            {" "}
            <h1>{localStorage.getItem("auth")} está logado.</h1>
            <button
              onClick={() => {
                localStorage.setItem("auth", "");
                window.location.href = "/";
              }}
            >
              Sair
            </button>
          </Fragment>
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default App;
