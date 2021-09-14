
var homeC=require('../app/http/controllers/homeC');
var loginC=require('../app/http/controllers/authC');
var cartC=require('../app/http/controllers/coustmers/cartC');
const guest=require('../app/http/middlewares/guest');
const order=require('../app/http/controllers/coustmers/orderC');
const auth=require('../app/http/middlewares/auth');
const AdminOrderController=require('../app/http/controllers/admin/orderController');

const admin=require('../app/http/middlewares/admin');

function initRoutes(app){
    app.get('/',homeC().index);
    // (req,res)=>{
    //     res.render('home');
    // }
    app.get('/cart',cartC().cart);
    app.get('/customer/orders',auth,order().index);
    app.post('/update-cart',cartC().update);
    
    app.get('/login',guest,loginC().login);
    app.post('/login',loginC().postlogin);
    // (req,res)=>{
    //     res.render('auth/login');
    // })

    
    app.get('/register',guest,loginC().register);       // middleware if user logged in or not
    app.post('/register',loginC().postregister);
    app.post('/logout',loginC().logout);

    // Customer Routes
    app.post('/orders',auth,order().store);
    app.get('/customer/orders',auth,order().index);

    // Admin Routes
    app.get('/admin/orders',admin,AdminOrderController().index);

    

    
}

module.exports=initRoutes;