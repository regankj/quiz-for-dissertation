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
    const ageBox = document.getElementById('age');
    const genderBox = document.getElementById('Gender');
    const incomeBracketBox = document.getElementById('incomeBracket');
    var age = ageBox.options[ageBox.selectedIndex].text;
    var gender = genderBox.options[genderBox.selectedIndex].text;
    var income = incomeBracketBox.options[incomeBracketBox.selectedIndex].text;

    if (checkbox.checked == false){
      text.style.display = "block";
      text.style.color = "red";
    } else {
      uid++;
      localStorage.setItem("idKey", uid);
      saveUserData(uid, age, gender, income);
      text.style.display = "none";
      btn.type = "reset";
      ageBox.disabled = true;
      genderBox.disabled = true;
      incomeBracketBox.disabled = true;

    };
  });
};

var startTime;
var i = 0;

// functions to add horizontal bars and buttons

const qform = document.getElementById('questions');
var j = 1;
var k = 1;
var values = {};
var downBtns = {};
var upBtns = {};
var lgUpBtns = {};
var smUpBtns = {};
var smDownBtns = {};
var btns = {};
var options = {};

function addRow(slide){
  const newRow = document.createElement('div');
  newRow.className = "form-row my-md-3";
  slide.appendChild(newRow);
  const col = document.createElement('div');
  col.className = "col-md-6";
  newRow.appendChild(col);
};

function addBtns(slide){
  const btnCol = document.createElement('div');
  btnCol.className = "col-md-6";
  slide.append(btnCol);
  btnCol.style.display = "inline-block";
  var upBtn = document.createElement('button');
  var downBtn = document.createElement('button');
  var smUpBtn = document.createElement('button');
  var smDownBtn = document.createElement('button');
  upBtn.innerHTML = ">>";
  downBtn.innerHTML = "<<";
  smUpBtn.innerHTML = ">";
  smDownBtn.innerHTML = "<";
  upBtn.className = "upBtn";
  upBtn.id = "upBtn" + i + "_" + j;
  smUpBtn.className = "smUpBtn";
  smUpBtn.id = "smUpBtn" + i+ "_" + j;
  downBtn.className = "downBtn";
  downBtn.id = "downBtn" + i + "_" + j;
  smDownBtn.className = "smDownBtn";
  smDownBtn.id = "smDownBtn" + i + "_" + j;
  upBtn.type = "button";
  smUpBtn.type = "button";
  downBtn.type = "button";
  smDownBtn.type = "button";
  btnCol.appendChild(downBtn);
  btnCol.appendChild(smDownBtn);
  btnCol.appendChild(smUpBtn);
  btnCol.appendChild(upBtn);

  const barCol = document.createElement('div');
  var count = 20;
  barCol.className = "col-md-6";
  slide.appendChild(barCol);
  var bar = document.createElement('div');
  bar.className = "bar";
  bar.id = "bar" + i + "_" + j;
  barCol.appendChild(bar);
  bar.innerHTML = count + "%";
  bar.style.width = (count * 0.5) + "em";

  var downBtnID = "downBtn" + i + "_" + j;
  var smDownBtnID = "smDownBtn" + i + "_" + j;
  var smUpBtnID = "smUpBtn" + i + "_" + j;
  var upBtnID = "upBtn" + i + "_" + j;
  var barID = "bar" + i + "_" + j;
  var valueNum = "values" + i;
  var valPos = j-1;
  values[valueNum][valPos] = 20;
  var btnsNum = "btns" + i;
  btns[btnsNum].push(downBtnID, smDownBtnID, smUpBtnID, upBtnID);
  upBtns[btnsNum].push(smUpBtnID, upBtnID);
  downBtns[btnsNum].push(smDownBtnID, downBtnID);
  smDownBtns[btnsNum].push(smDownBtnID);
  smUpBtns[btnsNum].push(smUpBtnID);
  lgUpBtns[btnsNum].push(upBtnID);


  document.getElementById(downBtnID).addEventListener('click', function(){
    count = count - 10;
    document.getElementById(barID).innerHTML = count + "%";
    document.getElementById(barID).style.width = (count * 0.5) + "em";
    if (count <=0 ){
      document.getElementById(downBtnID).disabled = true;
      document.getElementById(smDownBtnID).disabled = true;
    }
    if (count < 10 ){
      document.getElementById(downBtnID).disabled = true;
    }
    var value = document.getElementById(barID).innerHTML;
    values[valueNum][valPos] = parseInt(value, 10);
  });

  document.getElementById(smDownBtnID).addEventListener('click', function(){
    count = count - 1;
    document.getElementById(barID).innerHTML = count + "%";
    document.getElementById(barID).style.width = (count * 0.5) + "em";
    if (count <=0 ){
      document.getElementById(downBtnID).disabled = true;
      document.getElementById(smDownBtnID).disabled = true;
    }
    if (count < 10 ){
      document.getElementById(downBtnID).disabled = true;
    }
    var value = document.getElementById(barID).innerHTML;
    values[valueNum][valPos] = parseInt(value, 10);
  });

  document.getElementById(smUpBtnID).addEventListener('click', function(){
    document.getElementById(downBtnID).disabled = false;
    document.getElementById(smDownBtnID).disabled = false;
    count = count + 1;
    document.getElementById(barID).innerHTML = count + "%";
    document.getElementById(barID).style.width = (count * 0.5) + "em";
    if (count < 10 ){
      document.getElementById(downBtnID).disabled = true;
    }
    var value = document.getElementById(barID).innerHTML;
    values[valueNum][valPos] = parseInt(value, 10);
  });

  document.getElementById(upBtnID).addEventListener('click', function(){
    document.getElementById(downBtnID).disabled = false;
    document.getElementById(smDownBtnID).disabled = false;
    count = count + 10;
    document.getElementById(barID).innerHTML = count + "%";
    document.getElementById(barID).style.width = (count * 0.5) + "em";
    if (count < 10 ){
      document.getElementById(downBtnID).disabled = true;
    }
    var value = document.getElementById(barID).innerHTML;
    values[valueNum][valPos] = parseInt(value, 10);
  });
  j++;
};

