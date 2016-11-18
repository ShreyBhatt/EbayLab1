var ejs= require('ejs');
var mysql = require('./mysql');
var log = require('./log');
var moment = require('moment');
var bid = require('./biddinglog');




exports.postbid=function(request,res)
{
    console.log("in post bid");
    //bid.log('info', request.session.username + " | Bid posted | " + new Date().toString());
    var start=Date.now();
    var end=start+345600000;


    var dataEntry="insert into bid(bidproductid,bidproductname,bidprice,biddescription,bidsellerid,bidshippingfrom,bidstarttime,bidendtime,isBidEnded) values('"+request.param("bidproductid")+ "','"+request.param("bidproductname")+ "','"  +request.param("bidprice") + "','" + request.param("biddescription")+"','" +request.session.userid + "','" +request.param("bidshippingfrom") + "','" +start + "','" +end + "','" +0 + "');"

    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {

            bid.log('info', request.session.username +request.session.bidproductname +request.session.bidprice+ " | Bid Posted | " + new Date().toString());

                console.log("done");
        }
    },dataEntry);

    console.log("inserted");
    res.render("mybids.ejs");



}

exports.displaybid=function(request,res)

{
    var username1=request.body.username1;


    var query="select * from bid where bid.bidsellerid='"+request.session.userid+"'";



    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            bid.log('info', request.session.username + " | Display My Bids| " + new Date().toString());

            res.send(results);
        }
    },query);

}

exports.displayallbid=function(request,res)

{
    var username1=request.body.username1;


    var query="select * from bid where bid.bidsellerid !='"+request.session.userid+"'";


    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {

            bid.log('info', request.session.username + " | Display All Bids| " + new Date().toString());
            request.session.bidproductid=results[0].bidproductid;

            res.send(results);
        }
    },query);

}

exports.allbidpage=function(request,res)
{

    res.render('allbids.ejs',{invalid:""});

}



exports.bidding=function(request,res)
{
    var bidprice=request.body.bidprice;
    var json_response;


    console.log(bidprice);
    var dataEntry="update bid set bidprice="+bidprice+ ", bidderid= "+request.session.userid+ " where bidproductid="+request.session.bidproductid+";";
        console.log(dataEntry);
    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            /*json_response = {"statusCode": 200};
            res.send(json_response);*/
            bid.log('info', request.session.username +request.session.bidproductname +request.session.bidprice+ " | Has Bidded | " + new Date().toString());

            //alert("Congratulations!!!Your Bid Has Been Placed!!!")
            res.render("allbids");

        }
    },dataEntry);


    var dataEntrynew="insert into biddinghistory(userid,productid,productname,time,price,isBidEnded) values('"+request.session.userid+ "','" + request.session.bidproductid+ "','" + request.session.bidproductname+"','" +Date.now()+"','"+ request.session.bidprice+"','"+0+"');";
    console.log(dataEntrynew);
    mysql.execute(function(err,results){
        if(err){
            throw err;
        }
        else
        {
console.log("BiddingHistory Updated");
        }
    },dataEntrynew);



}


