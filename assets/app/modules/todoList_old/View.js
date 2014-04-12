/*global define */

define(
  [
    'marionette',
    'tpl!./template.html',
    'app',
    './ItemView'
  ],
  function (Marionette, template, app, ItemView) {
    'use strict';

    return Marionette.CompositeView.extend({
      template: template,
      itemView: ItemView,
      itemViewContainer: 'tbody',

      initialize: function(options){

      }
    });
  });
