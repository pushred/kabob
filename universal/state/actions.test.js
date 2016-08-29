const configureStore = require('redux-mock-store');
const generateId = require('short-id').generate;

const mockStore = configureStore();
const test = require('ava').test;

const actions = require('@app/universal/state/actions');
const types = require('@app/universal/state/types');

test('addIngredient', t => {
  const comboId = generateId();

  const store = mockStore({
    activeCombo: comboId,
    ingredients: {},
    comboIngredients: {
      [comboId]: []
    }
  });

  store.dispatch(actions.addIngredient('melon'));

  const action = store.getActions()[0];

  t.true(action.type === types.ADD_INGREDIENT);
  t.true(action.payload === 'melon');
  t.pass();
});

test('removeIngredient', t => {
  const comboId = generateId();
  const ingredientId = generateId();

  const store = mockStore({
    activeCombo: comboId,
    ingredients: {},
    comboIngredients: {
      [comboId]: []
    }
  });

  store.dispatch(actions.removeIngredient(ingredientId));

  const action = store.getActions()[0];

  t.true(action.type === types.REMOVE_INGREDIENT);
  t.pass();
});

test('addCombo', t => {
  const comboId = generateId();

  const store = mockStore({
    activeCombo: comboId,
    combos: []
  });

  store.dispatch(actions.addCombo());

  const action = store.getActions()[0];

  t.true(action.type === types.ADD_COMBO);
  t.pass();
});

test('removeCombo', t => {
  const comboId = generateId();

  const store = mockStore({
    activeCombo: comboId,
    combos: [],
    comboIngredients: {
      [comboId]: []
    }
  });

  store.dispatch(actions.addCombo());

  const action = store.getActions()[0];

  t.true(action.type === types.ADD_COMBO);
  t.pass();
});
