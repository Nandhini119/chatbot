var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var UserModel = require('../user/user.model.js');

module.exports = function(passport){
    console.log('passport signup setting up...');
    passport.use('signup', new LocalStrategy({
        passReqToCallback:true
    },
    function(req, username, password, done){
        UserModel.findOne({'username':username},function(err,user){
            if(err){
                console.log('Error in SignUp: ' + err);
                return done(err);
            }
            // user already exsist
            if(user){
                console.log('username already exsists:' + username);
                return done(null,false);
            } else {
                var newUser = new UserModel();

                //set the user's credentials
                newUser.username = username;
                newUser.password = password;
                newUser.email = req.param('email');
                newUser.type = 'user';
                newUser.status = "active";

                //saving into databases
                newUser.save(function(err){
                    if(err){
                        console.log('Error in saving user in the database: ' + err);
                        throw err;
                    }
                    console.log('New user registered succesfully');
                    return done(null, newUser);
                });
            }

        });
    })
    );
    // Generates hash using bCrypt

     var createHash = function(password){
     return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);

   }
}
