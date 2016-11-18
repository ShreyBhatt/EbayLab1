var mysql = require('./mysql');
var log = require('./log');
var bid = require('./biddinglog');





exports.bidproductdetail=function(request,res)

{

    var bidproductid=request.param("bidproductid");
    var bidproductname=request.param("bidproductname");

    request.session.bidproductid =bidproductid;
    console.log("hello in bidproductdetail" + bidproductid);



    var query="select b.bidproductname,b.biddescription,b.bidprice,b.bidshippingfrom,u.username from bid b,user u where b.bidsellerid=u.userid and b.bidproductid= '" + bidproductid+"'" ;




    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            request.session.bidproductname = results[0].bidproductname;
            request.session.bidprice = results[0].bidprice;
            // request.session.productid = results[0].productid;
            console.log("hello bidproduct "+bidproductid);



            //log.bid('info', request.session.username + " | Product Details | " + new Date().toString());

            bid.log('info', request.session.username +request.session.bidproductname +request.session.bidprice+ " | Viewed Item | " + new Date().toString());

            console.log(results);
            res.render("bidproductdetail.ejs",{result:results});

            //res.send(results);
        }
    },query);


}
