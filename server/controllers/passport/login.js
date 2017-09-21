var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../../models/user')

module.exports = function(passport){
    console.log('passport login setting up...');
    passport.use('login', new LocalStrategy({
        passReqToCallback:true
    },
    function(req, username, password, done){
      console.log('inside passport login');
      UserModel.findOne({'username': username,'password': password},function(err, user){
          if (err) {
            console.log('login error1');
            return done (err);
          }
          if(!user) {
            console.log('login error2');
            return done(null, false);
          }
          // success condition
          console.log('login success');
          return done (null, user)
      })
    }

    ))
}
