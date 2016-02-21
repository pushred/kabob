'use strict';

const PORT = 8080;

// dependencies

const Glue = require('glue');
const HapiReactViews = require('hapi-react-views');
const Path = require('path');
const recursiveDir = require('recursive-readdir');

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
  }]
};

Glue.compose(config, { relativeTo: Path.join(process.cwd(), 'server') }, (err, server) => {
  if (err) throw err;

  recursiveDir('.', ['node_modules', '.*'], (err, files) => {
    if (err) throw err;

    // get and load all component folders as view paths to avoid component/component view references
    var componentPaths = files.map(path => {
      return (Path.extname(Path.basename(path)) === '.jsx')
        ? Path.resolve('.', Path.dirname(path))
        : false;
    });

    server.views({
      engines: {
        jsx: HapiReactViews
      },
      isCached: false,
      path: componentPaths.filter(Boolean)
    });
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      reply.view('index', {
        title: 'kabob'
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/files/{files*}',
    handler: {
      directory: {
        path: 'server/files'
      }
    }
  });

  server.start(() => {
    console.info('kabob running on port ' + PORT.toString());
  });
});
