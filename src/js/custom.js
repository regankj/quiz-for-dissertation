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



// functions to add horizontal bars and buttons

const qform = document.getElementById('questions');
var j = 1;
var k = 1;
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
  var smUpBtn = document.createElement('button');
  var smDownBtn = document.createElement('button');
  upBtn.innerHTML = ">>";
  downBtn.innerHTML = "<<";
  smUpBtn.innerHTML = ">";
  smDownBtn.innerHTML = "<";
  upBtn.className = "upBtn";
  upBtn.id = "upBtn" + j;
  smUpBtn.className = "smUpBtn";
  smUpBtn.id = "smUpBtn" + j;
  downBtn.className = "downBtn";
  downBtn.id = "downBtn" + j;
  smDownBtn.className = "smDownBtn";
  smDownBtn.id = "smDownBtn" + j;
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
  qform.appendChild(barCol);
  var bar = document.createElement('div');
  bar.className = "bar";
  bar.id = "bar" + j;
  barCol.appendChild(bar);
  bar.innerHTML = count + "%";
  bar.style.width = (count * 0.5) + "em";

  var downBtnID = "downBtn" + j;
  var smDownBtnID = "smDownBtn" + j;
  var smUpBtnID = "smUpBtn" + j;
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
      document.getElementById(smDownBtnID).disabled = true;
    }
    if (count < 10 ){
      document.getElementById(downBtnID).disabled = true;
    }
    var value = document.getElementById(barID).innerHTML;
    values[valueNum] = parseInt(value, 10);
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
    values[valueNum] = parseInt(value, 10);
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
    values[valueNum] = parseInt(value, 10);
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
    values[valueNum] = parseInt(value, 10);
  });
  j++;
};

