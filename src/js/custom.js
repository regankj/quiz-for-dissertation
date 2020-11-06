const d3 = require('d3');

/*
Setting cookie as user id
taken from https://www.w3schools.com/js/js_cookies.asp
accessed 26-10-20
*/
function setCookie(){
  var id = Date.now();
  document.cookie = "userid=" + id;
}

function getCookie(){
  var decodedCookie = decodeURIComponent(document.cookie);
  var c = decodedCookie.replace("userid=", "");
  return c;
}
// end of referenced code

if ($("body").is(".consent")){
  setCookie();
}

// Functionality for initial page
const contBtn = document.getElementById('continue');
if (contBtn){
  var classBox = document.getElementById('classSurvey');
  contBtn.addEventListener('click', function(){
    var classBracket = classBox.options[classBox.selectedIndex].text;

    if (classBracket == "Choose..."){
      document.getElementById("infoErr").style.display = "inline-block";
      classBox.disabled = false;
    } else {
      var fail;
      var uid = getCookie();
      saveClassSurvey(uid, classBracket);
      classBox.disabled = true;
      contBtn.disabled = true;
      document.getElementById("infoErr").style.display = "none";
      if (classBracket == "International Elite" || classBracket == "London Middle Class" || classBracket == "Old Affluent Workers" || classBracket == "Managerial Working Class" || classBracket == "Self Employed Service Workers"){
            fail = "Yes";
      } else {
            fail = "No";
      }
      alertnessTest(uid, "Class_Survey", fail);
    }

  });
  /*
  delaying a link
  taken from https://stackoverflow.com/a/14434682/12239467
  accessed 22-10-20
  */
  contBtn.onclick = function(){
    setTimeout(function(){
      window.location.href = "knowledge.html";
    }, 500);
  };
  // end of referenced code
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
  var interestBox = document.getElementById("pol_interest");
  var partyBox = document.getElementById("pol_party");


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
  })

  noTV.addEventListener('click', function(){
    yesTV.checked = false;
    testValues[4] = "No";
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
          var ind = Math.floor((radNum/4.1)) + 7;
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
          var radNum = parseInt(str.substr(13), 10);
          var ind = Math.floor((radNum/4.1)) + 7;
          testValues[ind] = theRadLbl.innerHTML;
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
    testBtn.innerHTML = "Submit & Next";
    testBtn.id = "testBtn";
    testForm.appendChild(testBtn);
    addRow(testForm);

    var testErr = document.createElement("div");
    testErr.style.display = "none";
    testErr.className = "alert alert-danger";
    testErr.role = "alert";
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
      var interest = interestBox.options[interestBox.selectedIndex].text;
      var party = partyBox.options[partyBox.selectedIndex].text;

      if (checkedRads != 12 || interest == "Choose..." || party == "Choose..."){
        testErr.style.display = "inline-block";
      } else {
        testValues[1] = document.getElementById("whatPaper").value;
        testValues[3] = document.getElementById("whichNewsSite").value;
        testValues[5] = interest;
        testValues[6] = party;
        testValues[16] = document.getElementById('alertInput').value;
        var radios = document.querySelectorAll('.radio');
        for (var t5 = 0; t5 < radios.length; t5++){
          radios[t5].disabled = true;
        };
        document.getElementById("whatPaper").disabled = true;
        document.getElementById("whichNewsSite").disabled = true;
        document.getElementById('alertInput').disabled = true;
        testErr.style.display = "none";
        var uid = getCookie();
        saveTest(uid, testValues);
        var fail;
        var alertString = document.getElementById("alertInput").value;
        var newString = alertString.replace(/[^A-Z0-9]+/ig, "");
        if ((newString.toLowerCase()) != "alert"){
          fail = "Yes";
        } else {
          fail = "No";
        }
        alertnessTest(uid, "political_knowledge_test", fail);

        setTimeout(function(){
          window.location.href = "quiz.html";
        }, 500);
      }
    });


    document.getElementById("radForTest36").addEventListener('click', function(){
      document.getElementById("alertInput").style.display = "inline-block";
    });

    document.getElementById("radLblForTest36").addEventListener('click', function(){
      document.getElementById("alertInput").style.display = "inline-block";
    });

  });

}

var startTime;
var i = 0;
var size = 1.5;
if (window.matchMedia("(max-width: 500px)").matches){
  size = 0.85;
}

// functions to add horizontal bars, buttons and rows to the queston form

