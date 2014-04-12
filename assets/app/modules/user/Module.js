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
          app.reqres.request("user", options.username).done(function(user){
            defer.resolve(user);
          });
          return defer.promise;
        },
        collection: function(options){
          var defer = Q.defer();
          app.reqres.request("todoListsForUser", options.username).done(function(user){
            defer.resolve(user);
          });
          return defer.promise;
        }
      },
      loadingView: LoadingView
    });

  });