const Post = require('../model/post');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('something',25);  
    // Post.find({}, function(err,posts){
    //     return res.render('home',{
    //     title:  'Codeial_home',
    //     posts:   posts,
    // });
    // })

    Post.find({}).populate('user').exec((err,posts)=>{
        return res.render('home',{
        title:  "Codeial_home",
        posts:  posts,
        });
    })
}
