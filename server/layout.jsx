const React = require('react');
const Header = require('@app/components/header');

module.exports = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    children: React.PropTypes.element
  },
  render: function () {
    return (
      <html lang='en'>
        <head>
          <title>{this.props.title || 'Kabob'}</title>
          <link rel='shortcut icon' href='/files/icon.png' />
          <link rel='stylesheet' href='/files/bundle.css' />
          <script src='/files/bundle.js' />
        </head>
        <body>
          <Header />
          {this.props.children}
        </body>
      </html>
    );
  }
});
