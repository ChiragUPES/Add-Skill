var express=require('express');
var ejs=require('ejs');
var path=require('path');

var app=express();

var PORT=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.render('home');
})
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/resources/views'));


app.listen(PORT,()=>{
    console.log('Listening..');
})