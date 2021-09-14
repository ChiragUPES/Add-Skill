var mongoose=require('mongoose');
var Schema=mongoose.Schema
const userSchema=new Schema({
    name:{ type:String,required:true},
    email:{ type:String,required:true, unique:true},
    password:{ type:String,required:true},
    role:{ type:String,default:'customer'}      // role // 
},{         // time stamp
    timestamps:true

});


module.exports=mongoose.model('User',userSchema);
