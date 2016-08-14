const PORT = 8080;

// dependencies

const createStore = require('redux').createStore;
const Glue = require('glue');
const HapiReactViews = require('hapi-react-views');
const Path = require('path');

const reducers = require('@app/universal/reducers');

const config = {
  server: {
    connections: {
      router: {
        stripTrailingSlash: true
      }
    }
  },
  connections: [{
    port: PORT
  }],
  registrations: [{
    plugin: {
      register: 'good',
      options: {
        reporters: {
          console: [{
            module: 'good-console',
            args: [{ log: '*', response: '*' }]
          }]
        }
      }
    }
  }, {
    plugin: 'inert'
  }, {
    plugin: 'vision'
  }]
};

Glue.compose(config, { relativeTo: Path.join(process.cwd(), 'server') }, (err, server) => {
  if (err) throw err;

  server.views({
    engines: {
      jsx: HapiReactViews
    },
    compileOptions: {
      layoutPath: __dirname,
      layout: 'layout'
    },
    isCached: false,
    path: __dirname
  });

  // store initial state in hapi request object

  server.ext('onRequest', function (request, reply) {
    request.app.state = {
      meta: {}
    };
    reply.continue();
  });

  // static file root

  server.route({
    method: 'GET',
    path: '/files/{files*}',
    handler: {
      directory: {
        path: 'server/files'
      }
    }
  });

  // views

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      request.app.state.meta.title = 'Ingredients';
      reply.view('index.jsx', hydrate(request.app.state));
    }
  });

  server.start(() => {
    console.info('kabob running on port ' + PORT.toString());
  });
});

/**
 * Creates a Redux store with available data for universal rendering
 * Serialized version hydrates client via react-redux
 *
 * @param {object} current request.app.state tree
 * @returns {object} Redux store that includes a serialized version of the state tree
 * @private
 */

function hydrate (state) {
  const store = createStore(reducers, state);
  return Object.assign(store.getState(), {
    initialState: 'window.__STATE__ = ' + JSON.stringify(store.getState())
  });
}
