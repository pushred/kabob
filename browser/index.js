var WebFont = require('webfontloader');

document.addEventListener('DOMContentLoaded', function () {
  WebFont.load({
    google: {
      families: ['Source+Sans+Pro:400,600']
    }
  });
});