const qform = document.getElementById('questions');
var j = 1;
var k = 1;
var t = 1;
var values = {};
var hbars = {};
var barSpans = {};
var rads = {};
var radLbls = {};
var options = {};
var trueAnswers = {};
var userScores = {};
var means = {};
var stanDs = {};
var qs = [];
var qcodes = [];
var worstAns = [];
var sworstAns = [];

function addRow(slide){
  const newRow = document.createElement('div');
  newRow.className = "form-row my-md-3";
  slide.appendChild(newRow);
  const col = document.createElement('div');
  col.className = "col-md-6";
  newRow.appendChild(col);
};

function addSliders(slide, num){
  const col = document.createElement("div");
  col.className = "col-md-6";
  slide.append(col);
  var bar = document.createElement("input");
  bar.type = "range";
  bar.className = "form-control-range";
  bar.id = "bar" + i + "_" + j;
  bar.value = num;
  col.appendChild(bar);
  var barSpan = document.createElement("span");
  barSpan.className = "font-weight-bold text-primary ml-2 mt-1";
  barSpan.id = "barSpan" + i + "_" + j;
  barSpan.innerHTML = num + "%";
  col.appendChild(barSpan);
  var barID = "bar" + i + "_" + j;
  var barSpanID = "barSpan" + i + "_" + j;
  var barsNum = "bars" + i;
  hbars[barsNum].push(barID);
  barSpans[barsNum].push(barSpanID);
  var valuesNum = "values" + i;
  var valPos = j - 1;

  values[valuesNum][valPos] = num;

  j++;
}

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
loading in questions from a csv file and calling other functions to create the quiz
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
      var uid = getCookie();

      var questionNum = "question" + i;
      var valuesNum = "values" + i;
      var barsNum = "bars" + i;
      var btnsNum = "btns" + i;
      var optionsNum = "options" + i;
      var radsNum = "rads" + i;
      var radLblsNum = "radLbls" + i;
      var numOfOpts = 0;
      var ansIndexNum = "answers" + i;


      d3.select(slideID).append("label").text("( " + i + " / 39 ). " + d.Question);
      qs.push(d.Question);
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
        addRow(slide);
      }

      var qcode = d.key;
      qcodes.push(qcode);

      var count = Math.floor(100/numOfOpts);
      var extra;
      if ((count*numOfOpts) == 100){
        extra = 0;
      } else {
        extra = 100 - (count*numOfOpts);
      }

      if (qcode != "covid19" ){
        addRow(slide);
        d3.select(slideID).append("label").text("What did the public think?:");
        addRow(slide);

        d3.select(slideID).append("label").text(d.Option1);
        addSliders(slide, (count + extra));
        addRow(slide);

        d3.select(slideID).append("label").text(d.Option2);
        addSliders(slide, count);
        addRow(slide);

        if (d.Option3 != ""){
          d3.select(slideID).append("label").text(d.Option3);
          addSliders(slide, count);
          addRow(slide);
        }
      }



      // end of referenced code


      var confBtn = document.createElement('button');
      confBtn.type = "button";
      confBtn.innerHTML = "Confirm";
      confBtn.id = "confirm" + i;
      confBtn.className = "btn btn-primary my-md-3";
      slide.appendChild(confBtn);
      var conBtnID = "confirm" + i;

      var errText = document.createElement('div');
      errText.innerHTML = "*Bars must add up to 100%";
      errText.id = "errText" + i;
      errText.className = "alert alert-danger";
      errText.role = "alert";
      errText.style.display = "none";
      slide.appendChild(errText);
      var errTextID = "errText" + i;

      addRow(slide);

      var radErrText = document.createElement("div");
      radErrText.innerHTML = "*Please select your answer to the question";
      radErrText.id = "radErrText" + i;
      radErrText.className = "alert alert-danger";
      radErrText.role = "alert";
      radErrText.style.display = "none";
      slide.appendChild(radErrText);
      var radErrTextID = "radErrText" + i;

      addRow(slide);

      // ensuring only one radio button can be checked at a time
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

      var splice;
      if (i >= 10){
        splice = 6;
      } else {
        splice = 5;
      }

      if (qcode != "covid19"){
        // keeping the sliders at 100%
        if (numOfOpts == 2){
          for (var b = 0; b < hbars[barsNum].length; b++){
            document.getElementById(hbars[barsNum][b]).addEventListener('input', function(){
              var str = this.id;
              var ind = parseInt(str.substr(splice), 10) - 1;
              var bar1 = document.getElementById(hbars[barsNum][0]);
              var bar2 = document.getElementById(hbars[barsNum][1]);
              var span1 = document.getElementById(barSpans[barsNum][0]);
              var span2 = document.getElementById(barSpans[barsNum][1]);
              if (ind == 0){
                span1.innerHTML = bar1.value + "%";
                bar2.value = 100 - bar1.value;
                span2.innerHTML = bar2.value + "%";
              } else {
                span2.innerHTML = bar2.value + "%";
                bar1.value = 100 - bar2.value;
                span1.innerHTML = bar1.value + "%";
              }
              values[valuesNum][0] = bar1.value;
              values[valuesNum][1] = bar2.value;
            })
          }
        } else {
          var prop = 0.5;
          for (var b = 0; b < hbars[barsNum].length; b++){
            document.getElementById(hbars[barsNum][b]).addEventListener('input', function(){
              var str = this.id;
              var ind = parseInt(str.substr(splice), 10) - 1;
              var bar1 = document.getElementById(hbars[barsNum][0]);
              var bar2 = document.getElementById(hbars[barsNum][1]);
              var bar3 = document.getElementById(hbars[barsNum][2]);
              var span1 = document.getElementById(barSpans[barsNum][0]);
              var span2 = document.getElementById(barSpans[barsNum][1]);
              var span3 = document.getElementById(barSpans[barsNum][2]);




              if (ind == 0){
                span1.innerHTML = bar1.value + "%";
                bar3.value = 100 - bar1.value - bar2.value;
                span3.innerHTML = bar3.value + "%";
                if (bar3.value == 0){
                  span3.innerHTML = "0%";
                  bar2.value = 100 - bar1.value;
                  span2.innerHTML = bar2.value + "%";
                }
                prop = (bar1.value)/(100-bar2.value);



              } else if (ind == 2){
                span3.innerHTML = bar3.value + "%";
                bar1.value = 100 - bar2.value - bar3.value;
                span1.innerHTML = bar1.value + "%";
                if (bar1.value == 0){
                  span1.innerHTML = "0%";
                  bar2.value = 100 - bar3.value;
                  span2.innerHTML = bar2.value + "%";
                }
                prop = (bar1.value)/(100-bar2.value);

              } else {

                span2.innerHTML = bar2.value + "%";
                var diff = 100 - bar2.value;
                bar1.value = Math.floor(diff*prop);
                span1.innerHTML = bar1.value + "%";
                bar3.value = 100 - bar1.value - bar2.value;
                span3.innerHTML = bar3.value + "%";
                if (bar3.value == 0){
                  span3.innerHTML = "0%";
                  bar1.value = 100 - bar2.value;
                  span1.innerHTML = bar1.value + "%";
                }
                if (bar1.value == 0){
                  span1.innerHTML = "0%";
                  bar3.value = 100 - bar2.value;
                  span3.innerHTML = bar3.value + "%";
                }


              }

              values[valuesNum][0] = bar1.value;
              values[valuesNum][1] = bar2.value;
              values[valuesNum][2] = bar3.value;
            });
          }
        }
      }

      // submitting data and disabling buttons after the confirm button is clicked
      document.getElementById(conBtnID).addEventListener('click', function(){
        document.getElementById(errTextID).style.display = "none";
        document.getElementById(conBtnID).disabled = true;
        var endTime = Date.now();
        var difference = (endTime - startTime)/1000;
        saveTime(uid, section, qcode, difference);
        if (qcode != "covid19"){
          writeData(uid, section, qcode, options[optionsNum].length, values[valuesNum]);
          saveUserScore(uid, values[valuesNum], trueAnswers[ansIndexNum], section, qcode, questionNum);
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
        }
        nextBtn.disabled = false;
        document.getElementById(radErrTextID).style.display = "none";
        if (qcode != "covid19"){
          slideNo++;
          var nextSlide = "slide" + slideNo;
          showSlide(nextSlide, currentSlideID, slideNo);
          currentSlideID = "slide" + slideNo;
          startTime = Date.now();
          location.href = "#top";
        }

      });

      j = 1;
      k = 1;
    });
    showSlide(currentSlideID, currentSlideID, slideNo);
  });
};


