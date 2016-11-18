var ejs= require('ejs');
var mysql = require('./mysql');
var log = require('./log');
var moment = require('moment');
var bid = require('./biddinglog');



setInterval(function (request,res)
{
    var query="select * from bid where isBidEnded=0;";
    mysql.execute(function (err,results)
    {
        if(err)
        {
            throw err;
        }
        else
        {
            if(results)
            {
                for(var i=0;i<results.length;i++)
                {
                    if((Date.now()/1000)>results[i].bidendtime)


                    {

                        bid.log('info', request.session.username +"" +request.session.bidproductname +""+request.session.bidprice+ " | Bid Has been Completed | " + new Date().toString());
                        bid.log('info', request.session.username +"" +request.session.bidproductname +""+request.session.bidprice+ " |  Has Won The Bid | " + new Date().toString());

                        console.log("The Bid has been ended for the Product:"+results[i].bidproductid);
                        closetheBid(results[i].bidproductid);
                        addOrder(results[i].bidproductid);

                    }
                    else
                    {

                        console.log("The Bid is still under progress for: "+results[i].bidproductid);
                    }
                }
            }
        }
    },query);
},10000);

function closetheBid(bidproductid)
{
    var query="update bid set isBidEnded=1 where bidproductid='"+bidproductid+"'";
    mysql.execute(function (err,results)
    {
        if(err)
        {
            throw err;
        }
        else
        {
            bid.log('info', request.session.username +""+request.session.bidproductname +""+request.session.bidprice+ " | Bid Has been Ended | " + new Date().toString());

            console.log("Update the isBidEnded");
        }
    },query);
}

function addOrder(bidproductid)
{
    var query="select * from ebay.bid where bidproductid='"+bidproductid+"' having max(bidprice)";
    mysql.execute(function (err,results)
    {
        if(err)
        {
            throw err;
        }
        else
        {
            console.log(results[0]);

            if(results[0])
            {
                var date = moment().format('YYYY-MM-DD');
                var Query = "insert into ebay.order(userid,productneme,quantity,price,total,date) values('" + results[0].bidderid + "','" + results[0].bidproductname +"','"+1+"','"+results[0].bidprice+"','"+ results[0].bidprice + "','" + date + "');";
                mysql.execute(function (err, resultsnew) {
                    if (err)
                        throw err;
                    else
                    {
                        if (resultsnew)
                        {
                        }
                    }
                }, Query);
            }
        }
    },query);
}

