var ejs= require('ejs');
var mysql = require('./mysql');
var moment = require('moment');
var bcrypt=require('bcrypt-nodejs');
var log = require('./log');


var mysqlwithoutpooling = require('./mysqlwithoutpooling');
var winston = require("winston/lib/winston/common.js");



exports.checkRegister=function(request,res)
{
    //console.log("in check login");
    var username=request.body.username;

    var email1=request.body.email1;
    var password1=request.body.password1;
    var encrypt=bcrypt.hashSync(password1);


    var dataEntry="insert into user(username,email,password,birthdate,location,contact,lastlogin) values('"+request.param("username")+ "','" + request.param("email1") + "','" +encrypt + "','" + request.param("birthdate") + "','" +request.param("location")+ "','" +request.param("contact")+"','" +moment().format('YYYY-MM-DD H:mm:ss')+"');"
console.log(dataEntry);
    mysql.execute(function(err,results){
            if(err){
                throw err;
            }
            else
            {       log.log('info', request.session.username + " | Registration Completed | " + new Date().toString());

                console.log("inserted");

            }
        },dataEntry);



res.render('login.ejs',{invalid:""});

}

       exports.checkLogin= function (request,res)
        {
            var password1=request.body.password;
            console.log(password1);

            var getUser="select * from user where username='"+request.param("username1")+"';";
                console.log(getUser);
            mysql.execute(function(err,results){
                if(err){
                    throw err;
                }
                else
                {
                    console.log(results[0]);
                    if(results.length > 0){

                        if(bcrypt.compareSync(password1,results[0].password)) {

                            console.log("will renderfile");

                            console.log(moment().format('LLLL'));

                            request.session.username = results[0].username;
                            request.session.userid = results[0].userid;
                            console.log(request.session.userid);
                            log.log('info', request.session.username + " | Successfully Logged In | " + new Date().toString());

                            res.render('homepage');
                        }
                    }
                    else {

                        res.render('login',{invalid:"Invalid Username or password"});


                    }
                }
            },getUser);




        }


exports.signout=function(request,res)
{

    var query="update user set lastlogin='"+moment().format('YYYY-MM-DD H:mm:ss') +"' where username='"+request.session.username+"'";
    console.log(query);
    mysql.execute(function(err,results){
        if(err){
            console.log("last login not updated");                }
        else
        {
            console.log("last login updated");
        }
    },query);
    log.log('info', request.session.username + " | Sign Out | " + new Date().toString());

    request.session.reset();
    res.redirect('/');

    console.log("session reset");


    res.render('login.ejs',{invalid:""});

}


exports.createacc=function(request,res)
{
    log.log('info', request.session.username + " | Redirect to Registration Page | " + new Date().toString());

    res.render('login.ejs',{invalid:""});

}