if ($('body').is('.quiz1')){
  readData("Sample-Data/questions.csv", "answers");
  readTrueAns("Sample-Data/questions.csv");
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.addEventListener('click', function(){
    if (slideNo < 39){
      slideNo++;
      var nextSlide = "slide" + slideNo;
      showSlide(nextSlide, currentSlideID, slideNo);
      currentSlideID = "slide" + slideNo;
      startTime = Date.now();
    }
  });
  window.addEventListener('load', function(){
    startTime = Date.now();
  });

  window.onbeforeunload = function(){
    return "Are you sure? All of your progress will be lost.";
  }

};

function showNextSlide(slideNo, currentSlideID){
  slideNo++;
  var nextSlide = "slide" + slideNo;
  showSlide(nextSlide, currentSlideID, slideNo);
  currentSlideID = "slide" + slideNo;
}

for (var num = 0; num < 39; num++){
  var v = "values" + (num + 1);
  var barsNum = "bars" + (num + 1);
  var o = "options" + (num + 1);
  var r = "rads" + (num + 1);
  var rl = "radLbls" + (num + 1);
  var tr = "answers" + (num + 1);
  var q = "question" + (num + 1);
  values[v] = [];
  hbars[barsNum] = [];
  barSpans[barsNum] = [];
  options[o] = [];
  rads[r] = [];
  radLbls[rl] = [];
  trueAnswers[tr] = [];
  userScores[q] = 0;

};

