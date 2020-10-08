const d3 = require('d3');


// Function to make sure Privacy Statement is accepted
const contBtn = document.getElementById('continue');
var uid = localStorage.getItem("idKey");
if (contBtn){
  contBtn.addEventListener('click', function(){
    const infoForm = document.getElementById('infoForm');
    const ageBox = document.getElementById('age');
    const genderBox = document.getElementById('Gender');
    const classBox = document.getElementById('classSurvey');
    var age = ageBox.options[ageBox.selectedIndex].text;
    var gender = genderBox.options[genderBox.selectedIndex].text;
    var classBracket = classBox.options[classBox.selectedIndex].text;

    if (age == "Choose..." || gender == "Choose..." || classBracket == "Choose..."){
      document.getElementById("infoErr").style.display = "inline-block";
      ageBox.disabled = false;
      genderBox.disabled = false;
      classBox.disabled = false;
    } else {
      uid++;
      localStorage.setItem("idKey", uid);
      saveUserData(uid, age, gender, classBracket);
      ageBox.disabled = true;
      genderBox.disabled = true;
      classBox.disabled = true;
      contBtn.disabled = true;
      document.getElementById("infoErr").style.display = "none";
      document.getElementById("formNext").disabled = false;
    }

  });
};

var t1 = 0;
var testValues = [];

