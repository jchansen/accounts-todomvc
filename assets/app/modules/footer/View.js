/*global define */

define(
  [
    'marionette',
    'tpl!./template.html'
  ],
  function (Marionette, template) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template
    });
  });