/*
making one question appear at a time using slides
taken from https://www.sitepoint.com/simple-javascript-quiz/
accessed 14-09-20
*/
function showSlide(n, currentSlideID, slideNo){
  document.getElementById(currentSlideID).className = "slide";
  document.getElementById(n).className = "active-slide";
  // end of referenced code
  if (slideNo == i){
    document.getElementById("nextBtn").style.display = "none";
    finalSlides();
  }
}


// creates a bar chart using d3
function createChart(data, qIndex){
  var vis = document.getElementById("vis");

  var width = 500;
  var height = 750;

  if (window.matchMedia("(max-width: 500px)").matches){
    width = 300;
    height = 750;
  }

  var maxValue = 100;

  var margin = {
    top: 30,
    left: 70,
    right: 30,
    bottom: 370
  };

  var svg = d3.select('#vis')
            .append("svg")
            .attr('width', width)
            .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + margin.top + "," + margin.left + ")");

  width = width - margin.left - margin.right;
  height = height - margin.top - margin.bottom;

  var yscale = d3.scaleLinear().range([height, 0]).domain([0, maxValue]);

  var xscale = d3.scaleBand().range([0, width]).padding(0.1);

  var duration = 1000;

  var xaxis = d3.axisBottom(xscale);
  var yaxis = d3.axisLeft(yscale);

  svg.append('g')
      .attr('transform', 'translate(0, ' + (height) + ')')
      .attr('class', 'x axis')


  svg.append('g').attr('class', 'y axis');

  if (data == values){
    var vNum = "values" + qIndex;
    var fill = "#e3546c";
    var title = "Your Answers";
  } else {
    var vNum = "answers" + qIndex;
    var fill = "#042975";
    var title = "Actual Answers";
  }

  var oNum = "options" + (qIndex);

  var qlblID = "questionLbl" + (qIndex);
  document.getElementById(qlblID).innerHTML = qIndex + ". " + qs[qIndex - 1];

  xscale.domain(options[oNum]);
  yscale.domain([0, maxValue]);

  var bars = svg.selectAll(".bar").data(data[vNum]);

  bars.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', fill)
      .attr('width', xscale.bandwidth())
      .attr('height', 0)
      .attr('y', height)
      .merge(bars)
      .transition()
      .duration(duration)
      .attr("height", function(d, i){ return height - yscale(d); })
      .attr("y", function(d, i){ return yscale(d); })
      .attr("width", xscale.bandwidth())
      .attr("x", function(d, i){ return xscale(options[oNum][i]); });



/*
adding a title to the chart
taken from https://stackoverflow.com/a/11194968/12239467
accessed 20-10-20
*/
  svg.append("text")
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr("y", 0-margin.top)
      .attr("x", 0 + (width/2))
      .text(title);
// end of referenced code

/*
rotating x-axis labels
taken from https://stackoverflow.com/a/16863559/12239467
accessed 29-10-20
*/
  svg.select('.x.axis')
      .transition()
      .duration(duration)
      .call(xaxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

// end of referenced code

  svg.select('.y.axis')
      .transition()
      .duration(duration)
      .call(yaxis);


}