// political knowledge test section
if ($('body').is(".knowledge")){
  var noPaper = document.getElementById('noPaper');
  var yesPaper = document.getElementById('yesPaper');
  var yesSite = document.getElementById('yesNewsSite');
  var noSite = document.getElementById('noNewsSite');
  var yesTV = document.getElementById('yesTV');
  var noTV = document.getElementById('noTV');
  var testForm = document.getElementById('test');

  noPaper.addEventListener('click', function(){
    yesPaper.checked = false;
    testValues[0] = "No";
    document.getElementById('whatPaper').style.display = "none";
  });

  yesPaper.addEventListener('click', function(){
    noPaper.checked = false;
    testValues[0] = "Yes";
    document.getElementById('whatPaper').style.display = "block";
  })

  yesSite.addEventListener('click', function(){
    noSite.checked = false;
    testValues[2] = "Yes";
    document.getElementById('whichNewsSite').style.display = "block";
  })

  noSite.addEventListener('click', function(){
    yesSite.checked = false;
    testValues[2] = "No";
    document.getElementById('whichNewsSite').style.display = "none";
  })

  yesTV.addEventListener('click', function(){
    noTV.checked = false;
    testValues[4] = "Yes";
    document.getElementById('whichTV').style.display = "block";
  })

  noTV.addEventListener('click', function(){
    yesTV.checked = false;
    testValues[4] = "No";
    document.getElementById('whichTV').style.display = "none";
  })

  d3.csv('Sample-Data/test.csv').then(function(data){
    data.forEach(function(d){
      t1++;


      var radLblA = "radLblForTest" + (1 + 4*(t1 - 1));
      var radLblB = "radLblForTest" + (2 + 4*(t1 - 1));
      var radLblC = "radLblForTest" + (3 + 4*(t1 - 1));
      var radLblD = "radLblForTest" + (4 + 4*(t1 - 1));

      var radA = "radForTest" + (1 + 4*(t1 - 1));
      var radB = "radForTest" + (2 + 4*(t1 - 1));
      var radC = "radForTest" + (3 + 4*(t1 - 1));
      var radD = "radForTest" + (4 + 4*(t1 - 1));

      var testRads = [radA, radB, radC, radD];
      var testRadLbls = [radLblA, radLblB, radLblC, radLblD];

      d3.select('#test').append("label").text(d.Question);
      addRow(testForm);

      addTestRads(test);
      document.getElementById(radLblA).innerHTML = d.Option1;

      addTestRads(test);
      document.getElementById(radLblB).innerHTML = d.Option2;
      addRow(testForm);

      addTestRads(test);
      document.getElementById(radLblC).innerHTML = d.Option3;

      addTestRads(test);
      document.getElementById(radLblD).innerHTML = d.Option4;
      addRow(testForm);

      for (var t2 = 0; t2 < testRads.length; t2++){
        document.getElementById(testRads[t2]).addEventListener('click', function(){
          var theRad = this;
          var str = theRad.id;
          var radNum = parseInt(str.substr(10), 10);
          var ind = Math.floor((radNum/4.1)) + 6;
          var newStr = str.replace("rad", "radLbl");
          testValues[ind] = document.getElementById(newStr).innerHTML;
          for (var t3 = 0; t3 < testRads.length; t3++){
            if (theRad != document.getElementById(testRads[t3])){
              document.getElementById(testRads[t3]).checked = false;
            }
          }
        });
        document.getElementById(testRadLbls[t2]).addEventListener('click', function(){
          var theRadLbl = this;
          var str = theRadLbl.id;
          var newStr = str.replace("radLbl", "rad");
          var activeRad = document.getElementById(newStr);
          activeRad.checked = true;
          for (var t5 = 0; t5 < testRads.length; t5++){
            if (activeRad != document.getElementById(testRads[t5])){
              document.getElementById(testRads[t5]).checked = false;
            }
          }
        })
      };


    });
    var alertInput = document.createElement("input");
    alertInput.type = "text";
    alertInput.className = "form-control";
    alertInput.id = "alertInput";
    testForm.appendChild(alertInput);
    alertInput.style.display = "none";

    var testBtn = document.createElement("button");
    testBtn.type = "button";
    testBtn.className = "btn btn-primary my-md-3";
    testBtn.innerHTML = "Submit";
    testBtn.id = "testBtn";
    testForm.appendChild(testBtn);
    addRow(testForm);

    var testErr = document.createElement("label");
    testErr.style.display = "none";
    testErr.className = "errText";
    testErr.innerHTML = "*Please complete all questions";
    testErr.id = "testErr";
    testForm.appendChild(testErr);

    testBtn.addEventListener('click', function(){
      var checkedRads = 0;
      var radios = document.querySelectorAll('.radio');
      for (var t4 = 0; t4 < radios.length; t4++){
        if (radios[t4].checked == true){
          checkedRads++;
        }
      };

      if (checkedRads != 12){
        testErr.style.display = "inline-block";
      } else {
        document.getElementById("testNext").disabled = false;
        testValues[1] = document.getElementById("whatPaper").value;
        testValues[3] = document.getElementById("whichNewsSite").value;
        testValues[5] = document.getElementById("whichTV").value;
        testValues[15] = document.getElementById('alertInput').value;
        var radios = document.querySelectorAll('.radio');
        for (var t5 = 0; t5 < radios.length; t5++){
          radios[t5].disabled = true;
        };
        document.getElementById("whatPaper").disabled = true;
        document.getElementById("whichNewsSite").disabled = true;
        document.getElementById("whichTV").disabled = true;
        document.getElementById('alertInput').disabled = true;
        saveTest(uid, testValues);
        testErr.style.display = "none";
        testBtn.disabled = true;
        testNext.onclick = function(){
          location.href="quiz.html";
        }
      }
      var alertString = document.getElementById("alertInput").value;
      var newString = alertString.replace(/[^A-Z0-9]+/ig, "");
      if ((newString.toLowerCase()) != "alert"){
        testNext.onclick = function(){
          document.getElementById('ins').innerHTML = "";
          document.getElementById('sorry').innerHTML = "Sorry!";
          testForm.innerHTML = "Unfortunately the response to the alertness test was incorrect, so we must reject your assignmenton Mechanical Turk. We think it is better to tell you now, rather than proceeding to the main part of the survey. Thank you for your time."
          testNext.disabled = true;
        };

      }

    });

    document.getElementById("radForTest32").addEventListener('click', function(){
      document.getElementById("alertInput").style.display = "inline-block";
    });



  });

}

var startTime;
var i = 0;

// functions to add horizontal bars, buttons and rows to the queston form

const qform = document.getElementById('questions');
var j = 1;
var k = 1;
var t = 1;
var values = {};
var downBtns = {};
var upBtns = {};
var lgUpBtns = {};
var smUpBtns = {};
var smDownBtns = {};
var btns = {};
var rads = {};
var radLbls = {};
var options = {};
var trueAnswers = {};
var userScores = {};
var means = {};
var stanDs = {};

function addRow(slide){
  const newRow = document.createElement('div');
  newRow.className = "form-row my-md-3";
  slide.appendChild(newRow);
  const col = document.createElement('div');
  col.className = "col-md-6";
  newRow.appendChild(col);
};

