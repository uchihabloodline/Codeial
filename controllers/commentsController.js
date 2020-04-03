const Comment = require('../model/comment')
const Post =  require('../model/post')

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(err){
            console.log("error finding the post with the id in DB!"); return;
        }
        if(post){
        Comment.create({
            content: req.body.content,
            post:   req.body.post,  //doubt
            user:   req.user._id,   //doubt
        }, function(err, comment){
            if(err){
                console.log("error creating the comment!!"); return;
            }
            post.comments.push(comment);
            post.save();
            res.redirect('/');
        });
    }
});

}