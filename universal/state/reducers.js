const generateId = require('short-id').generate;
const without = require('lodash/without');

const types = require('@app/universal/state/types');

function reduce (state, action) {
  switch (action.type) {
    case types.ADD_INGREDIENT:
      return Object.assign({}, state, addIngredient(action, state.ingredients, state.comboIngredients, state.activeCombo));
    case types.REMOVE_INGREDIENT:
      return Object.assign({}, state, {
        comboIngredients: {
          [state.activeCombo]: removeIngredient(action, state.comboIngredients[state.activeCombo])
        }
      });
    case types.ADD_COMBO:
      var id = generateId();
      return Object.assign({}, state, {
        activeCombo: id,
        combos: state.combos.concat(id),
        comboIngredients: Object.assign({}, state.comboIngredients, { [id]: [] })
      });
    case types.SET_COMBO:
      return (/next|back/.test(action.payload))
        ? paginateCombo(action.payload, state)
        : Object.assign({}, state, { activeCombo: action.payload });
  }

  return state;
}

module.exports = reduce;

// slices

function addIngredient (action, ingredients, comboIngredients, activeCombo) {
  const id = generateId();

  return {
    ingredients: Object.assign({}, ingredients, {
      [id]: {
        name: action.payload
      }
    }),
    comboIngredients: Object.assign({}, comboIngredients, {
      [activeCombo]: comboIngredients[activeCombo].concat({
        id: generateId(),
        ingredientId: id
      })
    })
  };
}

function removeIngredient (action, combo) {
  const item = combo.find(item => action.payload === item.id);
  return without(combo, item);
}

function paginateCombo (direction, state) {
  const currentIndex = state.combos.indexOf(state.activeCombo);

  const nextCombo = direction === 'next'
    ? state.combos[currentIndex + 1]
    : state.combos[currentIndex - 1];

  return (nextCombo)
    ? Object.assign({}, state, { activeCombo: nextCombo })
    : state;
}
