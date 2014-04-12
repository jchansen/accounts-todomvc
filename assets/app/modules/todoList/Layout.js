define(
  [
    'marionette',
    'tpl!./layout.html'
  ],
  function (Marionette, template) {

    return Marionette.Layout.extend({
      template: template,

      regions: {
        controlsRegion: '#controlsRegion',
        notepadRegion: '#notepadRegion'
      }

    });
  });