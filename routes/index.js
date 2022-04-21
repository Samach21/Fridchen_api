const authRoute = require('./authRoute');

function build(app) {
  app.use('/api/v1/auth', authRoute);
}

module.exports = {
  build
}