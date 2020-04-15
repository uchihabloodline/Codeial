const User = require('../../../model/users');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){

    try{
    let user = await User.findOne({email:req.body.email});

    if(!user || user.password != req.body.password){
        return res.json(422,{
            message: "Invalid username/Password!!"
        });
    }
    if(user){
        return res.json(200,{
            message:  "Signed-In successfully..Save the JWT token safe for future communication!",
            data:{
                token:  jwt.sign(user.toJSON(),'codeial',{expiresIn:100000}),
        }
    });
    }
    }catch(err){
        console.log("******JWT error-> ",err.responseText);
        return res.json(500,{
            message: "Internal server error",
        });
    };
};