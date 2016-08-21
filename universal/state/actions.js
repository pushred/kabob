const types = require('@app/universal/state/types');

/**
 * Adds ingredient to current combo and general database, if a match is not found
 * @param {object} params
 * @param {string} payload - name of ingredient
 */

function addIngredient (name) {
  return {
    type: types.ADD_INGREDIENT,
    payload: name
  };
}

/**
 * Removes an ingredient from the current combo
 * @param {object} params
 * @param {string} params.id
 */

function removeIngredient (id) {
  return {
    type: types.REMOVE_INGREDIENT,
    payload: id
  };
}

module.exports = {addIngredient, removeIngredient};
