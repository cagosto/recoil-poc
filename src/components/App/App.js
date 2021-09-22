import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../Landing/Landing';
import UserInfo from '../UserInfo/UserInfo';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/user/:id">
          <UserInfo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
