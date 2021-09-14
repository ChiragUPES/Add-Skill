const order_model=require('../../models/order_model');
const moment=require('moment');
function order(){
    return{
        store(req,res)
        {
            //console.log(req.body);
            // store this data in database req.body+ session data
            const{phone,address}=req.body
            if(!phone || !address)
            {
                req.flash('error','All field required');
                return res.redirect('/cart');
            }
            const order=new order_model({   // passport ki help se loged in user mil gya
                customerId:req.user._id,
                items:req.session.cart.items,
                phone:phone,
                address:address
            })
            order.save().then(result=>{
                req.flash('success','Order Placed Succesfully');
                delete req.session.cart;
                return res.redirect('/customer/orders');

            }).catch(err=>{
                    req.flash('error','Something went wrong');
                    return res.redirect('/cart');
            })

        },
        async index(req,res){
            // login user k sare order fetch krne hai
            const orders=await order_model.find({customerId:req.user._id},null,
                {sort:{'createdAt':-1 }});
            res.render('coustmers/order',{orders:orders,moment:moment});
         //   console.log(orders);      // return array


        }




}
}

module.exports=order;
