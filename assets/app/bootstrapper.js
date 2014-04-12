/*global define */

define(
  [
    // routers and controllers
    'routers/todoLists',
    'routers/users',
    'routers/modals',

    // commands
    'commands/todos',
    'commands/todoLists',
    'commands/users',
    'commands/session'
  ],
  function () {
    'use strict';

    return {
      run: function(){
        app.start();
      }
    }

  });
