import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import Show from './pages/Show';
import createAnnounce from './pages/CreateAnnounce';
import Menu from './pages/Menu';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
      <Route component={Show} path="/get-point" />
      <Route component={createAnnounce} path="/create-announce" />
      <Route component={Menu} path="/menu" />
    </BrowserRouter>
  );
};

export default Routes;
