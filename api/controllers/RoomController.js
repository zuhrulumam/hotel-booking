/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Create Room
  createRoom: async (req, res, next) => {
    const data = req.body;

    let createdRoom = await Room.create({
        type: data.type,
        price: data.price
      })
      .fetch();

    res.status(201);
    return res.json(createdRoom);
  },

  // Get Room
  getRoom: async (req, res, next) => {
    const id = req.params.id;

    if (id) {
      let room = await Room.findOne({
        id
      });

      return res.json(room);
    }

    let parameter = {};
    const queries = req.query;

    parameter.limit = parseInt(queries.limit) || 100;
    parameter.skip = parseInt(queries.offset) || 0;
    parameter.sort = queries.sort || 'createdAt DESC';

    let countPage = await Room.count();
    countPage = Math.ceil(countPage / parameter.limit);

    let rooms = await Room.find(parameter);

    return res.json({
      data: rooms,
      totalPage: countPage,
    });
  },

  // Update Room
  updateRoom: async (req, res, next) => {
    const data = req.body;

    let room = await Room.update({
        id: data._id
      }, {
        /* model */
        type: data.type,
        price: data.price,
        description: data.description,
        images: data.images
      })
      .fetch();

    return res.json(room[0]);
  },

  // Delete Room
  deleteRoom: async (req, res, next) => {
    const id = req.param('id');

    if (!id) {
      return next({
        err: 'No Data Provided'
      });
    }

    let room = await Room.destroy({
        id
      })
      .fetch();

    return res.json(room[0]);
  },
};
