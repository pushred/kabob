const App = require('@app/universal/containers/app.jsx');
const React = require('react');
const redux = require('redux');
const rootReducer = require('@app/universal/state/reducers');
const render = require('react-dom').render;

const persistState = require('redux-localstorage').default;
const adapter = require('redux-localstorage/lib/adapters/localStorage');
const mergePersistedState = require('redux-localstorage').mergePersistedState;

function init () {
  const initialState = window.__STATE__;

  const reducer = redux.compose(
    mergePersistedState()
  )(rootReducer);

  const enhancer = redux.compose(
    persistState(adapter(window.localStorage), 'kabob-combos'),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  const store = redux.createStore(reducer, initialState, enhancer);

  render(
    <App store={store} />,
    document.querySelector('.layout')
  );
}

init();
