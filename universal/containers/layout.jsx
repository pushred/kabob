const React = require('react');

const Header = require('@app/universal/components/header');

function Layout (props) {
  return (
    <html lang='en'>
      <head>
        <title>{props.meta.title + ' ※ '}Kabob</title>
        <link rel='shortcut icon' href='/files/icon.png' />
        <link href='/files/bundle.css' rel='stylesheet' type='text/css' />
      </head>
      <body>
        <Header />
        <div className='layout' dangerouslySetInnerHTML={{__html: props.children}} />
        <script dangerouslySetInnerHTML={{__html: props.initialState}} />
        <script src='/files/bundle.js'></script>
      </body>
    </html>
  );
}

module.exports = Layout;
