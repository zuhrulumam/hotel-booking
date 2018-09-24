/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */
var AccessRole = require('../api/policies/AccessRole');
module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/
  AuthController: {
    '*': true,
  },

  BookingController: {
    '*': ['SessionAuth', AccessRole(['admin'])],
    'changeStatus': ['SessionAuth', AccessRole(['admin', 'user'])],
  },

  RoomController: {
    '*': ['SessionAuth', AccessRole(['admin'])],
    'getRoom': ['SessionAuth', AccessRole(['admin', 'user', 'guest'])],
    'getAvailableRoom': ['SessionAuth', AccessRole(['admin', 'user', 'guest'])],
  },

  RoomType: {
    '*': ['SessionAuth', AccessRole(['admin'])],
    'getRoomType': ['SessionAuth', AccessRole(['admin'])],
  },

  UserController: {
    '*': ['SessionAuth', AccessRole(['admin'])],
  },

  // not yet implemented
  UserProfileController: {
    '*': true,
  },

};
