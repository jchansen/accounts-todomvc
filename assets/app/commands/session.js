define(
  [
    'app',
    'q',
    'models/Session'
  ],
  function (app, Q, Session) {

    var sessionPromise;

    var commands = function () {

    };

    var requests = function(){

      app.reqres.setHandler("session", function () {
        if(sessionPromise) return sessionPromise;
        var defer = Q.defer();
        var session = new Session();
        session.fetch().done(function(_session){
          defer.resolve(session);
        });
        sessionPromise = defer.promise;
        return sessionPromise;
      });

    };

    app.on("initialize:before", function () {
      commands();
      requests();
    });

  });