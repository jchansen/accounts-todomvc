/*global define */

define(
  [
    'marionette',
    'context/Repositories',
    'regions/ModalRegion'
  ],
  function (Marionette, Repositories, ModalRegion) {
    'use strict';

    var app = new Marionette.Application();
    window.app = app;

    app.addRegions({
      header: '#headerRegion',
      content: '#contentRegion',
      footer: '#footerRegion',
      modal: {
        selector: "#modalRegion",
        regionType: ModalRegion
      },
      appLock: {
        selector: "#appLockRegion",
        regionType: ModalRegion
      }
    });

    app.on("initialize:before", function () {
      app.Repositories = new Repositories();
    });

    app.on("initialize:after", function () {
      Backbone.history.start();
    });

    return app;
  });
