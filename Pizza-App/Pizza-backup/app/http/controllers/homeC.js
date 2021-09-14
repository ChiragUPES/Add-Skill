const Menu=require('../models/menu_model');
function homeC(){
    // factory method 
    // return object
    // fetch the data from database and send to the home page so that we can fetch data

    // this is just like key value ..index is key

    return {    
        
        index(req,res){             // after fetching .then executes..promises      
            Menu.find().then(function(pizzasdata){      // pizzasdata backend se data aaye 
                console.log(pizzasdata);
                return res.render('home',{pizzas:pizzasdata});      // pizzas jo home page par jaegya.. arrays of object 
            })
        }

    }
}

module.exports=homeC;