const authRoute = require('./auth.route');

function build(app) {
  app.use('/', authRoute);
}

module.exports = build;