function addBtns(slide, num){
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
  var count = num;
  barCol.className = "col-md-6";
  slide.appendChild(barCol);
  var bar = document.createElement('div');
  bar.className = "bar";
  bar.id = "bar" + i + "_" + j;
  barCol.appendChild(bar);
  bar.innerHTML = count + "%";
  bar.style.width = (count * 1.5) + "%";

  var downBtnID = "downBtn" + i + "_" + j;
  var smDownBtnID = "smDownBtn" + i + "_" + j;
  var smUpBtnID = "smUpBtn" + i + "_" + j;
  var upBtnID = "upBtn" + i + "_" + j;
  var barID = "bar" + i + "_" + j;
  var valueNum = "values" + i;
  var valPos = j-1;
  values[valueNum][valPos] = count;
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
    document.getElementById(barID).style.width = (count * 1.5) + "%";
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
    document.getElementById(barID).style.width = (count * 1.5) + "%";
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
    document.getElementById(barID).style.width = (count * 1.5) + "%";
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
    document.getElementById(barID).style.width = (count * 1.5) + "%";
    if (count < 10 ){
      document.getElementById(downBtnID).disabled = true;
    }
    var value = document.getElementById(barID).innerHTML;
    values[valueNum][valPos] = parseInt(value, 10);
  });
  j++;
};

function addRads(slide){
  var radCol = document.createElement('div');
  radCol.className = "col-md-6";
  slide.append(radCol);
  radCol.style.display = "inline-block";
  var rad = document.createElement('input');
  rad.type = "radio";
  rad.className = "radio";
  rad.id = "radio" + i + "_" + k;
  radCol.appendChild(rad);
  var radID = "radio" + i + "_" + k;
  var radLbl = document.createElement("label");
  radLbl.className = "radLbl";
  radLbl.id = "radLbl" + i + "_" + k;
  radLbl.for = radID;
  radCol.appendChild(radLbl);
  var radLblID = "radLbl" + i + "_" + k;
  var radsNum = "rads" + i;
  var radLblsNum = "radLbls" + i;
  rads[radsNum].push(radID);
  radLbls[radLblsNum].push(radLblID);

  k++;
}

function addTestRads(slide){
  var radCol = document.createElement('div');
  radCol.className = "col-md-6";
  slide.append(radCol);
  radCol.style.display = "inline-block";
  var rad = document.createElement('input');
  rad.type = "radio";
  rad.className = "radio";
  rad.id = "radForTest" + t;
  radCol.appendChild(rad);
  var radID = "radForTest" + t;
  var radLbl = document.createElement("label");
  radLbl.className = "radLbl";
  radLbl.id = "radLblForTest" + t;
  radLbl.for = "radForTest" + t;
  radCol.appendChild(radLbl);
  var radLblID = "radLblForTest" + t;

  t++;
}