function addRads(slide){
  const radCol = document.createElement('div');
  radCol.className = "col-md-6";
  slide.append(radCol);
  radCol.style.display = "inline-block";
  var rad = document.createElement('input');
  rad.type = "radio";
  rad.className = "radio";
  rad.id = "radio" + k;
  radCol.appendChild(rad);
  var radID = "radio" + k;
  var radLbl = document.createElement("label");
  radLbl.className = "radLbl";
  radLbl.id = "radLbl" + k;
  radLbl.for = radID;
  radCol.appendChild(radLbl);
  var radLblID = "radLbl" + k;

  k++;
}

/*
loading in a csv file
code taken and adapted from https://stackoverflow.com/questions/29259938/how-to-load-csv-file-to-use-with-d3
accessed 12-07-20
*/
function readData(file, section){
  d3.csv(file).then(function(data){
    data.forEach(function(d){
      i++;

      var slide = document.createElement("div");
      var slideNo = 1;
      var currentSlideID = "slide" + slideNo;
      slide.className = "slide";
      slide.id = "slide" + i;
      var slideID = "#slide" + i;
      qform.appendChild(slide);

      var valuesNum = "values" + i;
      var btnsNum = "btns" + i;
      var optionsNum = "options" + i;

      var radA = "radio" + (1 + 5*(i-1));
      var radB = "radio" + (2 + 5*(i-1));
      var radX = "radio" + (3 + 5*(i-1));
      var radY = "radio" + (4 + 5*(i-1));
      var radZ = "radio" + (5 + 5*(i-1));

      var radLblA = "radLbl" + (1 + 5*(i-1));
      var radLblB = "radLbl" + (2 + 5*(i-1));
      var radLblX = "radLbl" + (3 + 5*(i-1));
      var radLblY = "radLbl" + (4 + 5*(i-1));
      var radLblZ = "radLbl" + (5 + 5*(i-1));

      d3.select(slideID).append("label").text(i + ". " + d.Question);
      addRow(slide);
      d3.select(slideID).append("label").text("Your Answer:");
      addRow(slide);

      addRads(slide);
      document.getElementById(radLblA).innerHTML = d.Option1;
      options[optionsNum].push(d.Option1);
      addRow(slide);

      addRads(slide);
      document.getElementById(radLblB).innerHTML = d.Option2;
      options[optionsNum].push(d.Option2);
      addRow(slide);

      if (d.Option3 != null){
        addRads(slide);
        document.getElementById(radLblX).innerHTML = d.Option3;
        options[optionsNum].push(d.Option3);
        addRow(slide);
      }

      if (d.Option4 != null){
        addRads(slide);
        document.getElementById(radLblY).innerHTML = d.Option4;
        options[optionsNum].push(d.Options4);
        addRow(slide);
      }

      if (d.Option5 != null){
        addRads(slide);
        document.getElementById(radLblZ).innerHTML = d.Option5;
        options[optionsNum].push(d.Options5);
        addRow(slide);
      }

      d3.select(slideID).append("label").text("What did the public think?:");
      addRow(slide);

      d3.select(slideID).append("label").text(d.Option1);
      addBtns(slide);
      addRow(slide);

      d3.select(slideID).append("label").text(d.Option2);
      addBtns(slide);
      addRow(slide);

      if (d.Option3 != null){
        d3.select(slideID).append("label").text(d.Option3);
        addBtns(slide);
        addRow(slide);
      }

      if (d.Option4 != null){
        d3.select(slideID).append("label").text(d.Option4);
        addBtns(slide);
        addRow(slide);
      }

      if (d.Option5 != null){
        d3.select(slideID).append("label").text(d.Option5);
        addBtns(slide);
        addRow(slide);
      }

      // end of referenced code

      var total = document.createElement("label");
      total.innerHTML = "Total: " + values[valuesNum].reduce((a,b) => a+b, 0) + "%";
      total.id = "total" + i;
      total.className = "total";
      slide.appendChild(total);
      addRow(slide);

      var confBtn = document.createElement('button');
      confBtn.innerHTML = "Confirm";
      confBtn.id = "confirm" + i;
      confBtn.className = "confirmBtn";
      slide.appendChild(confBtn);
      var conBtnID = "confirm" + i;

      var errText = document.createElement('label');
      errText.innerHTML = "*Bars must add up to 100%";
      errText.id = "errText" + i;
      errText.className = "errText";
      errText.style.display = "none";
      slide.appendChild(errText);
      var errTextID = "errText" + i;

      addRow(slide);

      var radErrText = document.createElement("label");
      radErrText.innerHTML = "*Please select your answer to the question";
      radErrText.id = "radErrText" + i;
      radErrText.className = "errText";
      radErrText.style.display = "none";
      slide.appendChild(radErrText);
      var radErrTextID = "radErrText" + i;

      addRow(slide);

      document.getElementById(radA).addEventListener('click', function(){
        document.getElementById(radB).checked = false;
        document.getElementById(radX).checked = false;
        document.getElementById(radY).checked = false;
        document.getElementById(radZ).checked = false;
      });
      document.getElementById(radB).addEventListener('click', function(){
        document.getElementById(radA).checked = false;
        document.getElementById(radX).checked = false;
        document.getElementById(radY).checked = false;
        document.getElementById(radZ).checked = false;
      });
      document.getElementById(radX).addEventListener('click', function(){
        document.getElementById(radA).checked = false;
        document.getElementById(radB).checked = false;
        document.getElementById(radY).checked = false;
        document.getElementById(radZ).checked = false;
      });
      document.getElementById(radY).addEventListener('click', function(){
        document.getElementById(radA).checked = false;
        document.getElementById(radB).checked = false;
        document.getElementById(radX).checked = false;
        document.getElementById(radZ).checked = false;
      });
      document.getElementById(radZ).addEventListener('click', function(){
        document.getElementById(radA).checked = false;
        document.getElementById(radB).checked = false;
        document.getElementById(radX).checked = false;
        document.getElementById(radY).checked = false;
      });


      for (var r = 0; r < btns[btnsNum].length; r++){
        document.getElementById(btns[btnsNum][r]).addEventListener("click", function(){
          total.innerHTML = "Total: " + values[valuesNum].reduce((a,b) => a+b, 0) + "%";
        });
      };

      for (var p = 0; p < upBtns[btnsNum].length; p++){
        document.getElementById(downBtns[btnsNum][p]).addEventListener("click", function(){
          if (values[valuesNum].reduce((a,b) => a+b, 0) >= 90){
            for (var q = 0; q < smUpBtns[btnsNum].length; q++){
              document.getElementById(smUpBtns[btnsNum][q]).disabled = false;
              document.getElementById(lgUpBtns[btnsNum][q]).disabled = true;
            }
          } else {
            for (var q = 0; q < upBtns[btnsNum].length; q++){
              document.getElementById(upBtns[btnsNum][q]).disabled = false;
            }
          }

          if (values[valuesNum].reduce((a,b) => a+b, 0) == 100){
            for (var n = 0; n < upBtns[btnsNum].length; n++){
              document.getElementById(upBtns[btnsNum][n]).disabled = true;
            }
          }
        })
        document.getElementById(upBtns[btnsNum][p]).addEventListener("click", function(){
          if (values[valuesNum].reduce((a,b) => a+b, 0) >= 100){
            for (var o = 0; o < upBtns[btnsNum].length; o++){
              document.getElementById(upBtns[btnsNum][o]).disabled = true;
            }
          } else if ( (values[valuesNum].reduce((a,b) => a+b, 0) > 90) && (values[valuesNum].reduce((a,b) => a+b, 0)) < 100){
              for (var l = 0; l < smUpBtns[btnsNum].length; l++){
              document.getElementById(smUpBtns[btnsNum][l]).disabled = false;
              document.getElementById(lgUpBtns[btnsNum][l]).disabled = true;
            }
          }
        });
      }

      if (values[valuesNum].reduce((a,b) => a+b, 0) == 100){
        for (var f= 0; f < upBtns[btnsNum].length; f++){
          document.getElementById(upBtns[btnsNum][f]).disabled = true;
        }
      };

      var questionNum = i;

      document.getElementById(conBtnID).addEventListener('click', function(){
        if ( values[valuesNum].reduce((a,b) => a+b, 0) != 100){
          document.getElementById(conBtnID).type = "button";
          document.getElementById(errTextID).style.display = "block";
        }
        else {
          nextBtn.disabled = false;
          document.getElementById(errTextID).style.display = "none";
          document.getElementById(conBtnID).disabled = true;
          writeData(uid, section, questionNum, options[optionsNum], values[valuesNum]);
          var endTime = Date.now();
          var difference = (endTime - startTime)/1000;
          saveTime(uid, section, questionNum, difference);
          for (var m = 0; m < btns[btnsNum].length; m++){
            document.getElementById(btns[btnsNum][m]).disabled = true;
          }
          document.getElementById(radA).disabled = true;
          document.getElementById(radB).disabled = true;
          document.getElementById(radX).disabled = true;
          document.getElementById(radY).disabled = true;
          document.getElementById(radZ).disabled = true;

          if (document.getElementById(radA).checked == true){
            var ans = document.getElementById(radLblA).innerHTML;
            writeAnswer(uid, section, questionNum, ans);
            document.getElementById(radErrTextID).style.display = "none";
          } else if (document.getElementById(radB).checked == true){
            var ans = document.getElementById(radLblB).innerHTML;
            writeAnswer(uid, section, questionNum, ans);
            document.getElementById(radErrTextID).style.display = "none";
          } else if (document.getElementById(radX).checked == true){
            var ans = document.getElementById(radLblX).innerHTML;
            writeAnswer(uid, section, questionNum, ans);
            document.getElementById(radErrTextID).style.display = "none";
          } else if (document.getElementById(radY).checked == true){
            var ans = document.getElementById(radLblY).innerHTML;
            writeAnswer(uid, section, questionNum, ans);
            document.getElementById(radErrTextID).style.display = "none";
          } else if (document.getElementById(radZ).checked == true){
            var ans = document.getElementById(radLblZ).innerHTML;
            writeAnswer(uid, section, questionNum, ans);
            document.getElementById(radErrTextID).style.display = "none";
          } else {
            document.getElementById(conBtnID).type = "button";
            document.getElementById(conBtnID).disabled = false;
            document.getElementById(radErrTextID).style.display = "block";
            document.getElementById(radA).disabled = false;
            document.getElementById(radB).disabled = false;
            document.getElementById(radX).disabled = false;
            document.getElementById(radY).disabled = false;
            document.getElementById(radZ).disabled = false;
          }
        }
      })
      j = 1;
      showSlide(currentSlideID, currentSlideID, slideNo, slide);
      nextBtn.addEventListener('click', function(){
        slideNo++;
        var nextSlide = "slide" + slideNo;
        showSlide(nextSlide, currentSlideID, slideNo, slide);
        currentSlideID = "slide" + slideNo;
      });
    })

  });
};


