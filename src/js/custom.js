const d3 = require('d3');


// Function to make sure Privacy Statement is accepted
const contBtn = document.getElementById('continue');
var uid = localStorage.getItem("idKey");
if (contBtn){
  contBtn.addEventListener('click', function(){
    const checkbox = document.getElementById('check');
    var text = document.getElementById('checkError');
    const btn = document.getElementById('continue');
    const infoForm = document.getElementById('infoForm');
    const dob = document.getElementById('DOB').value;
    const genderBox = document.getElementById('Gender');
    const incomeBracketBox = document.getElementById('incomeBracket');
    var gender = genderBox.options[genderBox.selectedIndex].text;
    var income = incomeBracketBox.options[incomeBracketBox.selectedIndex].text;

    if (checkbox.checked == false){
      text.style.display = "block";
      text.style.color = "red";
    } else {
      uid++;
      localStorage.setItem("idKey", uid);
      text.style.display = "none";
      btn.type = "submit";
      infoForm.action = "quiz.html";
      saveUserData(uid, dob, gender, income);
    };
  });
};


// functions to add horizontal bars and buttons

const qform = document.getElementById('questions');
var j = 1;
var values = {};

function addRow(){
  const newRow = document.createElement('div');
  newRow.className = "form-row my-md-3";
  qform.appendChild(newRow);
  const col = document.createElement('div');
  col.className = "col-md-6";
  newRow.appendChild(col);
};

function addBtns(){
  const btnCol = document.createElement('div');
  btnCol.className = "col-md-6";
  qform.append(btnCol);
  btnCol.style.display = "inline-block";
  var upBtn = document.createElement('button');
  var downBtn = document.createElement('button');
  upBtn.innerHTML = "&#8250";
  downBtn.innerHTML = "&#8249";
  upBtn.className = "upBtn";
  upBtn.id = "upBtn" + j;
  downBtn.className = "downBtn";
  downBtn.id = "downBtn" + j;
  upBtn.type = "button";
  downBtn.type = "button";
  btnCol.appendChild(downBtn);
  btnCol.appendChild(upBtn);

  const barCol = document.createElement('div');
  var count = 20;
  barCol.className = "col-md-6";
  qform.appendChild(barCol);
  var bar = document.createElement('div');
  bar.className = "bar";
  bar.id = "bar" + j;
  barCol.appendChild(bar);
  bar.innerHTML = count + "%";
  bar.style.width = (count * 0.5) + "em";

  var downBtnID = "downBtn" + j;
  var upBtnID = "upBtn" + j;
  var barID = "bar" + j;
  var valueNum = "value" + j;
  values[valueNum] = 20;



  document.getElementById(downBtnID).addEventListener('click', function(){
    count = count - 10;
    document.getElementById(barID).innerHTML = count + "%";
    document.getElementById(barID).style.width = (count * 0.5) + "em";
    if (count <=0 ){
      document.getElementById(downBtnID).disabled = true;
    }
    var value = document.getElementById(barID).innerHTML;
    values[valueNum] = parseInt(value, 10);
  });

  document.getElementById(upBtnID).addEventListener('click', function(){
    document.getElementById(downBtnID).disabled = false;
    count = count + 10;
    document.getElementById(barID).innerHTML = count + "%";
    document.getElementById(barID).style.width = (count * 0.5) + "em";
    var value = document.getElementById(barID).innerHTML;
    values[valueNum] = parseInt(value, 10);
  });
  j++;
};



/*
loading in a csv file
code taken and adapted from https://stackoverflow.com/questions/29259938/how-to-load-csv-file-to-use-with-d3
accessed 12-07-20
*/
d3.csv("Sample-Data/sample.csv").then(function(data){
  var i = 0;
  data.forEach(function(d){
    i++;
    d3.select("#questions").append("label").text(i + ". " + d.Question);
    addRow();

    d3.select("#questions").append("label").text(d.Option1);
    addBtns();
    addRow();

    d3.select("#questions").append("label").text(d.Option2);
    addBtns();
    addRow();

    d3.select("#questions").append("label").text(d.Option3);
    addBtns();
    addRow();

    d3.select("#questions").append("label").text(d.Option4);
    addBtns();
    addRow();

    d3.select("#questions").append("label").text(d.Option5);
    addBtns();
    addRow();

    var confBtn = document.createElement('button');
    confBtn.innerHTML = "Confirm";
    confBtn.id = "confirm" + i;
    confBtn.className = "confirmBtn";
    qform.appendChild(confBtn);
    var conBtnID = "confirm" + i;

    var errText = document.createElement('label');
    errText.innerHTML = "*Bars must add up to 100%";
    errText.id = "errText" + i;
    errText.className = "errText";
    errText.style.display = "none";
    qform.appendChild(errText);
    var errTextID = "errText" + i;

    addRow();

    var a = "value" + (1 + 5*(i-1))
    var b = "value" + (2 + 5*(i-1))
    var x = "value" + (3 + 5*(i-1))
    var y = "value" + (4 + 5*(i-1))
    var z = "value" + (5 + 5*(i-1))

    var questionNum = i;

    document.getElementById(conBtnID).addEventListener('click', function(){
      var errText = document.createElement
      if ( (values[a] + values[b] + values[x] + values[y] + values[z]) != 100){
        document.getElementById(conBtnID).type = "button";
        document.getElementById(errTextID).style.display = "block";
      }
      else {
        document.getElementById(errTextID).style.display = "none";
        document.getElementById(conBtnID).type = "button";
        writeData(uid, questionNum, values[a],values[b], values[x], values[y], values[z]);
      }
    })

  })

});
// end of referenced code


/*
Instructions for integrating firebase
taken from https://firebase.google.com/docs/database/web/start
accessed 20-07-20
*/
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAb97M-9bRLRIfFDaLuqLbGAGoEHuZGB5Y",
  authDomain: "quiz-for-dissertation.firebaseapp.com",
  databaseURL: "https://quiz-for-dissertation.firebaseio.com",
  projectId: "quiz-for-dissertation",
  storageBucket: "quiz-for-dissertation.appspot.com",
  messagingSenderId: "461944864856",
  appId: "1:461944864856:web:35aa76bfb075f6c2d88a2d",
  measurementId: "G-9XT7JWZZ72"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// end of referenced code


/*
function to write data to the database
taken from https://firebase.google.com/docs/database/web/read-and-write
accessed 21-07-20
*/
function writeData(uid, questionNum, ans1, ans2, ans3, ans4, ans5){
  firebase.database().ref('/user' + uid + '/question' + questionNum + '/').set({
    agree: ans1,
    slightly_agree: ans2,
    neither: ans3,
    slightly_disagree: ans4,
    disagree: ans5
  });
};
// end of referenced code


// function to save user details
function saveUserData(uid, dob, gender, income){
  firebase.database.ref('/user'+ uid).set({
    id: uid,
    dob: dob,
    gender: gender,
    income: income
  });
};
