const Post = require('../model/post');
const User = require('../model/users');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('something',25);  
    // })

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path:  'user',
        }
    })
    .exec(function(err,posts){
        if(err){console.log("error fetching all the posts from DB!"); return;}
        //populate the users of each post
        User.find({},function(err,user){
            if(err){console.log("error fetching all the users from DB!"); return;}
            return res.render('home',{
             title:  "Codeial_home",
             posts:  posts,
             all_users: user,
        });
    })    
    });
}
