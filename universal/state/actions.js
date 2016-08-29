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

/**
 * Add and switch to a new combo
 */

function addCombo () {
  return {
    type: types.ADD_COMBO
  };
}

/**
 * Removes a combo
 * @param {object} params
 * @param {string} params.id
 */

function removeCombo (id) {
  return {
    type: types.REMOVE_COMBO,
    payload: id
  };
}

/**
 * Set a combo to active, defaults to first available
 * @param {object} params
 * @param {string} params.id
 */

function setCombo (id) {
  return {
    type: types.SET_COMBO,
    payload: id
  };
}

module.exports = {addCombo, addIngredient, removeCombo, removeIngredient, setCombo};
