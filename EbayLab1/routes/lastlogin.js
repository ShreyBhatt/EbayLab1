var mysql = require('./mysql');
var log = require('./log');



exports.lastlogin=function(request,res)
{

    var query="select username,lastlogin from user where username='"+request.session.username+"'";
    console.log(query);
    mysql.execute(function(err,results){
        if(err){
            console.log("error");                }
        else
        {

            log.log('info', request.session.username + " | Last Login Updated | " + new Date().toString());

            res.render("lastlogin.ejs",{result:results});
        }
    },query);


}