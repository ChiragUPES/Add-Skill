function guest(req,res,next){
    if(!req.isAuthenticated())      // method of passport and can check user is loged in or not/
    {
        return next()

    }
    return res.redirect('/');
}
module.exports=guest;