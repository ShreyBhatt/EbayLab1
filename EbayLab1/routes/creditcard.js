var ejs = require("ejs");
var mysql = require('./mysql');
var log = require('./log');


/*function submit(request,res) {

    ejs.renderFile('./views/submit.ejs',function(err, result) {
// render on success
        if (!err) {
            res.end(result);
        }
// render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}*/

function validate(request,res) {

    var cardRegex=new RegExp("^4[0-9]{12}(?:[0-9]{3})?$","g");
    var expDateRegex=new RegExp("^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$","g");
    var CVVRegex=new RegExp("^[0-9]{3,4}$","g");
    var inputCVV = request.param("inputCVV");
    var inputExpDate = request.param("inputExpDate");
    var inputCardNo = request.param("inputCardNo");
if(CVVRegex.test(inputCVV) && cardRegex.test(inputCardNo) && expDateRegex.test(inputExpDate)){
    checkdata(request,res);
    log.log('info', request.session.username + " | CreditCard Validated | " + new Date().toString());

    res.render("paymentsuccess");}
    else{

    res.render('payment',{invalidcard:"Invalid information"});

}
}

function emptycart(request,res) {


    var query = "delete from cart where userid='"+request.session.userid+"'";
    console.log(query);

    mysql.execute(function(err,result){
        if(err){
            console.log("In error");
            throw err;
        }
        else
        {
            console.log("cart empty");
            //console.log(result);
            // res.send(JSON.stringify({result:result}));
        }
    },query);
}


function checkdata(request,res) {
// render on success



        console.log("Coming in newquery");

        var price=request.session.price;
        var quantity=request.session.quantity;
        var total= quantity*price;
        console.log(total);
        console.log(Date());


        var newquery = "insert into ebay.order(productname,quantity,price,total,date,userid) values ('"+request.session.productname+"','" + request.session.quantity+"','"+request.session.price+"','"+total+"','"+Date.now()+"','"+request.session.userid+"');";
        console.log(newquery);

        mysql.execute(function(err,result){
            if(err){
                console.log("In error");
                throw err;
            }
            else
            {
                console.log("inserted in order table");
                console.log(result);
                emptycart(request,res);

            }
        },newquery);



};
exports.checkdata=checkdata;
exports.validate=validate;
exports.emptycart=emptycart;