if ($('body').is('.quiz1')){
  readData("Sample-Data/sample.csv", "political");
  window.addEventListener('load', function(){
    startTime = Date.now();
  });
};

for (var num = 0; num < 3; num++){
  var v = "values" + (num + 1);
  var b = "btns" + (num + 1);
  var o = "options" + (num + 1);
  values[v] = [];
  btns[b] = [];
  downBtns[b] = [];
  upBtns[b] = [];
  smDownBtns[b] = [];
  smUpBtns[b] = [];
  lgUpBtns[b] = [];
  options[o] = []
};
/*
making one question appear at a time using slides
taken from https://www.sitepoint.com/simple-javascript-quiz/
accessed 14-09-20
*/

const nextBtn = document.getElementById('nextBtn');
function showSlide(n, currentSlideID, slideNo, slide){
  document.getElementById(currentSlideID).className = "slide";
  document.getElementById(n).className = "slide active-slide";
  if (slideNo == i){
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}


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

function writeData(uid, section, qcode, options, answers){
  for (var num = 0; num < answers.length; num++){
    var opt = options[num];
    var ans = answers[num];
    firebase.database().ref('/user' + uid + '/' + section + '/question' + qcode + '/guess_of_public/').set({
      opt: ans
    });
  }
};

function saveTime(uid, section, questionNum, time){
  firebase.database().ref('/user' + uid + '/' + section + '/question' + questionNum + '/timer/').set({
    Timer: time
  });
}

function writeAnswer(uid, section, questionNum, ans){
  firebase.database().ref('/user' + uid + '/' + section + '/question' + questionNum + '/their_answer/').set({
    answer: ans
  });
};

// function to save user details
function saveUserData(uid, age, gender, income){
  firebase.database().ref('/user' + uid + '/details/').set({
    age: age,
    gender: gender,
    income: income
  });
};
// end of referenced code
