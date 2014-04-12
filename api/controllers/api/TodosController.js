/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  create: function(req, res, next) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    var username = req.user.username;
    var createdBy = username;

    Todo.create(params, function todoCreated(err, todo) {
      if (err) return res.send(err, 500);
      res.json(todo);
    });
  },

  update: function(req, res, next) {
    var id = req.param('id');
    var params = _.extend(req.query || {}, req.body || {});

    Todo.update(id, params, function todoUpdated(err, todo) {
      if (err) return res.send(err, 500);
      res.json(todo);
    });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

};
