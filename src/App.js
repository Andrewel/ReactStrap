import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Home } from './components/home';
import { ChartPage } from './components/chartPage';
import { NotFoundPage } from './components/notFoundPage';
import { Layout } from './components/layout';

import './index.scss';

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/chart', name: 'Chart', Component: ChartPage },
];

export const App = () => {
  return (
    <Router>
      <div className='App'>
        <Layout>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={0}
                  /* classNames='page' */
                  unmountOnExit
                >
                  <div /* className='page' */>
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </Layout>
      </div>
    </Router>
  );
};
