var mysql = require('./mysql');
var log = require('./log');


exports.getcart = function(req, res){

    var query = "select * from cart where userid='"+req.session.userid+"'";
    mysql.execute(function(err,results){
        if(err){
            console.log("In error");
            throw err;
        }
        else{
            console.log("In getcart node");
            console.log(results);
            req.session.cartid=results[0].cartid;



            res.send(results);
        }
    },query);

};


exports.cart=function(req,res){
    log.log('info', req.session.username + " | Shopping Cart | " + new Date().toString());

    res.render("shopping-cart");
};

exports.remove = function(req, res){

    var query = "delete from cart where cartid='"+req.session.cartid+"'";
    mysql.execute(function(err,results){
        if(err){
            console.log("In error");
            throw err;
        }
        else{
            log.log('info', req.session.username + " | Item Removed from cart | " + new Date().toString());

            console.log("In getcart node");
            console.log(results);
            res.render("shopping-cart");
        }
    },query);

};

