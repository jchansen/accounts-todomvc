define(
  [
    'conductor',
    './View'
  ],
  function (Conductor, View) {
    'use strict';

    return Conductor.ItemViewModule.extend({
      view: View,

      initialize: function(options){
        options.listName = this.reqres.request("todoList:name");
      }
    });

  });