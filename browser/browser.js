const App = require('@app/universal/containers/app.jsx');
const React = require('react');
const redux = require('redux');
const reducers = require('@app/universal/reducers');
const render = require('react-dom').render;
const WebFont = require('webfontloader');

function init () {
  WebFont.load({
    google: {
      families: ['Source+Sans+Pro:400,600']
    }
  });

  const initialState = window.__STATE__;

  const createStore = redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(redux.createStore);

  const store = createStore(reducers, initialState);

  render(
    <App store={store} />,
    document.querySelector('.layout')
  );
}

init();
