const React = require('react');
const Layout = require('./layout.jsx');

var Component = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
      <Layout>
        <h2>Hello!</h2>
      </Layout>
    );
  }
});

module.exports = Component;
