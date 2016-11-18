var ejs= require('ejs');
var mysql = require('./mysql');
var log = require('./log');




exports.checkUsername=function (request,response){
    var username=request.body.username;

    var emailQuery="select Username from user where Username='" + username + "'";
    console.log(emailQuery);
    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if (results.length>0)
            {
                response.send({'statusCode':401});
                console.log(results);
            }
            else
            {
                response.send({'statusCode':200});
            }
        }
    },emailQuery);


}

exports.checkEmail=function (request,response){
    var email1=request.body.email1;

var emailQuery="select Email from user where Email='" + email1 + "'";
    console.log(emailQuery);
    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if (results.length>0)
            {
                response.send({'statusCode':401});
            }
            else
            {
                response.send({'statusCode':200});
            }
        }
    },emailQuery);


}
