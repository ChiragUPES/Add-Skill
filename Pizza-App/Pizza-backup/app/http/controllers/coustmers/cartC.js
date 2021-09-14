
function cartC(){
    return {
        cart(req,res){
            res.render('coustmers/cart');
        }
        ,
        // for representing in the cart image of home page
        update(req,res){
            // structure of data stroe in cart
            // let cart={
            //     items:{
            //         pizzaid:{item:pizzaObject,qty:0},
            //     },
            //     totalQty:0,
            //     totalPrice:0
            // }

            // if cart is not present create empty cart.. checek in the sesion cart key is present or not
            if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalQty:0,
                totalPrice:0 
                }
            }
            let cart=req.session.cart

                // Check if item is in the cart or not..if yes add qty else  add to cart
                if(!cart.items[req.body._id]){
                    cart.items[req.body._id]={
                        item:req.body,
                        qty:1
                    }
                    cart.totalQty=cart.totalQty+1,
                    cart.totalPrice=cart.totalPrice+req.body.price
                }
                // inside the cart
                else{
                    cart.items[req.body._id].qty=cart.items[req.body._id].qty+1,
                    cart.totalQty=cart.totalQty+1,
                    cart.totalPrice=cart.totalPrice+req.body.price

                }
            return res.json({totalQty:req.session.cart.totalQty});
        }
    }
}

module.exports=cartC;