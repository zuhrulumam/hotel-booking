module.exports = param => {
  return async (req, res, next) => {
    if (param.indexOf(req.session.role) > -1) {
      return next()
    }

    return res.status(401).json({
      err: 'Forbidden To Access This API'
    });
  }
}
