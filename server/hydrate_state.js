const createStore = require('redux').createStore;

const reducers = require('@app/universal/state/reducers');

/**
 * Creates a Redux store with available data for universal rendering
 * Serialized version hydrates client via react-redux
 *
 * @param {object} current request.app.state tree
 * @returns {object} Redux store that includes a serialized version of the state tree
 */

function hydrateState (state) {
  const store = createStore(reducers, state);
  return Object.assign(store.getState(), {
    initialState: 'window.__STATE__ = ' + JSON.stringify(store.getState())
  });
}

module.exports = hydrateState;
