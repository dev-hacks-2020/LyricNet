import React, { Component } from 'react';
import './assets/css/main.css';
import Home from './components/Home';
import Generate from './components/Generate';
import Question from './components/Question';
import Complete from './components/Complete';
import { HashRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  componentDidMount() {
    document.title = 'LyricNet';
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/generate" component={Generate} />
          <Route path="/question" component={Question} />
          <Route path="/complete" component={Complete} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
