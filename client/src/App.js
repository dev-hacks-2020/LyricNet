import React from 'react';
import './assets/css/main.css';
import Home from './components/Home';
import Generate from './components/Generate';
import Question from './components/Question';
import { HashRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/generate" component={Generate} />
        <Route path="/question" component={Question} />
      </Switch>
    </HashRouter>
  );
}

export default App;
