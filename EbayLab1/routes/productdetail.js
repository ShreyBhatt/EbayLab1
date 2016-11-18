var mysql = require('./mysql');
var log = require('./log');





exports.productdetail=function(request,res)

{

    var productid=request.param("productid");
    request.session.productid =productid;
    console.log("hello in productdetail" + productid);



    var query="select p.productname,p.description,p.price,p.quantity,p.shippingfrom,u.username from product p,user u where p.sellerid=u.userid and p.productid= '" + productid+"'" ;




    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            request.session.productname = results[0].productname;
            request.session.price = results[0].price;
            request.session.quantity = results[0].quantity;
           // request.session.productid = results[0].productid;
            console.log("hello product "+productid);



            log.log('info', request.session.username + " | Product Details | " + new Date().toString());


            console.log(results);
            res.render("productdetail.ejs",{result:results});

            //res.send(results);
        }
    },query);


}

exports.addcart = function(request, res){
    var price=request.session.price;
    var quantity=request.session.quantity;
    var total= quantity*price;
    console.log(total);
    var query = "Insert into cart(productid, productname, price, quantity, userid, total) values ('"+request.session.productid+"','"+request.session.productname+"','"+request.session.price+"','"+request.session.quantity+"','"+request.session.userid+"','"+total+"')";
    console.log(query);

    mysql.execute(function(err,results){
        if(err){
            console.log("In error");
            throw err;
        }
        else
        {
            console.log("product added");
            log.log('info', request.session.username + " | Product Added to cart | " + new Date().toString());

            console.log(results);
            res.render("shopping-cart");

        }
    },query);

    /*var query = "select sum(total) from cart where userid='" + request.session.userid + "'";
    console.log(query);

    mysql.execute(function(err,result){
        if(err){
            console.log("In error");
            throw err;
        }
        else
        {
            console.log("product added");
            console.log(result);
            res.send(JSON.stringify({result:result}));

        }
    },query);*/
};