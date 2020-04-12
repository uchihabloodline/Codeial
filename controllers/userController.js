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

module.exports.update = async function(req,res){
    // if(req.params.id == req.user.id){
    // User.findByIdAndUpdate(req.params.id,{name:req.body.name, email: req.body.email}, function(err,user){
    //     if(err){return res.status(500).send("internal server error!!")};
    //     return res.redirect('back');
    // });
    // }else{
    //     return res.status(401).send("Unauthorized");
    // }
    if(req.params.id == req.user.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log("*****Multer error*/",err); return;}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    //this is saving the path of the uploaded file into the avatar field in user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
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
    req.flash('success','Successfully Logged In');
    return res.redirect('/');
};

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success','You have logged out');

    return res.redirect('/');
};


