var App = require('@app/universal/containers/app.jsx');
var React = require('react');
var redux = require('redux');
var reducers = require('@app/universal/reducers');
var render = require('react-dom').render;
var WebFont = require('webfontloader');

function init () {
  WebFont.load({
    google: {
      families: ['Source+Sans+Pro:400,600']
    }
  });

  var initialState = window.__STATE__;

  var createStore = redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(redux.createStore);

  var store = createStore(reducers, initialState);

  render(
    <App store={store} />,
    dom.find('.layout')
  );
}

init();
