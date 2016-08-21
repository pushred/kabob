const Provider = require('react-redux').Provider;
const React = require('react');

const Container = require('@app/universal/containers/combo.jsx');

class App extends React.Component {
  render () {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

module.exports = App;
