const PORT = 8080;

// dependencies

const Glue = require('glue');
const HapiReactViews = require('hapi-react-views');
const Path = require('path');

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
  },
  { plugin: 'inert' },
  { plugin: 'vision' },
  { plugin: '@app/server/controllers/combos' }]
};

config.registrations.push({
  plugin: {
    register: 'blipp',
    options: {
      showStart: false
    }
  }
});

Glue.compose(config, { relativeTo: Path.join(process.cwd(), 'server') }, (err, server) => {
  if (err) throw err;

  server.views({
    engines: {
      jsx: HapiReactViews
    },
    compileOptions: {
      layoutPath: Path.join(process.cwd(), 'universal', 'containers'),
      layout: 'layout'
    },
    isCached: false,
    path: Path.join(process.cwd(), 'universal')
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

  server.start(() => console.info(server.plugins.blipp.text()));
});