var slideNo = 1;
var currentSlideID = "slide" + slideNo;

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
      slide.className = "slide";
      slide.id = "slide" + i;
      var slideID = "#slide" + i;
      qform.appendChild(slide);

      var questionNum = "question" + i;
      var valuesNum = "values" + i;
      var btnsNum = "btns" + i;
      var optionsNum = "options" + i;
      var radsNum = "rads" + i;
      var radLblsNum = "radLbls" + i;
      var numOfOpts = 0;
      var ansIndexNum = "answers" + i;


      d3.select(slideID).append("label").text(i + ". " + d.Question);
      addRow(slide);
      d3.select(slideID).append("label").text("Your Answer:");
      addRow(slide);

      addRads(slide);
      document.getElementById(radLbls[radLblsNum][0]).innerHTML = d.Option1;
      options[optionsNum].push(d.Option1);
      numOfOpts++;


      addRads(slide);
      document.getElementById(radLbls[radLblsNum][1]).innerHTML = d.Option2;
      options[optionsNum].push(d.Option2);
      numOfOpts++;
      addRow(slide);

      if (d.Option3 != ""){
        addRads(slide);
        document.getElementById(radLbls[radLblsNum][2]).innerHTML = d.Option3;
        options[optionsNum].push(d.Option3);
        numOfOpts++;

      }

      if (d.Option4 != ""){
        addRads(slide);
        document.getElementById(radLbls[radLblsNum][3]).innerHTML = d.Option4;
        options[optionsNum].push(d.Options4);
        numOfOpts++;
        addRow(slide);
      }

      if (d.Option5 != ""){
        addRads(slide);
        document.getElementById(radLbls[radLblsNum][4]).innerHTML = d.Option5;
        options[optionsNum].push(d.Options5);
        numOfOpts++;

      }

      if (d.Option6 != ""){
        addRads(slide);
        document.getElementById(radLbls[radLblsNum][5]).innerHTML = d.Option6;
        options[optionsNum].push(d.Options6);
        numOfOpts++;
        addRow(slide);
      }

      if (d.Option7 != ""){
        addRads(slide);
        document.getElementById(radLbls[radLblsNum][6]).innerHTML = d.Option7;
        options[optionsNum].push(d.Options7);
        numOfOpts++;

      }

      if (d.Option8 != ""){
        addRads(slide);
        document.getElementById(radLbls[radLblsNum][7]).innerHTML = d.Option8;
        options[optionsNum].push(d.Options8);
        numOfOpts++;
        addRow(slide);
      }

      if (d.Option9 != ""){
        addRads(slide);
        document.getElementById(radLbls[radLblsNum][8]).innerHTML = d.Option9;
        options[optionsNum].push(d.Options9);
        numOfOpts++;
        addRow(slide);
      }

      addRow(slide);
      d3.select(slideID).append("label").text("What did the public think?:");
      addRow(slide);

      d3.select(slideID).append("label").text(d.Option1);
      addBtns(slide, Math.floor(100/numOfOpts));
      addRow(slide);

      d3.select(slideID).append("label").text(d.Option2);
      addBtns(slide, Math.floor(100/numOfOpts));
      addRow(slide);

      if (d.Option3 != ""){
        d3.select(slideID).append("label").text(d.Option3);
        addBtns(slide, Math.floor(100/numOfOpts));
        addRow(slide);
      }

      if (d.Option4 != ""){
        d3.select(slideID).append("label").text(d.Option4);
        addBtns(slide, Math.floor(100/numOfOpts));
        addRow(slide);
      }

      if (d.Option5 != ""){
        d3.select(slideID).append("label").text(d.Option5);
        addBtns(slide, Math.floor(100/numOfOpts));
        addRow(slide);
      }

      if (d.Option6 != ""){
        d3.select(slideID).append("label").text(d.Option6);
        addBtns(slide, Math.floor(100/numOfOpts));
        addRow(slide);
      }

      if (d.Option7 != ""){
        d3.select(slideID).append("label").text(d.Option7);
        addBtns(slide, Math.floor(100/numOfOpts));
        addRow(slide);
      }

      if (d.Option8 != ""){
        d3.select(slideID).append("label").text(d.Option8);
        addBtns(slide, Math.floor(100/numOfOpts));
        addRow(slide);
      }

      if (d.Option9 != ""){
        d3.select(slideID).append("label").text(d.Option9);
        addBtns(slide, Math.floor(100/numOfOpts));
        addRow(slide);
      }

      var qcode = d.QuestionCode;
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
      confBtn.className = "btn btn-primary my-md-3";
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

      for (var r3 = 0; r3 < rads[radsNum].length; r3++){
        document.getElementById(rads[radsNum][r3]).addEventListener('click', function(){
          var theRad = this;
          for (var r4 = 0; r4 < rads[radsNum].length; r4++){
            if (theRad != document.getElementById(rads[radsNum][r4])){
              document.getElementById(rads[radsNum][r4]).checked = false;
            }
          }
        })
        document.getElementById(radLbls[radLblsNum][r3]).addEventListener('click', function(){
          var theRadLbl = this;
          var str = theRadLbl.id;
          var newStr = str.replace("radLbl", "radio");
          var activeRad = document.getElementById(newStr);
          activeRad.checked = true;
          for (var r5 = 0; r5 < rads[radsNum].length; r5++){
            if (activeRad != document.getElementById(rads[radsNum][r5])){
              document.getElementById(rads[radsNum][r5]).checked = false;
            }
          }
        })
      };


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

      if (values[valuesNum].reduce((a,b) => a+b, 0) > 90){
        for (var f= 0; f < lgUpBtns[btnsNum].length; f++){
          document.getElementById(lgUpBtns[btnsNum][f]).disabled = true;
        }
      };



      document.getElementById(conBtnID).addEventListener('click', function(){
        if ( values[valuesNum].reduce((a,b) => a+b, 0) != 100){
          document.getElementById(conBtnID).type = "button";
          document.getElementById(errTextID).style.display = "block";
        }
        else {
          document.getElementById(errTextID).style.display = "none";
          document.getElementById(conBtnID).disabled = true;
          writeData(uid, section, qcode, options[optionsNum].length, values[valuesNum]);
          var endTime = Date.now();
          var difference = (endTime - startTime)/1000;
          saveTime(uid, section, qcode, difference);
          saveUserScore(uid, values[valuesNum], trueAnswers[ansIndexNum], section, qcode, questionNum);
          for (var m = 0; m < btns[btnsNum].length; m++){
            document.getElementById(btns[btnsNum][m]).disabled = true;
          }

          for (var r1 = 0; r1 < rads[radsNum].length; r1++){
            document.getElementById(rads[radsNum][r1]).disabled = true;
          }
          var selected = 0;
          for (var r2 = 0; r2 < rads[radsNum].length; r2++){
            if (document.getElementById(rads[radsNum][r2]).checked == true){
              selected++;
              var ans = document.getElementById(radLbls[radLblsNum][r2]).innerHTML;
              writeAnswer(uid, section, qcode, ans);
            }
          }
          if (selected == 0){
            document.getElementById(conBtnID).type = "button";
            document.getElementById(conBtnID).disabled = false;
            document.getElementById(radErrTextID).style.display = "block";
            for (var p = 0; rads[radsNum].length; p++){
              document.getElementById(rads[radsNum][p]).disabled = false;
            }
          }
          nextBtn.disabled = false;
          document.getElementById(radErrTextID).style.display = "none";
        }
      })
      j = 1;
      k = 1;

    });
    showSlide(currentSlideID, currentSlideID, slideNo);
  });
};


