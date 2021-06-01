const Mongoose = require("mongoose");
Schema=Mongoose.Schema;

articleSchema=new Schema({
    title:String,
    description:String,
    author:String,
});

module.exports=Mongoose.model('Blogs',articleSchema);
