import * as d3 from 'd3';

// Function to make sure Privacy Statement is accepted
document.getElementById('continue').addEventListener('click', function(){
  const checkbox = document.getElementById('check');
  var text = document.getElementById('checkError');
  const btn = document.getElementById('continue');
  const infoForm = document.getElementById('infoForm');
  if (checkbox.checked == false){
    text.style.display = "block";
    text.style.color = "red";
  } else {
    text.style.display = "none";
    btn.type = "submit";
    infoForm.action = "quiz.html";
  }
})

// reading the csv into the webpage
const qform = document.getElementById('questions');
d3.csv("Sample-Data/sample.csv").then(function(data){
  console.log(data[1]);
});

// connecting to the database
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "regan",
  password: "mypassword",
  database: "dbase"
});
