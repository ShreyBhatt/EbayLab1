var ejs= require('ejs');
var mysql = require('./mysql');
var log = require('./log');

exports.postadvertise=function(request,res)
{
    console.log("in post advertise");
    log.log('info', request.session.username + " | Advertisement posted | " + new Date().toString());

    var productid=request.body.productid;

    var productname=request.body.productname;

    var quantity=request.body.quantity;
    var price=request.body.price;
    var description=request.body.description;
    var seller=request.body.seller;
    var shippingfrom=request.body.shippingfrom;

    var username1=request.body.username1;





    var dataEntry="insert into product(productid,productname,quantity,price,description,sellerid,shippingfrom) values('"+request.param("productid")+ "','"+request.param("productname")+ "','" + request.param("quantity") + "','" +request.param("price") + "','" + request.param("description")+"','" +request.session.userid + "','" +request.param("shippingfrom") + "');"

    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {

            console.log("done");
        }
    },dataEntry);

    console.log("inserted");
res.render("myadvertisement.ejs");



}

exports.displayadvertise=function(request,res)

{
    var username1=request.body.username1;


    var query="select * from product where product.sellerid='"+request.session.userid+"'";



    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            log.log('info', request.session.username + " | Display My Advertise | " + new Date().toString());

            res.send(results);
        }
    },query);

}

exports.displayalladvertise=function(request,res)

{
    var username1=request.body.username1;


    var query="select * from product where product.sellerid !='"+request.session.userid+"'";



    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {

            log.log('info', request.session.username + " | Display All Advertise | " + new Date().toString());

            res.send(results);
        }
    },query);

}