if ($('body').is('.quiz1')){
  readData("Sample-Data/questions.csv", "answers");
  readTrueAns("Sample-Data/scoring.csv");
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.addEventListener('click', function(){
    slideNo++;
    var nextSlide = "slide" + slideNo;
    showSlide(nextSlide, currentSlideID, slideNo);
    currentSlideID = "slide" + slideNo;
    startTime = Date.now();
    nextBtn.disabled = true;
  });
  window.addEventListener('load', function(){
    startTime = Date.now();
  });
};

for (var num = 0; num < 62; num++){
  var v = "values" + (num + 1);
  var b = "btns" + (num + 1);
  var o = "options" + (num + 1);
  var r = "rads" + (num + 1);
  var rl = "radLbls" + (num + 1);
  var tr = "answers" + (num + 1);
  var q = "question" + (num + 1);
  values[v] = [];
  btns[b] = [];
  downBtns[b] = [];
  upBtns[b] = [];
  smDownBtns[b] = [];
  smUpBtns[b] = [];
  lgUpBtns[b] = [];
  options[o] = [];
  rads[r] = [];
  radLbls[rl] = [];
  trueAnswers[tr] = [];

};
/*
making one question appear at a time using slides
taken from https://www.sitepoint.com/simple-javascript-quiz/
accessed 14-09-20
*/

function showSlide(n, currentSlideID, slideNo){
  document.getElementById(currentSlideID).className = "slide";
  document.getElementById(n).className = "active-slide";
  if (slideNo == i){
    nextBtn.disabled = true;
  }
}
// end of referenced code

var ansIndexNum = 0;
function readTrueAns(file){
  d3.csv(file).then(function(data){
    data.forEach(function(d){
      ansIndexNum++;
      var ansIndex = "answers" + ansIndexNum;
      var qIndex = "question" + ansIndexNum;

      trueAnswers[ansIndex][0] = parseInt(d.option1);
      trueAnswers[ansIndex][1] = parseInt(d.option2);
      if (d.option3 != ""){
        trueAnswers[ansIndex][2] = parseInt(d.option3);
      }
      if (d.option4 != ""){
        trueAnswers[ansIndex][3] = parseInt(d.option4);
      }
      if (d.option5 != ""){
        trueAnswers[ansIndex][4] = parseInt(d.option5);
      }
      if (d.option6 != ""){
        trueAnswers[ansIndex][5] = parseInt(d.option6);
      }
      if (d.option7 != ""){
        trueAnswers[ansIndex][6] = parseInt(d.option7);
      }
      if (d.option8 != ""){
        trueAnswers[ansIndex][7] = parseInt(d.option8);
      }
      if (d.option9 != ""){
        trueAnswers[ansIndex][8] = parseInt(d.option9);
      }

      means[qIndex] = parseFloat(d.mean);
      stanDs[qIndex] = parseFloat(d.sd);

      var sum = trueAnswers[ansIndex].reduce((a,b) => a+b, 0);

      if (sum != 100){
        for (var a = 0; a < trueAnswers[ansIndex].length; a++){
          trueAnswers[ansIndex][a] = ((trueAnswers[ansIndex][a])/sum) * 100;
        }
      }
    })
  })
};

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

