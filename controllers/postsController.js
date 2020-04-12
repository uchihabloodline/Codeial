const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user:   req.user._id,
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post,npm 
                },
                    message: "post created!",
            });
        }
        
        req.flash('success', 'Post published!');
        return res.redirect('back');
    }catch(err){
        console.log("ERROR--> ",err);
        return res.redirect('back');
    }
};

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();
            
        await Comment.deleteMany({post: req.params.id});
        //AJAX used for receiving post-id for deletion
        if (req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted"
            });
        }
        req.flash('success', 'Post and associated comments deleted!');

        return res.redirect('back');
        }else{
            return res.redirect('back')
        }

    }catch(err){
        console.log("ERROR--> ",err);
    } 
};