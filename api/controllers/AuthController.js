module.exports = {
  signup: async (req, res, next) => {
    const data = req.body;

    let createdUser = await User.create({
        /* model */
        email: data.email,
        password: data.password,
      })
      .fetch();

    // return token for auth
    let token = 'token for user';
    const expiresIn = '3h';

    res.status(201);
    return res.json({
      token,
      expiresIn
    });
  },

  signin: async (req, res, next) => {

    const data = req.body;

    let user = await User.findOne({
      email: data.email
    });

    if (user) {
      if (user.password !== data.password) {
        return next({
          err: 'Wrong Email Or Password'
        });
      }

      // return token for auth
      let token = 'token for ' + user.role;
      const expiresIn = '3h';

      return res.json({
        token,
        expiresIn
      });
    }

  }
}
