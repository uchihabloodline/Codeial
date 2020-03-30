const User = require('../model/users');

module.exports.profile = function(req,res){
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id,function(err,user){
    //         if(err){console.log("Error finding the user in sign-in"); return;}
    //         if(user){
    //             return res.render('home',{
    //                 title:   'Users Page',
    //                 user:   user,
    //             });
    //         }else{
    //             res.redirect('user/sign-in');   
    //         }
    //     })
    // }else{
    //     res.redirect('user/sign-in');
    return res.render('users', {
        title: 'User_Profile'
    })

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
   return res.redirect('/user/profile');
};