function finalSlides(){
  var uid = getCookie();
  var slideID = "slide39";
  var theSlide = document.getElementById(slideID);
  var conID = "confirm39";
  document.getElementById(conID).addEventListener('click', function(){
    document.getElementById("nextBtn").style.display = "none";
    var num = 0;
    theSlide.innerHTML = "";
    location.href = "#top";
    theSlide.className = "active-slide";
    document.querySelector("#top h2").innerHTML = "Nearly There!"
    document.querySelector("#top h6").innerHTML = "Please answer the following demographic questions, we will then compute your score.";
    var demoDiv = document.createElement("div");
    theSlide.appendChild(demoDiv);
    d3.csv("Sample-Data/demographics.csv").then(function(data){
      data.forEach(function(d){
        num++;
        var lbl = document.createElement("label");
        lbl.innerHTML = d.Question;
        demoDiv.appendChild(lbl);

        var box = document.createElement("select");
        box.className = "form-control";
        box.id = "dropdown" + num;
        var boxID = "#dropdown" + num;
        demoDiv.appendChild(box);

        var choose = document.createElement("option");
        choose.innerHTML = "Choose...";
        choose.selected;
        box.appendChild(choose);

        d3.select(boxID).append("option").text(d.Option1);
        d3.select(boxID).append("option").text(d.Option2);
        if (d.Option3 != ""){
          d3.select(boxID).append("option").text(d.Option3);
        };
        if (d.Option4 != ""){
          d3.select(boxID).append("option").text(d.Option4);
        };
        if (d.Option5 != ""){
          d3.select(boxID).append("option").text(d.Option5);
        };
        if (d.Option6 != ""){
          d3.select(boxID).append("option").text(d.Option6);
        };

        addRow(demoDiv);
      });

    });

    var btnDiv = document.createElement("div");
    btnDiv.id = "btnDiv";
    theSlide.appendChild(btnDiv);

    var demoBtn = document.createElement("button");
    demoBtn.type = "button";
    demoBtn.className = "btn btn-primary my-md-3";
    demoBtn.id = "demographicBtn";
    demoBtn.innerHTML = "Confirm & Next";
    btnDiv.appendChild(demoBtn);
    addRow(btnDiv);

    var demoErr = document.createElement("div");
    demoErr.className = "alert alert-danger";
    demoErr.role = "alert";
    demoErr.id = "demoErr";
    demoErr.style.display = "none";
    demoErr.innerHTML = "*Please complete the whole form.";
    btnDiv.appendChild(demoErr);
    addRow(theSlide);

    document.getElementById("demographicBtn").onclick =  function(){
      var genderBox = document.getElementById("dropdown1");
      var ageBox = document.getElementById("dropdown2");
      var raceBox = document.getElementById('dropdown3');
      var eduBox = document.getElementById("dropdown4");
      var houseBox = document.getElementById('dropdown5');

      var gender = genderBox.options[genderBox.selectedIndex].text;
      var age = ageBox.options[ageBox.selectedIndex].text;
      var race = raceBox.options[raceBox.selectedIndex].text;
      var edu = eduBox.options[eduBox.selectedIndex].text;
      var house = houseBox.options[houseBox.selectedIndex].text;

      if (gender == "Choose..." || age == "Choose..." || race == "Choose..." || edu == "Choose..." ||house == "Choose..."){
        document.getElementById("demoErr").style.display = "inline-block";
      } else {
        document.getElementById("demoErr").style.display = "none";
        saveUserData(uid, age, gender, race, edu, house);

        location.href = "#top";
        theSlide.className = "active-slide";
        document.querySelector("#top h2").innerHTML = "Well Done!"
        document.querySelector("#top h6").innerHTML = "You have completed the quiz. If you're interested, below is your mean score and also your answers compared to the actual ones, sorted by highest to lowest score (reading this is optional).";
        document.getElementById("nextBtn").style.display = "inline-block";
        var totalScore = 0;
        for (var s1 = 1; s1 < 39; s1++){
          var qnum = "question" + (s1);
          totalScore += userScores[qnum];
        }

        var meanScore = Math.round(totalScore / 38);
        theSlide.innerHTML = "";
        var scoreLbl = document.createElement("h5");
        var theScore = document.createElement("h4");
        scoreLbl.innerHTML = "Your Mean Score: ";
        theSlide.appendChild(scoreLbl);
        theScore.innerHTML = meanScore;
        theSlide.appendChild(theScore);

        delete userScores.question39;
        /*
        sorting js object
        taken from https://stackoverflow.com/a/1069840/12239467
        accessed 26-10-20
        */
        var sortable = [];
        for (var item in userScores){
          sortable.push([item, userScores[item]]);
        }

        sortable.sort(function(a, b){
          return a[1] - b[1];
        });
        // end of referenced code
        sortable.reverse();

        var topNextBtn = document.createElement('button');
        topNextBtn.innerHTML = "next >>";
        topNextBtn.style.float = "right";
        topNextBtn.className = "btn btn-primary my-md-3";
        topNextBtn.type = "button";
        theSlide.appendChild(topNextBtn);

        addRow(theSlide);

        var vis = document.createElement("div");
        vis.id = "vis";
        theSlide.appendChild(vis);

        for (var ind = 0; ind < sortable.length; ind++){
          var qlbl = document.createElement("label");
          var q = sortable[ind][0];
          var num = parseInt(q.replace("question", ""), 10);
          qlbl.id = "questionLbl" + num;
          vis.appendChild(qlbl);
          addRow(vis);
          addRow(vis);
          createChart(values, num);
          createChart(trueAnswers, num);
          addRow(vis);
        }

        window.onbeforeunload = null;
        var btnarray = [nextBtn, topNextBtn]
        for (var item = 0; item < btnarray.length; item++){
          btnarray[item].onclick = function(){
            sortable.reverse();
            var uid = getCookie();
            var worst = sortable[0][0];
            var secondWorst = sortable[1][0];
            var worstNum = parseInt(worst.replace("question", ""), 10);
            var secondWorstNum = parseInt(secondWorst.replace("question", ""), 10);
            var worstOnum = "options" + worstNum;
            var worstQcode = qcodes[worstNum-1];
            var worstConf = "wConf" + worstNum;


            var secondWorstConf = "wConf" + secondWorstNum;
            var secondWorstOnum = "options" + secondWorstNum;
            var swQcode = qcodes[secondWorstNum];

            worstQs(theSlide, worstNum, 39, worstAns);


            document.getElementById(worstConf).onclick = function(){
              writeData(uid, "re_assessment", worstQcode, worstAns.length, worstAns);
              worstQs(theSlide, secondWorstNum, 39, sworstAns);
              document.getElementById(secondWorstConf).onclick =  function(){
                writeData(uid, "re_assessment", swQcode, sworstAns.length, sworstAns);
                setTimeout(function(){
                  window.location.href = "feedback.html";
                }, 500);

              };
            }
          };
        }
      };
    };
  });

};

