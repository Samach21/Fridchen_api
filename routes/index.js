const authRoute = require('./auth.route');
const UserRoute = require('./user.route');
const FamilyRoute = require('./family.route');

function build(app) {
  app.use('/', authRoute);
  app.use('/user', UserRoute);
  app.use('/family', FamilyRoute);
}

module.exports = build;
