/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  // Auth 
  'POST /signin': 'AuthController.signin',
  'POST /signup': 'AuthController.signup',

  /***************************************************************************
   *                                RoomType                                     *
   ***************************************************************************/

  'POST /room-types': 'RoomTypeController.createRoomType',
  'GET /room-types/:id?': 'RoomTypeController.getRoomType',
  'PUT /room-types': 'RoomTypeController.updateRoomType',
  'DELETE /room-types/:id': 'RoomTypeController.deleteRoomType',

  /***************************************************************************
   *                                Room                                     *
   ***************************************************************************/

  'POST /rooms': 'RoomController.createRoom',
  'GET /rooms/:id?': 'RoomController.getRoom',
  'PUT /rooms': 'RoomController.updateRoom',
  'DELETE /rooms/:id': 'RoomController.deleteRoom',

  'GET /available-rooms': 'RoomController.getAvailableRoom',


  /***************************************************************************
   *                                User                                     *
   ***************************************************************************/

  'POST /users': 'UserController.createUser',
  'GET /users/:id?': 'UserController.getUser',
  'PUT /users': 'UserController.updateUser',
  'DELETE /users/:id': 'UserController.deleteUser',

  /***************************************************************************
   *                                UserProfile                                     *
   ***************************************************************************/

  'POST /user-profiles': 'UserProfileController.createUserProfile',
  'GET /user-profiles/:id?': 'UserProfileController.getUserProfile',
  'PUT /user-profiles': 'UserProfileController.updateUserProfile',
  'DELETE /user-profiles/:id': 'UserProfileController.deleteUserProfile',


  /***************************************************************************
   *                                Booking                                     *
   ***************************************************************************/

  'POST /bookings': 'BookingController.createBooking',
  'PUT /booking-status': 'BookingController.changeStatus',
  'GET /bookings/:id?': 'BookingController.getBooking',
  'PUT /bookings': 'BookingController.updateBooking',
  'DELETE /bookings/:id': 'BookingController.deleteBooking',



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
