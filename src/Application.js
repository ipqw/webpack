/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { About } from './pages/About';
import { Home } from './pages/Home';


export function Application() {
  return (
    <div>
      <nav>
        <Link data-testid="link-home" to="/">Home</Link>
        <Link to="/shri_simple_template/about">About</Link>
      </nav>
      <Switch>
        <Route path="/shri_simple_template/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
