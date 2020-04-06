const User = require('../model/users');

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        if(err){console.log("error finding the user"); return;}
            return res.render('users', {
                title: 'User_Profile',
                profile_user: user,
            });
    });
};

module.exports.update = function(req,res){
    if(req.params.id == req.user.id){
    User.findByIdAndUpdate(req.params.id,{name:req.body.name, email: req.body.email}, function(err,user){
        if(err){return res.status(500).send("internal server error!!")};
        return res.redirect('back');
    });
    }else{
        return res.status(401).send("Unauthorized");
    }
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

//For Sign-In and create a session for a user
module.exports.createSession = function(req,res){
    //redirecting to home page
   return res.redirect('/');
};

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
};


