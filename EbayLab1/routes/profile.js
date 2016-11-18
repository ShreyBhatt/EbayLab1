var mysql = require('./mysql');
var ejs= require('ejs');
var log = require('./log');



exports.ProfilePage=function(request,res)

{



    console.log("hello"+ request.session.userid);
    var query="select * from user where username='"+request.session.username+"';";

 console.log(query);

    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            log.log('info', request.session.username + " | User Profile | " + new Date().toString());

            console.log(results);
            res.render("ProfilePage.ejs",{result:results});
        }
    },query);

};