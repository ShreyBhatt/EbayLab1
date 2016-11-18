var log = require('./log');
var mysql = require('./mysql');



exports.payment=function(request,res)
{

       /* var getcartitems = request.param("getcartitems");

        for(i=0;i<getcartitems.length;i++){
            var query="Update cart set quantity='"+getcartitems[i].quantity+"', total='"+getcartitems[i].total+"' where productid='"+getcartitems[i].productid+"' and cartid='"+getcartitems[i].cartid+"'";
            mysql.execute(function(err,results){
                if(err){
                    console.log("In error");
                    throw err;
                }
                else{
                    console.log("Quantity updated");

                }
            },query);}*/



    res.render('payment.ejs',{invalidcard:""});

}