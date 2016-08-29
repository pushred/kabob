const generateId = require('short-id').generate;
const hydrate = require('@app/server/hydrate_state');

function Combos (server, options, next) {
  const id = generateId();

  server.route({
    path: '/',
    method: 'GET',
    handler: (request, reply) => {
      request.app.state = {
        meta: {
          title: 'New Combo'
        },
        activeCombo: id,
        combos: [id],
        comboIngredients: {
          [id]: []
        },
        ingredients: {}
      };
      reply.view('containers/combos.jsx', hydrate(request.app.state));
    }
  });

  next();
}

module.exports.register = Combos;

module.exports.register.attributes = {
  name: 'combos'
};
