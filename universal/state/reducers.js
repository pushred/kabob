const generateId = require('short-id').generate;
const without = require('lodash/without');

const types = require('@app/universal/state/types');

function reduce (state, action) {
  switch (action.type) {
    case types.ADD_INGREDIENT:
      var id = generateId();
      return Object.assign({}, state, {
        ingredients: addIngredient(state.ingredients, action, id),
        combo: state.combo.concat({ id: generateId(), ingredientId: id })
      });
    case types.REMOVE_INGREDIENT:
      return Object.assign({}, state, {
        combo: removeIngredient(state.combo, action)
      });
  }

  return state;
}

module.exports = reduce;

// slices

function addIngredient (ingredients, action, ingredientId) {
  return Object.assign({}, ingredients, {
    [ingredientId]: {
      name: action.payload
    }
  });
}

function removeIngredient (combo, action) {
  const item = combo.find(item => action.payload === item.id);
  return without(combo, item);
}
