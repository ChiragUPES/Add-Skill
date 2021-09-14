// schema

var mongoose=require('mongoose');
var Schema=mongoose.Schema
const menuSchema=new Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    size:{type:String,required:true}
});
var Menu=mongoose.model(`menu`,menuSchema);
module.exports=Menu;
