/**
 * BookingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Create Booking
  createBooking: async (req, res, next) => {
    const data = req.body;

    let createdBooking = await Booking.create({
        user_id: data.user_id,
        room_id: data.room_id,
        date_start: data.date_start,
        date_end: data.date_end,
      })
      .fetch();

    res.status(201);
    return res.json(createdBooking);
  },

  // Get Booking
  getBooking: async (req, res, next) => {
    const id = req.params.id;

    if (id) {
      let booking = await Booking.findOne({
          id
        })
        .populate('room_id')
        .populate('user_id');

      return res.json(booking);
    }

    let parameter = {};
    const queries = req.query;

    parameter.limit = parseInt(queries.limit) || 100;
    parameter.skip = parseInt(queries.offset) || 0;
    parameter.sort = queries.sort || 'createdAt DESC';

    let countPage = await Booking.count();
    countPage = Math.ceil(countPage / parameter.limit);

    let bookings = await Booking.find(parameter)
      .populate('room_id')
      .populate('user_id');

    return res.json({
      data: bookings,
      totalPage: countPage,
    });
  },

  // Update Booking
  updateBooking: async (req, res, next) => {
    const data = req.body;

    let booking = await Booking.update({
        id: data._id
      }, {
        /* model */
        user_id: data.user_id,
        room_id: data.room_id,
        date_start: data.date_start,
        date_end: data.date_end,
      })
      .fetch();

    return res.json(booking[0]);
  },

  // Delete Booking
  deleteBooking: async (req, res, next) => {
    const id = req.param('id');

    if (!id) {
      return next({
        err: 'No Data Provided'
      });
    }

    let booking = await Booking.destroy({
        id
      })
      .fetch();

    return res.json(booking[0]);
  },
};
