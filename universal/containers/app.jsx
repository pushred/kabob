var connect = require('react-redux').connect;
var Page = require('@app/server/index.jsx');
var Provider = require('react-redux').Provider;
var React = require('react');

class App extends React.Component {
  render () {
    var { store } = this.props;

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
  }
}

App = connect(mapStateToProps)(App);

module.exports = App;
