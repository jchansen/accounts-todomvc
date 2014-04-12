define(
  [
    'conductor',
    './View',
    'app',
    'q',
    'modules/common/loading/View'
  ],
  function (Conductor, View, app, Q, LoadingView) {
    'use strict';

    return Conductor.ItemViewModule.extend({
      view: View,
      data: {
        collection: function(options){
          var defer = Q.defer();
          app.reqres.request("usersForTodoList", options.listName).done(function(users){
            defer.resolve(users);
          });
          return defer.promise;
        }
      }
      //loadingView: LoadingView
    });

  });