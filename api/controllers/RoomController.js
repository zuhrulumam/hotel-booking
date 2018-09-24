/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // get available room for particular day
  getAvailableRoom: async (req, res, next) => {
    const queries = req.query;
    const start_date = queries.start_date;
    const end_date = queries.end_date;

    //  get all rooms populate booking, choose one that null or the date and quantity available
    // let rooms = await Room.find()
    //   .populate('room_booking', {
    //     where: {
    //       date_start: null
    //     }


    //     // date_start: {
    //     //   '<': start_date,
    //     //   '<': end_date
    //     // },
    //     // date_end: {
    //     //   '<': start_date
    //     // }

    //   }); --> query in sails still fail

    // let use traditional way (not scalable)
    let rooms = await Room.find()
      .populate('room_booking')

    let availableRoom = rooms.reduce((result, room) => {
      if (room.room_booking.length === 0) {
        result.push(room);
      } else {
        // loop for booking
      }
      return result;
    }, []);

    return res.json(availableRoom);
  },

  // Create Room
  createRoom: async (req, res, next) => {
    const data = req.body;

    let createdRoom = await Room.create({
        name: data.name,
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
        })
        .populate('type');

      return res.json(room);
    }

    let parameter = {};
    const queries = req.query;

    parameter.limit = parseInt(queries.limit) || 100;
    parameter.skip = parseInt(queries.offset) || 0;
    parameter.sort = queries.sort || 'createdAt DESC';

    let countPage = await Room.count();
    countPage = Math.ceil(countPage / parameter.limit);

    let rooms = await Room.find(parameter).populate('type').populate('room_booking');

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
