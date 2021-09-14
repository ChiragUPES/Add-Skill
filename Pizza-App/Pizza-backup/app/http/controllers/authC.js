const User=require('../models/user_models');
const passhash=require('password-hash');
const passport = require('passport');

function authC(){
    return {
        login(req,res){
            res.render('auth/login');
        },
        postlogin(req,res,next){
            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message);
                    return next(err);
                }
                if(!user)
                {
                    req.flash('error',info.message);
                    return res.redirect('/login');
                }
                req.logIn(user,(err)=>{

                    if(err)
                    {
                        req.flash('error',info.message);
                        return next(err);
                    }
                    return res.redirect('/');
                })

                
            })(req,res,next)
        },
        register(req,res){
            res.render('auth/register');
        },

         postregister(req,res){
            const{name,email,password}=req.body;
            console.log(req.body);
            // validate
            if(!name || !email || !password)
            {
                req.flash('error','All fields are required');
                req.flash('name',name)
                req.flash('email',email)
               return res.redirect('/register')
            }

            // check email 
            User.exists({email: email},(err,result)=>{
                if(result){
                    req.flash('error','Users Exists');
                    req.flash('name',name)
                    req.flash('email',email)
                    return res.redirect('/register');
                }
            })
            // hash password Bcrypt password
            const hashpass=passhash.generate(password);

            // create user
            const user=new User({
                name:name,
                email:email,
                password:hashpass
            })
            user.save().then((user)=>{
                return res.redirect('/');

            }).catch(err=>{
                req.flash('error','Something went wrong');
                    return res.redirect('/register');

            })


        },
        logout(req,res){
            req.logout();   // in passport
            return res.redirect('/login');
        }
    }
}
module.exports=authC;


