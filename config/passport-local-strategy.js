const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/users');

//authentication using passport.js

passport.use(new LocalStrategy({
    usernameField:  'email'

    },
        function(email,password,done){
            User.findOne({email:email},function(err,user){
                if(err){
                    console.log("error in finding the User -->passport");
                    return done(err);
                }
                if(!user || user.password != password){
                    console.log("Invalid Username/password");
                    return done(null,false);
                }

                return done(null,user);
            });
        }
));

//serialize the user 
passport.serializeUser(function(user, done){
    done(false,user.id);
});

//deserialize the id in the cookie sent through serialized way
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log("error in finding the user!!");
            return done(err);
        }
        return done(null,user);
    });
});

module.exports = passport;