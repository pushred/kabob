const connect = require('react-redux').connect;
const Provider = require('react-redux').Provider;
const React = require('react');

const Page = require('@app/server/index.jsx');

class App extends React.Component {
  render () {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Page />
      </Provider>
    );
  }
}

function mapStateToProps (state) {
  return {
    meta: state.meta
  };
}

connect(mapStateToProps)(App);

module.exports = App;
