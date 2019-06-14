import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './stores/configureStore';
import Home from './containers/home';
import Policy from './containers/policy';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/privacy" render={props => <Policy {...props} type="privacy" />} />
        <Route path="/cookie" render={props => <Policy {...props} type="cookie" />} />
        <Route path="/tos" render={props => <Policy {...props} type="tos" />} />
        <Route path="/:id" component={Home} />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