function addRads(){
  const radCol = document.createElement('div');
  radCol.className = "col-md-6";
  qform.append(radCol);
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
    var i = 0;
    data.forEach(function(d){
      i++;

      /*var slide = document.createElement("div");
      slide.className = "slide";
      slide.id = "slide" + i;
      var slideID = "slide" + i;
      qform.appendChild(slide);*/

      var a = "value" + (1 + 5*(i-1));
      var b = "value" + (2 + 5*(i-1));
      var x = "value" + (3 + 5*(i-1));
      var y = "value" + (4 + 5*(i-1));
      var z = "value" + (5 + 5*(i-1));

      var smDownA = "smDownBtn" + (1 + 5*(i-1));
      var smDownB = "smDownBtn" + (2 + 5*(i-1));
      var smDownX = "smDownBtn" + (3 + 5*(i-1));
      var smDownY = "smDownBtn" + (4 + 5*(i-1));
      var smDownZ = "smDownBtn" + (5 + 5*(i-1));

      var downA = "downBtn" + (1 + 5*(i-1));
      var downB = "downBtn" + (2 + 5*(i-1));
      var downX = "downBtn" + (3 + 5*(i-1));
      var downY = "downBtn" + (4 + 5*(i-1));
      var downZ = "downBtn" + (5 + 5*(i-1));

      var upA = "upBtn" + (1 + 5*(i-1));
      var upB = "upBtn" + (2 + 5*(i-1));
      var upX = "upBtn" + (3 + 5*(i-1));
      var upY = "upBtn" + (4 + 5*(i-1));
      var upZ = "upBtn" + (5 + 5*(i-1));

      var smUpA = "smUpBtn" + (1 + 5*(i-1));
      var smUpB = "smUpBtn" + (2 + 5*(i-1));
      var smUpX = "smUpBtn" + (3 + 5*(i-1));
      var smUpY = "smUpBtn" + (4 + 5*(i-1));
      var smUpZ = "smUpBtn" + (5 + 5*(i-1));

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

      d3.select('#questions').append("label").text(i + ". " + d.Question);
      addRow();
      d3.select('#questions').append("label").text("Your Answer:");
      addRow();

      addRads();
      document.getElementById(radLblA).innerHTML = d.Option1;
      addRow();

      addRads();
      document.getElementById(radLblB).innerHTML = d.Option2;
      addRow();

      addRads();
      document.getElementById(radLblX).innerHTML = d.Option3;
      addRow();

      addRads();
      document.getElementById(radLblY).innerHTML = d.Option4;
      addRow();

      addRads();
      document.getElementById(radLblZ).innerHTML = d.Option5;
      addRow();

      d3.select('#questions').append("label").text("What did the public think?:");
      addRow();

      d3.select('#questions').append("label").text(d.Option1);
      addBtns();
      addRow();

      d3.select('#questions').append("label").text(d.Option2);
      addBtns();
      addRow();

      d3.select('#questions').append("label").text(d.Option3);
      addBtns();
      addRow();

      d3.select('#questions').append("label").text(d.Option4);
      addBtns();
      addRow();

      d3.select('#questions').append("label").text(d.Option5);
      addBtns();
      addRow();

      var total = document.createElement("label");
      total.innerHTML = "Total: " + (values[a] + values[b] + values[x] + values[y] + values[z]) + "%";
      total.id = "total" + i;
      total.className = "total";
      qform.appendChild(total);
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

      var radErrText = document.createElement("label");
      radErrText.innerHTML = "*Please select your answer to the question";
      radErrText.id = "radErrText" + i;
      radErrText.className = "errText";
      radErrText.style.display = "none";
      qform.appendChild(radErrText);
      var radErrTextID = "radErrText" + i;

      addRow();

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

      var downBtns = [smDownA, smDownB, smDownX, smDownY, smDownZ, downA, downB, downX, downY, downZ];
      var upBtns = [smUpA, smUpB, smUpX, smUpY, smUpZ, upA, upB, upX, upY, upZ];

      var lgUpBtns = [upA, upB, upX, upY, upZ];
      var smUpBtns = [smUpA, smUpB, smUpX, smUpY, smUpZ];
      var smDownBtns = [smDownA, smDownB, smDownX, smDownY, smDownZ];

      var btns = [smDownA, smDownB, smDownX, smDownY, smDownZ, downA, downB, downX, downY, downZ,
                  smUpA, smUpB, smUpX, smUpY, smUpZ, upA, upB, upX, upY, upZ];

      for (var r = 0; r < btns.length; r++){
        document.getElementById(btns[r]).addEventListener("click", function(){
          total.innerHTML = "Total: " + (values[a] + values[b] + values[x] + values[y] + values[z]) + "%";
        });
      };

      for (var p = 0; p < upBtns.length; p++){
        document.getElementById(downBtns[p]).addEventListener("click", function(){
          if ((values[a] + values[b] + values[x] + values[y] + values[z]) >= 90){
            for (var q = 0; q < smUpBtns.length; q++){
              document.getElementById(smUpBtns[q]).disabled = false;
              document.getElementById(lgUpBtns[q]).disabled = true;
            }
          } else {
            for (var q = 0; q < upBtns.length; q++){
              document.getElementById(upBtns[q]).disabled = false;
            }
          }

          if ((values[a] + values[b] + values[x] + values[y] + values[z]) == 100){
            for (var n = 0; n < upBtns.length; n++){
              document.getElementById(upBtns[n]).disabled = true;
            }
          }
        })
        document.getElementById(upBtns[p]).addEventListener("click", function(){
          if ((values[a] + values[b] + values[x] + values[y] + values[z]) >= 100){
            for (var o = 0; o < upBtns.length; o++){
              document.getElementById(upBtns[o]).disabled = true;
            }
          } else if ( ((values[a] + values[b] + values[x] + values[y] + values[z]) > 90) &&
                      ((values[a] + values[b] + values[x] + values[y] + values[z]) < 100) ){
              for (var l = 0; l < smUpBtns.length; l++){
              document.getElementById(smUpBtns[l]).disabled = false;
              document.getElementById(lgUpBtns[l]).disabled = true;
            }
          }
        });
      }

      if ((values[a] + values[b] + values[x] + values[y] + values[z]) == 100){
        for (var f= 0; f < upBtns.length; f++){
          document.getElementById(upBtns[f]).disabled = true;
        }
      };

      var questionNum = i;

      document.getElementById(conBtnID).addEventListener('click', function(){
        if ( (values[a] + values[b] + values[x] + values[y] + values[z]) != 100){
          document.getElementById(conBtnID).type = "button";
          document.getElementById(errTextID).style.display = "block";
        }
        else {
          document.getElementById(errTextID).style.display = "none";
          document.getElementById(conBtnID).disabled = true;
          writeData(uid, section, questionNum, values[a],values[b], values[x], values[y], values[z]);
          for (var m = 0; m < btns.length; m++){
            document.getElementById(btns[m]).disabled = true;
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

    })

  });
};
// end of referenced code

if ($('body').is('.quiz1')){
  readData("Sample-Data/sample.csv", "political");
};


/*
making one question appear at a time using slides
taken from https://www.sitepoint.com/simple-javascript-quiz/
accessed 14-09-20

var slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementsByClassName('prevBtn');
const nextBtn = document.getElementsByClassName('nextBtn');
var currentSlide = 0;
console.log(slides[currentSlide])
function showSlide(n){
  slides[n].classList.add('active-slide');
  slides[currentSlide].classList.remove('active-slide');
  currentSlide = n;
  if (currentSlide === 0){
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
  if (currentSlide === slide.length - 1){
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

showSlide(currentSlide);
prevBtn.addEventListener('click', function(){
  showSlide(currentSlide - 1);
});
nextBtn.addEventListener('click', function(){
  showSlide(currentSlide + 1);
});
*/
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

function writeData(uid, section, questionNum, ans1, ans2, ans3, ans4, ans5){
  firebase.database().ref('/user' + uid + '/' + section + '/question' + questionNum + '/guess_of _public/').set({
    agree: ans1,
    slightly_agree: ans2,
    neither: ans3,
    slightly_disagree: ans4,
    disagree: ans5
  });
};

function writeAnswer(uid, section, questionNum, ans){
  firebase.database().ref('/user' + uid + '/' + section + '/question' + questionNum + '/their_answer/').set({
    answer: ans
  });
} ;

// function to save user details
function saveUserData(uid, age, gender, income){
  firebase.database().ref('/user' + uid + '/details/').set({
    age: age,
    gender: gender,
    income: income
  });
};
// end of referenced code
