/*global define */

define(
  [
    'marionette',
    'tpl!./template.html',
    'app',
    './ItemView',
    'models/TodoList'
  ],
  function (Marionette, template, app, ItemView, List) {
    'use strict';

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return Marionette.CompositeView.extend({
      template: template,
      itemView: ItemView,
      itemViewContainer: '.placeholders',

      events: {
        'click img': 'onNewList'
      },

      initialize: function(options){

      },

      onNewList: function(e){
        e.preventDefault();
        var listName = "List" + getRandomInt(1,10000).toString();
        var newList = new List({
          name: listName,
          description: "Description for " + listName
        });
        app.commands.execute("todoList:create", newList);
      }
    });
  });
