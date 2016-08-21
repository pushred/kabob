const hydrate = require('@app/server/hydrate_state');

function Combos (server, options, next) {
  server.route({
    path: '/',
    method: 'GET',
    handler: (request, reply) => {
      request.app.state = {
        meta: {
          title: 'New'
        },
        combo: [],
        ingredients: {}
      };
      reply.view('containers/combo.jsx', hydrate(request.app.state));
    }
  });

  next();
}

module.exports.register = Combos;

module.exports.register.attributes = {
  name: 'combos'
};
