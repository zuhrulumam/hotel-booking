/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Create User
  createUser: async (req, res, next) => {
    const data = req.body;

    let createdUser = await User.create({
        /* model */
        email: data.email,
        password: data.password,
        role: data.role,
      })
      .fetch();

    res.status(201);
    return res.json(createdUser);
  },

  // Get User
  getUser: async (req, res, next) => {
    const id = req.params.id;

    if (id) {
      let user = await User.findOne({
        id
      });

      return res.json(user);
    }

    let parameter = {};
    const queries = req.query;

    parameter.limit = parseInt(queries.limit) || 100;
    parameter.skip = parseInt(queries.offset) || 0;
    parameter.sort = queries.sort || 'createdAt DESC';

    let countPage = await User.count();
    countPage = Math.ceil(countPage / parameter.limit);

    let users = await User.find(parameter);

    return res.json({
      data: users,
      totalPage: countPage,
    });
  },

  // Update User
  updateUser: async (req, res, next) => {
    const data = req.body;

    let user = await User.update({
        id: data._id
      }, {
        /* model */
        email: data.email,
        password: data.password,
        role: data.role,
      })
      .fetch();

    return res.json(user[0]);
  },

  // Delete User
  deleteUser: async (req, res, next) => {
    const id = req.param('id');

    if (!id) {
      return next({
        err: 'No Data Provided'
      });
    }

    let user = await User.destroy({
        id
      })
      .fetch();

    return res.json(user[0]);
  },
};