function worstQs(theSlide, worstNum, n, array){
  document.getElementById("nextBtn").style.display = "none";
  var oNum = "options" + worstNum;
  var barNum = "bars" + n;
  theSlide.innerHTML = ""
  document.querySelector("#top h6").innerHTML = "We will now test you again on the two questions you scored lowest on. This was your lowest scoring question:";
  var qlbl = document.createElement("label");
  qlbl.innerHTML = qs[worstNum-1];
  theSlide.appendChild(qlbl);
  addRow(theSlide);
  for (var o = 0; o < options[oNum].length; o++){
    var lbl = document.createElement("label");
    lbl.innerHTML = options[oNum][o];
    theSlide.appendChild(lbl);
    addRow(theSlide);
    var count = Math.floor(100/options[oNum].length);
    var extra = 0;
    if (count == 100){
      extra = 0;
    } else {
      extra = 100 - (count*(options[oNum].length));
    }
    if (o == 0){
      addSliders(theSlide, count + extra);
    }
    else {
    addSliders(theSlide, count);
    }

    addRow(theSlide);
  }
  j = 1;
  var wConfBtn = document.createElement('button');
  wConfBtn.className = "btn btn-primary my-md-3";
  wConfBtn.type = "button";
  wConfBtn.innerHTML = "Confirm & Next";
  wConfBtn.id = "wConf" + worstNum;
  theSlide.appendChild(wConfBtn);

  if (hbars[barNum].length == 2){
    array[0] = 50;
    array[1] = 50;
    for (var b = 0; b < hbars[barNum].length; b++){
      document.getElementById(hbars[barNum][b]).addEventListener('input', function(){
        var str = this.id;
        var ind = parseInt(str.substr(6), 10) - 1;
        var bar1 = document.getElementById(hbars[barNum][0]);
        var bar2 = document.getElementById(hbars[barNum][1]);
        var span1 = document.getElementById(barSpans[barNum][0]);
        var span2 = document.getElementById(barSpans[barNum][1]);
        if (ind == 0){
          span1.innerHTML = bar1.value + "%";
          bar2.value = 100 - bar1.value;
          span2.innerHTML = bar2.value + "%";
        } else {
          span2.innerHTML = bar2.value + "%";
          bar1.value = 100 - bar2.value;
          span1.innerHTML = bar1.value + "%";
        }
        array[0] = bar1.value;
        array[1] = bar2.value;
      })
    }
  } else {
    array[0] = 34;
    array[1] = 33;
    array[2] = 33;
    var prop = 0.5;
    for (var b = 0; b < hbars[barNum].length; b++){
      document.getElementById(hbars[barNum][b]).addEventListener('input', function(){
        var str = this.id;
        var ind = parseInt(str.substr(6), 10) - 1;
        var bar1 = document.getElementById(hbars[barNum][0]);
        var bar2 = document.getElementById(hbars[barNum][1]);
        var bar3 = document.getElementById(hbars[barNum][2]);
        var span1 = document.getElementById(barSpans[barNum][0]);
        var span2 = document.getElementById(barSpans[barNum][1]);
        var span3 = document.getElementById(barSpans[barNum][2]);




        if (ind == 0){
          span1.innerHTML = bar1.value + "%";
          bar3.value = 100 - bar1.value - bar2.value;
          span3.innerHTML = bar3.value + "%";
          if (bar3.value == 0){
            span3.innerHTML = "0%";
            bar2.value = 100 - bar1.value;
            span2.innerHTML = bar2.value + "%";
          }
          prop = (bar1.value)/(100-bar2.value);



        } else if (ind == 2){
          span3.innerHTML = bar3.value + "%";
          bar1.value = 100 - bar2.value - bar3.value;
          span1.innerHTML = bar1.value + "%";
          if (bar1.value == 0){
            span1.innerHTML = "0%";
            bar2.value = 100 - bar3.value;
            span2.innerHTML = bar2.value + "%";
          }
          prop = (bar1.value)/(100-bar2.value);

        } else {

          span2.innerHTML = bar2.value + "%";
          var diff = 100 - bar2.value;
          bar1.value = Math.floor(diff*prop);
          span1.innerHTML = bar1.value + "%";
          bar3.value = 100 - bar1.value - bar2.value;
          span3.innerHTML = bar3.value + "%";
          if (bar3.value == 0){
            span3.innerHTML = "0%";
            bar1.value = 100 - bar2.value;
            span1.innerHTML = bar1.value + "%";
          }
          if (bar1.value == 0){
            span1.innerHTML = "0%";
            bar3.value = 100 - bar2.value;
            span3.innerHTML = bar3.value + "%";
          }


        }

        array[0] = bar1.value;
        array[1] = bar2.value;
        array[2] = bar3.value;
      });
    }
  }
}

