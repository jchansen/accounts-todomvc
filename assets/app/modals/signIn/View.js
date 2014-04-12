define(
  [
    'marionette',
    'tpl!./template.html',
    'app'
  ],
  function (Marionette, template, app) {

    var View = Marionette.ItemView.extend({
      template: template,

      initialize: function (options) {

      },

      events: {
        'click .modal-footer .btn-primary': 'onSubmit'
      },

      onSubmit: function (e) {
        e.preventDefault();
        var user = {
          username: 'jchansen',
          password: 'password'
        };

        app.commands.execute("app:lock");

        var that = this;
        app.reqres.request("user:signIn", user)
          .fail(function(err){
            throw err;
          })
          .done(function(user){
            app.commands.execute("app:unlock");
            app.vent.trigger("user:signedIn", user);
            that.trigger('close');
          });

      }
    });

    return View;
  });