/* eslint-disable no-return-assign */

const connect = require('react-redux').connect;
const React = require('react');

const actions = require('@app/universal/state/actions');

const Input = require('@app/universal/components/input.jsx');
const List = require('@app/universal/components/list.jsx');

class Combo extends React.Component {
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
    const list = this.props.combo.map(item => Object.assign(item, this.props.ingredients[item.ingredientId]));

    return (
      <div className='combo'>
        <List data={list} handleRemove={this.handleRemove} />
        <form onSubmit={this.handleSubmit}>
          <Input ref={el => this.inputEl = el} />
        </form>
      </div>
    );
  }
}

// React <> Redux

function mapStateToProps (state) {
  return {
    combo: state.combo,
    ingredients: state.ingredients
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addIngredient: name => dispatch(actions.addIngredient(name)),
    removeIngredient: id => dispatch(actions.removeIngredient(id))
  };
}

module.exports = process.browser
  ? connect(mapStateToProps, mapDispatchToProps)(Combo)
  : Combo;
