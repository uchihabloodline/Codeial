const Post = require('../model/post');
const User = require('../model/users');

module.exports.home = async function(req,res){
    // console.log(req.cookies);
    // res.cookie('something',25); 
    console.log("inside home controller") 
    try{
        //populate the users of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path:  'user',
            }
        });

        //populate the users of each post
        let users = await User.find({});
           
        return res.render('home',{
            title:  "Codeial_home",
            posts:  posts,
            all_users: users,
        });

    }catch(err){
        console.log("ERROR--> ",err);
        return;
    }
};
