module.exports = function (req, res, next) {
  let token;

  if (req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      let scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.status(401).json({
        err: 'Format is Authorization: Bearer [token]'
      });
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    sails.log.error('No Authorization header was found');
    return res.status(401).json({
      err: 'No Authorization header was found'
    });
  }

  if (token === 'tokenforuser') {
    req.session.role = 'user';
  } else if (token === 'tokenforadmin') {
    req.session.role = 'admin';
  } else {
    req.session.role = 'guest';
  }

  return next()
}
