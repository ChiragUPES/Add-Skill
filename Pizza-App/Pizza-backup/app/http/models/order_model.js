const mongoose= require('mongoose');
const Schema=mongoose.Schema

const orderSchema=new Schema({
    // userid, session ka data, address, phone 
    customerId:{        // foreign ket userid se
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true   
    },
    items:{
        type:Object,required:true
    },
    phone:{type:String,required:true},
    address:{type:String,required:true},
    paymentType:{type:String,default:'COD'},
    status:{type:String,default:'order_placed'},
},{timestamps:true})
//module.exports=mongoose.model('Order',orderSchema);

var Order=mongoose.model(`Order`,orderSchema);
module.exports=Order;