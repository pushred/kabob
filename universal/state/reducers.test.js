const deepFreeze = require('deep-freeze');
const generateId = require('short-id').generate;
const test = require('ava').test;

const reduce = require('@app/universal/state/reducers');
const types = require('@app/universal/state/types');

test('adds an ingredient', t => {
  const state = deepFreeze({
    combo: [],
    ingredients: {}
  });

  const action = {
    type: types.ADD_INGREDIENT,
    payload: 'Zucchini'
  };

  const newState = reduce(state, action);
  const keys = Object.keys(newState.ingredients);

  t.true(keys.length === 1);
  t.true(newState.ingredients[keys[0]].name === 'Zucchini');
  t.true(newState.combo.length === 1);
  t.pass();
});

test('removes combo ingredients by id', t => {
  const idToKeep = generateId();
  const idToRemove = generateId();

  const state = deepFreeze({
    combo: [{
      id: idToKeep
    }, {
      id: idToRemove
    }]
  });

  const action = {
    type: types.REMOVE_INGREDIENT,
    payload: idToRemove
  };

  const newState = reduce(state, action);

  t.true(newState.combo.length === 1);
  t.true(newState.combo[0].id === idToKeep);
  t.pass();
});
