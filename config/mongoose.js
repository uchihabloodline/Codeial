const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Codeial');
const mongodb = mongoose.connection;

mongodb.on('error',console.error.bind(console,'failed to connect MongoDb!!'));

mongodb.once('open',function(){
    console.log("successfully connected to database!!");
});

module.exports = mongodb;