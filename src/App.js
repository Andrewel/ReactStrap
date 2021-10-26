import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "av_shared_library/dist/index.css";

import { Home } from "./components/home";
import { ChartPage } from "./components/chartPage";
import { NotFoundPage } from "./components/notFoundPage";

import "./index.scss";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/chart", name: "Chart", Component: ChartPage },
];

export const App = () => {
  return (
    <Router>
      <div className="App">
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  <Component />
                </div>
              </CSSTransition>
            )}
          </Route>
        ))}
      </div>
    </Router>
  );
};
