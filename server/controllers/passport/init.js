var login = require('./login');
var signup = require('./signup');
var UserModel = require('../../models/user');

module.exports = function(passport){
    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function(err, user) {
            console.log('deserializing user:');
            done(err, user);
        });
    });
login(passport);
signup(passport);
}
