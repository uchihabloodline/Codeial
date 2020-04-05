const Post = require('../model/post');

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
    .exec((err,posts)=>{
        return res.render('home',
        {
        title:  "Codeial_home",
        posts:  posts,
        });
    })
}