// reads in scoring csv file and adds the original BSAS results into arrays
var ansIndexNum = 0;
function readTrueAns(file){
  d3.csv(file).then(function(data){
    data.forEach(function(d){
      ansIndexNum++;
      var ansIndex = "answers" + ansIndexNum;
      var qIndex = "question" + ansIndexNum;

      trueAnswers[ansIndex][0] = parseInt(d.score1);
      trueAnswers[ansIndex][1] = parseInt(d.score2);
      if (d.Option3 != ""){
        trueAnswers[ansIndex][2] = parseInt(d.score3);
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
  });
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
code to save data to firebase
taken and adapted from https://firebase.google.com/docs/database/web/read-and-write
accessed 21-07-20
*/

// saves users answers to the database
function writeData(uid, section, qcode, num, answers){
  if (num == 2){
    firebase.database().ref('/' + uid + '/' + section + '/' + qcode + '/guess_of_public/').set({
      opt1: answers[num-2],
      opt2: answers[num-1]
    });
  }
  if (num == 3){
    firebase.database().ref('/' + uid + '/' + section + '/' + qcode + '/guess_of_public/').set({
      opt1: answers[num-3],
      opt2: answers[num-2],
      opt3: answers[num-1]
    });
  }
};

// time stamp for each question
function saveTime(uid, section, qcode, time){
  firebase.database().ref('/' + uid + '/' + section + '/' + qcode + '/timer/').set({
    Timer: time
  });
}

// save the user's actual answer
function writeAnswer(uid, section, qcode, ans){
  firebase.database().ref('/' + uid + '/' + section + '/' + qcode + '/their_answer/').set({
    answer: ans
  });
};

// save political knowledge test results
function saveTest(uid, vals){
  firebase.database().ref('/' + uid + '/political_knowledge_test/').set({
    paperYN: vals[0],
    paper: vals[1],
    webYN: vals[2],
    web: vals[3],
    tvYN: vals[4],
    political_interest: vals[5],
    party_vote: vals[6],
    speaker_HOC: vals[7],
    brexit: vals[8],
    sci_advisor: vals[9],
    unemployment: vals[10],
    seats_HOC: vals[11],
    fiveG: vals[12],
    elec_source: vals[13],
    party_HOC: vals[14],
    alert: vals[15],
    alert_text: vals[16]
  });
};

// function to save user details
function saveUserData(uid, age, gender, race, edu, house){
  firebase.database().ref('/' + uid + '/details/').set({
    age: age,
    gender: gender,
    race: race,
    education: edu,
    adults_in_house: house
  });
};

function saveClassSurvey(uid, ans){
  firebase.database().ref('/' + uid + '/details/class_survey/').set({
    class: ans
  });
};


// Calculate and save user score
function saveUserScore(uid, user_answers, true_answers, section, qcode, qnum){
  var userScore = sumDiff(user_answers, true_answers);
  var normScore = Math.round(100*(means[qnum] - userScore)/stanDs[qnum])
  userScores[qnum] = normScore;
  firebase.database().ref('/' + uid + '/' + section + '/' + qcode + '/score/').set({
    score: normScore
  });
};
// save user feedback to firebase
function saveFeedback(uid, vals, text){
  firebase.database().ref('/' + uid + '/feedback/').set({
    change_opinion: vals[0],
    interesting: vals[1],
    other_fb: text
  });
};

function alertnessTest(uid, test, fail){
  firebase.database().ref('/' + uid + '/alertness_tests/' + test + '/').set({
    failed: fail
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



var fback = []
var fback_checked = 0;
// functionality for the feedback section of the quiz
if ($('body').is('.feedback')){
  var uid = getCookie();
  var yesRad = document.getElementById("yesChange");
  var noRad = document.getElementById("noChange");
  var notRad = document.getElementById("intNo");
  var litRad = document.getElementById("intLittle");
  var quiteRad = document.getElementById("intQuite");
  var veryRad = document.getElementById("intVery");
  var txtArea = document.getElementById("openFeedback");
  var fbform = document.getElementById("userFeedback")

  yesRad.addEventListener('click', function(){
    noRad.checked = false;
    fback[0] = "Yes";
    fback_checked += 1;
  });

  noRad.addEventListener('click', function(){
    yesRad.checked = false;
    fback[0] = "No";
    fback_checked += 1;
  });

  notRad.addEventListener('click', function(){
    litRad.checked = false;
    quiteRad.checked = false;
    veryRad.checked = false;
    fback[1] = "Not at all";
    fback_checked += 1;
  });

  litRad.addEventListener('click', function(){
    notRad.checked = false;
    quiteRad.checked = false;
    veryRad.checked = false;
    fback[1] = "A little";
    fback_checked += 1;
  });

  quiteRad.addEventListener('click', function(){
    litRad.checked = false;
    notRad.checked = false;
    veryRad.checked = false;
    fback[1] = "Quite interesting";
    fback_checked += 1;
  });

  veryRad.addEventListener('click', function(){
    litRad.checked = false;
    quiteRad.checked = false;
    notRad.checked = false;
    fback[1] = "Very interesting";
    fback_checked += 1;
  });

  document.getElementById("fbackConfirm").addEventListener('click', function(){
    if (fback_checked < 2){
      document.getElementById("fbErrText").style.display = "inline-block";
    } else {
      document.getElementById("fbErrText").className = "alert alert-success";
      document.getElementById("fbErrText").innerHTML = "Survey Code: " + uid;
      document.getElementById("fbErrText").style.display = "inline-block";
      document.getElementById("mturk").innerHTML = "Survey Code: " + uid;
      document.getElementById("mturk").style.display = "inline-block";
      var txt = txtArea.value;
      saveFeedback(uid, fback, txt);
      yesRad.disabled = true;
      noRad.disabled = true;
      notRad.disabled = true;
      litRad.disabled = true;
      quiteRad.disabled = true;
      veryRad.disabled = true;
      txtArea.disabled = true;
    }
  })
}
