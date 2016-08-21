const configureStore = require('redux-mock-store');

const mockStore = configureStore();
const test = require('ava').test;

const actions = require('@app/universal/state/actions');
const types = require('@app/universal/state/types');

test('addIngredient', t => {
  const store = mockStore({
    ingredients: []
  });

  store.dispatch(actions.addIngredient('melon'));

  const action = store.getActions()[0];

  t.true(action.type === types.ADD_INGREDIENT);
  t.true(action.payload === 'melon');
  t.pass();
});

test('removeIngredient', t => {
  const store = mockStore({
    combo: [{
      id: 'a4vhAoFG'
    }]
  });

  store.dispatch(actions.removeIngredient('a4vhAoFG'));

  const action = store.getActions()[0];

  t.true(action.type === types.REMOVE_INGREDIENT);
  t.pass();
});
