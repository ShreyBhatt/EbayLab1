var ejs= require('ejs');
var mysql = require('mysql');
var log = require('./log');


function getConnectionwithoutpooling() {
var connection  = mysql.createConnection({
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    database        : 'ebay'
});
    return connection;
}



function executewithoutpooling(callback,sqlQuery){
    console.log("in executewithoutpooling");

    var connection = getConnectionwithoutpooling();

    console.log("got connection");

    connection.query(sqlQuery, function(err, rows, fields) {
        if (err) {
            console.log("ERROR: " + err.message);
        } else { // return err or result
            callback(err, rows);
        }
    });
    connection.end();

    console.log("\nConnection closed..");
}



exports.executewithoutpooling = executewithoutpooling;
