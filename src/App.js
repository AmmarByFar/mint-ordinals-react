import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MintOrdinalPage from './pages/MintOrdinalPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MintOrdinalPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;