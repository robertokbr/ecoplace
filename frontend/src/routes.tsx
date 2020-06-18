import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import Show from './pages/Show';
import CreateAnnounce from './pages/CreateAnnounce';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
      <Route component={Show} path="/get-point" />
      <Route component={CreateAnnounce} path="/create-announce" />
    </BrowserRouter>
  );
};

export default Routes;
