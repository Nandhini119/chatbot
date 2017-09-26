var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('..//user/user.model.js')

module.exports = function(passport){
    console.log('passport login setting up...');
    passport.use('login', new LocalStrategy({
        passReqToCallback:true
    },
    function(req, username, password, done){
      console.log('inside passport login');
      UserModel.findOne({'username': username,'password': password}, function(err, user) {
        /* mongo server error */
        if(err) return done (err);
        /* user will be null if no match is found  */
        return done(null, user);
      })
    }

    ))
}
