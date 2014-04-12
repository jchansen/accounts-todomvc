define(
  [
    'conductor',
    './View',
    'q'
  ],
  function (Conductor, View, Q) {
    'use strict';

    return Conductor.ItemViewModule.extend({
      view: View,
      data: {
        model: function(){
          var defer = Q.defer();
          app.reqres.request("session").done(function(session){
            defer.resolve(session);
          });
          return defer.promise;
        }
      }
    });

  });