require('dotenv').config() ; // for .env file
var express=require('express');
var ejs=require('ejs');
var path=require('path');
const expressEjsLayouts = require('express-ejs-layouts');
const session=require('express-session');
const flash=require('express-flash');
const Mongodbstore = require('connect-mongo');  // It will create a session collecton the the db
const passport=require('passport');
var app=express();



app.use(express.json()); //btana hai kis type ka data hai
app.use(express.urlencoded({extended:false}));


var PORT=process.env.PORT || 3160;

app.use(express.static('public'));
app.use(expressEjsLayouts);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/resources/views'));



//DB connection
var mongoose = require('mongoose');

const url='mongodb+srv://Ram:ram@cluster0.mmnlc.mongodb.net/Pizza?retryWrites=true&w=majority'
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology: true,
useFindAndModify:true});

var connection = mongoose.connection;
// event handler
connection.once('open',()=>{
    console.log('Database Connected');
}).catch(err=>{
    console.log('Connection Falied'); 
});


// session store
// let mongoStore=new Mongodbstore({
//     // konse db se connection krna hai.. or konse collection se connect
//     mongooseConnection:connection,  // connectoin default db
//     collection:'sessions'        // create a collection of name sessions.
// })
// Session Config

 // konse db se connection krna hai.. or konse collection se connect
          // connectoin default db
        // create a collection of name sessions. 
          // al the sesion stores in this mongostore 

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized : false,
    cookie:{ maxAge:1000*60*60*24}  ,    // 24 hours in ms


      store:Mongodbstore.create({
          mongoUrl:'mongodb+srv://Ram:ram@cluster0.mmnlc.mongodb.net/Pizza?retryWrites=true&w=majority'
      }) 
    
}));

app.use(flash())

// Passport config after session config
const passportinit=require('./app/http/config/passport');
passportinit(passport);
app.use(passport.initialize())
app.use(passport.session())

// Global middleware used for setting the values in the session
app.use((req, res, next) => {
    res.locals.session = req.session    // session set ho jaega
    res.locals.user=req.user // login user set ho jaega

    next()
})



require('./routes/web')(app);


app.listen(PORT,()=>{
    console.log('Listening..');
})