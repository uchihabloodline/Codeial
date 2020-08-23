import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    user:{
        type:   mongoose.Schema.Types.ObjectId,
        required:   true,
    },
    //object id of the "liked" object
    likeable:{
        type:   mongoose.Schema.ObjectId,
        required:   true,
        refPath:    'onModel',
    },
    // the type of object which is being "liked"
    onModel:{
        type:   String,
        required:   true,
        enum:   ['Post','Comment'];
    }
},{
    timestamps: true,
});

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;