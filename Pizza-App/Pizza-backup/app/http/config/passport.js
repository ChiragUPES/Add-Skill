const LocalStrategy=require('passport-local').Strategy
const User=require('../models/user_models');
const passhash=require('password-hash');


function init(passport){
    passport.use(new LocalStrategy({ usernameField:'email'},async (email,password,done)=>{
        // Login logic

        // check if mail exists
        const user=await User.findOne({email:email})
        if(!user)
        {
            return done(null,false,{message:'No user with this email'});
        }
        const ispass=passhash.verify(password,user.password);
        
        if(ispass){
            return done(null,user,{message:'Login Succesfully'})
        }
        else{
            return done(null,false,{message:'Wrong Password Or username'})

        }
        
        // .then(match=>{
        //     if(match){
        //         return done(null,user,{
        //             message:'Login Succesfully'
        //         })
        //     }
        //     return done(null,false,{
        //         message:'Wrong Password Or username'
        //     })
        // }).catch(err=>{
        //     return done(null,false,{
        //         message:'Something went wrong'
        //     })
        // })



    }))
    // stores user id in session
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    })
    passport.deserializeUser((id,done )=>{
        User.findById(id,(err,user)=>{
            done(err,user)
        })

    })

    
}

module.exports=init;