function writeData(uid, section, qcode, num, answers){
  if (num == 2){
    firebase.database().ref('/user' + uid + '/' + section + '/' + qcode + '/guess_of_public/').set({
      opt1: answers[num-2],
      opt2: answers[num-1]
    });
  }
  if (num == 3){
    firebase.database().ref('/user' + uid + '/' + section + '/' + qcode + '/guess_of_public/').set({
      opt1: answers[num-3],
      opt2: answers[num-2],
      opt3: answers[num-1]
    });
  }
  if (num == 4){
    firebase.database().ref('/user' + uid + '/' + section + '/' + qcode + '/guess_of_public/').set({
      opt1: answers[num-4],
      opt2: answers[num-3],
      opt3: answers[num-2],
      opt4: answers[num-1]
    });
  }
  if (num == 5){
    firebase.database().ref('/user' + uid + '/' + section + '/' + qcode + '/guess_of_public/').set({
      opt1: answers[num-5],
      opt2: answers[num-4],
      opt3: answers[num-3],
      opt4: answers[num-2],
      opt5: answers[num-1]
    });
  }
  if (num == 6){
    firebase.database().ref('/user' + uid + '/' + section + '/' + qcode + '/guess_of_public/').set({
      opt1: answers[num-6],
      opt2: answers[num-5],
      opt3: answers[num-4],
      opt4: answers[num-3],
      opt5: answers[num-2],
      opt6: answers[num-1]
    });
  }
  if (num == 7){
    firebase.database().ref('/user' + uid + '/' + section + '/' + qcode + '/guess_of_public/').set({
      opt1: answers[num-7],
      opt2: answers[num-6],
      opt3: answers[num-5],
      opt4: answers[num-4],
      opt5: answers[num-3],
      opt6: answers[num-2],
      opt7: answers[num-1]
    });
  }
  if (num == 9){
    firebase.database().ref('/user' + uid + '/' + section + '/' + qcode + '/guess_of_public/').set({
      opt1: answers[num-9],
      opt2: answers[num-8],
      opt3: answers[num-7],
      opt4: answers[num-6],
      opt5: answers[num-5],
      opt6: answers[num-4],
      opt7: answers[num-3],
      opt8: answers[num-2],
      opt9: answers[num-1]
    });
  }
};

// time stamp for each question
function saveTime(uid, section, qcode, time){
  firebase.database().ref('/user' + uid + '/' + section + '/' + qcode + '/timer/').set({
    Timer: time
  });
}

// save the user's actual answer
function writeAnswer(uid, section, qcode, ans){
  firebase.database().ref('/user' + uid + '/' + section + '/' + qcode + '/their_answer/').set({
    answer: ans
  });
};

//save political knowledge test results
function saveTest(uid, vals){
  firebase.database().ref('/user' + uid + '/political_knowledge_test/').set({
    paperYN: vals[0],
    paper: vals[1],
    webYN: vals[2],
    web: vals[3],
    tvYN: vals[4],
    tv: vals[5],
    speaker_HOC: vals[6],
    brexit: vals[7],
    sci_advisor: vals[8],
    unemployment: vals[9],
    seats_HOC: vals[10],
    fiveG: vals[11],
    elec_source: vals[12],
    party_HOC: vals[13],
    alert: vals[14],
    alert_text: vals[15]
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

function saveUserScore(uid, user_answers, true_answers, section, qcode, qnum){
  var userScore = sumDiff(user_answers, true_answers);
  var normScore = Math.round(100*(means[qnum] - userScore)/stanDs[qnum])
  userScores[qnum] = userScore;
  firebase.database().ref('/user' + uid + '/' + section + '/' + qcode + '/score/').set({
    score: normScore
  });
};
// end of referenced code

function sumDiff(a,b){
  var sdiff = 0;
  for (var v = 0; v < a.length; v++){
    sdiff += Math.abs(a[v] - b[v]);
    return sdiff;
  }
}
