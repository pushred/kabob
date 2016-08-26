const React = require('react');
const Header = require('@app/universal/components/header.jsx');

var Component = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
      <main>
        <Header />
        <h2>Hello!</h2>
      </main>
    );
  }
});

module.exports = Component;
