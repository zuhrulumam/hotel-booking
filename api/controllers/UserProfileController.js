/**
 * UserProfileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Create UserProfile
  createUserProfile: async (req, res, next) => {
    const data = req.body;

    let createdUserProfile = await UserProfile.create({
        name: data.name,
        address: data.address,
        phone: data.phone,
        photo_url: data.photo_url,
      })
      .fetch();

    res.status(201);
    return res.json(createdUserProfile);
  },

  // Get UserProfile
  getUserProfile: async (req, res, next) => {
    const id = req.params.id;

    if (id) {
      let user_profile = await UserProfile.findOne({
        id
      });

      return res.json(user_profile);
    }

    let parameter = {};
    const queries = req.query;

    parameter.limit = parseInt(queries.limit) || 100;
    parameter.skip = parseInt(queries.offset) || 0;
    parameter.sort = queries.sort || 'createdAt DESC';

    let countPage = await UserProfile.count();
    countPage = Math.ceil(countPage / parameter.limit);

    let user_profiles = await UserProfile.find(parameter);

    return res.json({
      data: user_profiles,
      totalPage: countPage,
    });
  },

  // Update UserProfile
  updateUserProfile: async (req, res, next) => {
    const data = req.body;

    let user_profile = await UserProfile.update({
        id: data._id
      }, {
        /* model */
        name: data.name,
        address: data.address,
        phone: data.phone,
        photo_url: data.photo_url,
      })
      .fetch();

    return res.json(user_profile[0]);
  },

  // Delete UserProfile
  deleteUserProfile: async (req, res, next) => {
    const id = req.param('id');

    if (!id) {
      return next({
        err: 'No Data Provided'
      });
    }

    let user_profile = await UserProfile.destroy({
        id
      })
      .fetch();

    return res.json(user_profile[0]);
  },
};
