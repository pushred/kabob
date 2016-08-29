/* eslint-disable no-return-assign */

const connect = require('react-redux').connect;
const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const actions = require('@app/universal/state/actions');

const HotKeys = require('react-hotkeys').HotKeys;
const Input = require('@app/universal/components/input.jsx');
const List = require('@app/universal/components/list.jsx');

const shortcuts = {
  'next': 'right',
  'back': 'left'
};

class Combos extends React.Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.addIngredient(this.inputEl.state.value);
    this.inputEl.setState({ value: '' });
  }

  handleRemove (id) {
    this.props.removeIngredient(id);
  }

  render () {
    const { activeCombo, comboIngredients, ingredients } = this.props;
    const list = comboIngredients[activeCombo].map(item => Object.assign(item, ingredients[item.ingredientId]));

    return (
      <HotKeys keyMap={shortcuts} handlers={this.props} attach={process.browser ? window : null} focused>
        <main>
          <div className='combos'>
            <div className='combos__actions'>
              <button className='button' onClick={this.props.addCombo}>New Combo</button>
            </div>
            <ReactCSSTransitionGroup transitionName='combos-' transitionEnterTimeout={200} transitionLeaveTimeout={200}>
              <List data={list} handleRemove={this.handleRemove} />
            </ReactCSSTransitionGroup>
            <form onSubmit={this.handleSubmit}>
              <Input ref={el => this.inputEl = el} />
            </form>
          </div>
        </main>
      </HotKeys>
    );
  }
}

// React <> Redux

function mapStateToProps (state) {
  return {
    activeCombo: state.activeCombo,
    combos: state.combos,
    comboIngredients: state.comboIngredients,
    ingredients: state.ingredients
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addCombo: name => dispatch(actions.addCombo()),
    addIngredient: name => dispatch(actions.addIngredient(name)),
    removeIngredient: id => dispatch(actions.removeIngredient(id)),
    setCombo: id => dispatch(actions.setCombo(id)),
    next: () => dispatch(actions.setCombo('next')),
    back: () => dispatch(actions.setCombo('back'))
  };
}

module.exports = process.browser
  ? connect(mapStateToProps, mapDispatchToProps)(Combos)
  : Combos;
