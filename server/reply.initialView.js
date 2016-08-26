var createStore = require('redux').createStore;
var reducers = require('@app/universal/reducers');

var server;

function initialView (templatePath) {
  var store = createStore(reducers, this.request.app.state);
  var state = 'window.__STATE__ = ' + JSON.stringify(store.getState());

  // pass store to the Redux Provider component via initial state

  this.request.app.state = store;

  // render view and wrap in layout component

  server.render(templatePath, state, {
    compileOptions: {
      doctype: ''
    }
  }, (err, markup) => {
    if (err) {
      this.response(err);
      return;
    }

    var props = Object.assign({
      body: markup,
      initialState: state
    }, store.getState().meta);

    server.render('layout.jsx', props, (err, markup) => {
      (err)
        ? this.response(err)
        : this.response(markup);
    });
  });
}

exports.register = function (serverInstance, options, next) {
  server = serverInstance;
  server.decorate('reply', 'initialView', initialView);
  next();
};

exports.register.attributes = {
  name: 'reply.initialView'
};
