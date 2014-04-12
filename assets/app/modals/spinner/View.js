define(
  [
    'marionette',
    'tpl!./template.html',
    'app',
    'spin'
  ],
  function (Marionette, template, app, Spinner) {

    var View = Marionette.ItemView.extend({
      template: template,

      initialize: function (options) {

      },

      onShow: function () {
        this.spinner = new Spinner()
        var spinnerEl = this.$('.spinner')[0];
        this.spinner.spin(spinnerEl);
      },

      onClose: function () {
        this.spinner.stop();
      }
    });

    return View;
  });