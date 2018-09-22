/**
 * RoomTypeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Create RoomType
  createRoomType: async (req, res, next) => {
    const data = req.body;

    let createdRoomType = await RoomType.create({
        room_type: data.room_type,
      })
      .fetch();

    res.status(201);
    return res.json(createdRoomType);
  },

  // Get RoomType
  getRoomType: async (req, res, next) => {
    const id = req.params.id;

    if (id) {
      let roomType = await RoomType.findOne({
        id
      });

      return res.json(roomType);
    }

    let parameter = {};
    const queries = req.query;

    parameter.limit = parseInt(queries.limit) || 100;
    parameter.skip = parseInt(queries.offset) || 0;
    parameter.sort = queries.sort || 'createdAt DESC';

    let countPage = await RoomType.count();
    countPage = Math.ceil(countPage / parameter.limit);

    let roomTypes = await RoomType.find(parameter);

    return res.json({
      data: roomTypes,
      totalPage: countPage,
    });

  },

  // Update RoomType
  updateRoomType: async (req, res, next) => {
    const data = req.body;

    let roomType = await RoomType.update({
        id: data._id
      }, {
        room_type: data.room_type
      })
      .fetch();

    return res.json(roomType[0]);

  },

  // Delete RoomType
  deleteRoomType: async (req, res, next) => {
    const id = req.param('id');

    if (!id) {
      return next({
        err: 'No Data Provided'
      });
    }

    let roomType = await RoomType.destroy({
        id
      })
      .fetch();

    return res.json(roomType[0]);
  },

};
