const User = require('../model/users');

module.exports.profile = function(req,res){
    return res.render('users',{
        title:   'Users Page'
    });
};

module.exports.signUp = function(req,res){
    return res.render('user-signup',{
        title:  'Codeial/ sign-Up',
    });
};

module.exports.signIn = function(req,res){
    return res.render('user-signin',{
        title:  'Codeial/ sign-In',
    });
};

//For Sign-Up user
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
    User.findOne({email:req.body.email}, function(err,user){
        if(err){
            console.log("Error in finding user in the DB");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("error in creating the user while signing-up!!");
                    return;
                }
            return res.redirect('/user/sign-in');
            })
        }else{
            console.log("User already Present!!");
            return res.redirect('back');
        }
    });
};

//For Sign-In user
module.exports.userSession = function(req,res){
    //TODO
}


