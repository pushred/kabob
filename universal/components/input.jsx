const React = require('react');

class Input extends React.Component {
  constructor () {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: ''
    };
  }

  handleChange (event) {
    this.setState({ value: event.target.value });
  }

  render () {
    return (
      <label className='input'>
        <input className='input__field' type='text' onChange={this.handleChange} value={this.state.value} />
      </label>
    );
  }
}

module.exports = Input;
