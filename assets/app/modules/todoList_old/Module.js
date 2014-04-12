define(
  [
    'conductor',
    './View',
    'q',
    'modules/common/loading/View'
  ],
  function (Conductor, View, Q, LoadingView) {
    'use strict';

    return Conductor.ItemViewModule.extend({
      view: View,
      data: {
        model: function(options){
          var defer = Q.defer();
          app.reqres.request("todoList", options.listName).done(function(list){
            defer.resolve(list);
          });
          return defer.promise;
        },
        collection: function(options){
          var defer = Q.defer();
          app.reqres.request("usersForTodoList", options.listName).done(function(users){
            defer.resolve(users);
          });
          return defer.promise;
        }
      },
      loadingView: LoadingView
    });

  });