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
module.exports.createSession = function(req,res){
    //Finding the user in DB
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in finding the User!!");
            return;
        }
        //If user is found in the DB but password doesnt match from entered password
        if(user){
            if(user.password != req.body.password){
               // window.alert("Wrong password Entered!!");
                res.redirect('back');
            }
            //When everything is matching then making session for log-in
            res.cookie('user-id',user.id);
            return res.redirect('/user/profile');
        }else{
            //handle user not found
            return res.redirect('back');
        }

    });
};


