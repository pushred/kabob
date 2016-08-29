const deepFreeze = require('deep-freeze');
const generateId = require('short-id').generate;
const test = require('ava').test;

const reduce = require('@app/universal/state/reducers');
const types = require('@app/universal/state/types');

test('adds an ingredient', t => {
  const comboId = generateId();
  const existingId = generateId();
  const existingComboId = generateId();

  const state = deepFreeze({
    activeCombo: comboId,
    ingredients: {
      [existingId]: {
        'name': 'Habanero'
      }
    },
    comboIngredients: {
      [existingComboId]: [{
        'ingredientId': existingId
      }],
      [comboId]: [{
        'ingredientId': existingId
      }]
    }
  });

  const action = {
    type: types.ADD_INGREDIENT,
    payload: 'Zucchini'
  };

  const newState = reduce(state, action);
  const keys = Object.keys(newState.ingredients);

  t.true(keys.length === 2);
  t.true(newState.ingredients[keys[0]].name === 'Habanero');
  t.true(newState.ingredients[keys[1]].name === 'Zucchini');
  t.true(newState.comboIngredients[comboId].length === 2);
  t.true(Object.keys(newState.comboIngredients).length === 2);
  t.pass();
});

test('removes combo ingredients by id', t => {
  const comboId = generateId();
  const idToKeep = generateId();
  const idToRemove = generateId();

  const state = deepFreeze({
    activeCombo: comboId,
    comboIngredients: {
      [comboId]: [{
        id: idToKeep
      }, {
        id: idToRemove
      }]
    }
  });

  const action = {
    type: types.REMOVE_INGREDIENT,
    payload: idToRemove
  };

  const newState = reduce(state, action);

  t.true(newState.comboIngredients[comboId].length === 1);
  t.true(newState.comboIngredients[comboId][0].id === idToKeep);
  t.pass();
});

test('adds and focuses a new combo', t => {
  const existingId = generateId();

  const state = deepFreeze({
    activeCombo: existingId,
    combos: [existingId],
    comboIngredients: {
      existingId: []
    }
  });

  const action = {
    type: types.ADD_COMBO
  };

  const newState = reduce(state, action);
  const newId = newState.combos[1];

  t.true(newState.combos.length === 2);
  t.true(Object.keys(newState.comboIngredients).length === 2);
  t.true(Array.isArray(newState.comboIngredients[newId]));
  t.true(newState.activeCombo === newId);
  t.pass();
});

test('focuses a specified combo', t => {
  const comboId = generateId();

  const state = deepFreeze({
    activeCombo: null,
    combos: [comboId, generateId()]
  });

  const action = {
    type: types.SET_COMBO,
    payload: comboId
  };

  const newState = reduce(state, action);

  t.true(newState.activeCombo === comboId);
  t.true(newState.activeCombo === newState.combos[0]);
  t.pass();
});

test('focus the adjacent combos by index when next/back keywords are specified', t => {
  const currentId = generateId();
  const nextId = generateId();

  const state = deepFreeze({
    activeCombo: currentId,
    combos: [currentId, nextId]
  });

  var action = {
    type: types.SET_COMBO,
    payload: 'next'
  };

  var newState = reduce(state, action);

  t.true(newState.activeCombo === nextId);

  action = {
    type: types.SET_COMBO,
    payload: 'back'
  };

  newState = reduce(state, action);

  t.true(newState.activeCombo === currentId);
  t.pass();
});

test('stay on focused combo if a next/previous combo does not exist', t => {
  const currentId = generateId();
  const prevId = generateId();

  const state = deepFreeze({
    activeCombo: currentId,
    combos: [prevId, currentId]
  });

  var action = {
    type: types.SET_COMBO,
    payload: 'next'
  };

  var newState = reduce(state, action);

  t.true(newState.activeCombo === currentId);
  t.pass();
});
