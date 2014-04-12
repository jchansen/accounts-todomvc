/*global define */

define(
  [
    'marionette',
    'tpl!./todoList.html',
    'app'
  ],
  function (Marionette, template, app) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template,
      className: "col-xs-6 col-sm-4 col-lg-3",

      initialize: function(options){

      }
    });
  });
