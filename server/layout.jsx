var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <html lang="en">
        <head>
          <title>{this.props.title || 'Kabob'}</title>
          <link rel="shortcut icon" href="/files/icon.png" />
          <link href="/files/bundle.css" rel="stylesheet" type="text/css" />
        </head>
        <body>
          <div className="layout" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          <script dangerouslySetInnerHTML={{ __html: this.props.initialState }} />
          <script src="/files/bundle.js"></script>
        </body>
      </html>
    );
  }
});
