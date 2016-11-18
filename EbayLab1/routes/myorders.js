var ejs= require('ejs');
var mysql = require('./mysql');
var log = require('./log');


exports.displayorders=function(request,res)

{


    var query="select * from ebay.order where userid='"+request.session.userid+"'";
    console.log(query);



    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            console.log("Display Orders");
            for(var i=0;i<results.length;i++)
            {
                results[i].date=new Date(Number(results[i].date)).toDateString();
            }
            log.log('info', request.session.username + " | Display Orders | " + new Date().toString());

            res.send(results);
        }
    },query);

}