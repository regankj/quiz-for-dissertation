/*
Function to create a database
Taken from https://www.w3schools.com/nodejs/nodejs_mysql_create_db.asp
Accessed 08-07-20
*/

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  port: "3000",
  user: "regan",
  password: "mypassword",
});

con.connect(function(err){
  if (err) throw err;
  console.log("Connected");
  con.query("CREATE DATABASE dbase", function(err, result){
    if (err) throw err;
    console.log("DB created");
  });
});
