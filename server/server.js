'use strict';

const PORT = 8080;

// dependencies

const Glue = require('glue');
const HapiReactViews = require('hapi-react-views');
const Path = require('path');

var config = {
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
        reporters: [{
          reporter: require('good-console'),
          events: { log: '*', response: '*' }
        }]
      }
    }
  }, {
    plugin: 'inert'
  }, {
    plugin: 'vision'
  }, {
    plugin: '@app/server/reply.initialView'
  }]
};

Glue.compose(config, { relativeTo: Path.join(process.cwd(), 'server') }, (err, server) => {
  if (err) throw err;

  server.views({
    engines: {
      jsx: HapiReactViews
    },
    isCached: false,
    path: __dirname
  });

  // store initial state in hapi request object

  server.ext('onRequest', function (request, reply) {
    request.app.state = {};
    reply.continue();
  });

  // set static file root

  server.route({
    method: 'GET',
    path: '/files/{files*}',
    handler: {
      directory: {
        path: 'server/files'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      req.app.state = {
        meta: {
          title: 'Something new'
        }
      };

      reply.initialView('index.jsx');
    }
  });

  server.start(() => {
    console.info('kabob running on port ' + PORT.toString());
  });
});
