/*global define */

define(
  [
    'marionette',
    'tpl!./template.html',
    './ItemView'
  ],
  function (Marionette, template, ItemView) {
    'use strict';

    return Marionette.CompositeView.extend({
      template: template,
      itemView: ItemView,
      itemViewContainer: 'tbody'
    });
  });
