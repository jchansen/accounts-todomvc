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
        collection: function(){
          var defer = Q.defer();
          app.reqres.request("users").done(function(users){
            defer.resolve(users);
          });
          return defer.promise;
        }
      },
      loadingView: LoadingView
    });

  });