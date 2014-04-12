/*global define */

define(
  [
    'marionette',
    'tpl!./row.html',
    'app'
  ],
  function (Marionette, template, app) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template,
      tagName: 'tr',

      initialize: function(options){
        var x = 2;
      }
    });
  });
