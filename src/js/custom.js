const d3 = require("d3");

/*
Setting cookie as user id
taken from https://www.w3schools.com/js/js_cookies.asp
accessed 26-10-20
*/
function setCookie() {
  var id = Date.now();
  var d = new Date();
  d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = "userid=" + id + ";" + expires + ";path=/";
}

function getCookie() {
  var decodedCookie = decodeURIComponent(document.cookie);
  var a = decodedCookie.split(";");
  var c = a[0].replace("userid=", "");
  return c;
}
// end of referenced code

function get_browser() {
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: "IE", version: tem[1] || "" };
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      return { name: "Opera", version: tem[1] };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1],
  };
}

function arraySize(array) {
  var size = 0,
    item;
  for (item in array) {
    if (array.hasOwnProperty(item)) {
      size++;
    }
  }
  return size;
}

if ($("body").is(".consent")) {
  setCookie();
  document.getElementById("agreeBtn").onclick = function () {
    var uid = getCookie();
    var d = new Date();
    var browser = get_browser();
    setTimestamp(uid, String(d), browser);
  };
}

var t1 = 0;
var testValues = [];

// political knowledge test section
if ($("body").is(".knowledge")) {
  var uid = getCookie();
  var startTime = Date.now();
  var noPaper = document.getElementById("noPaper");
  var yesPaper = document.getElementById("yesPaper");
  var yesSite = document.getElementById("yesNewsSite");
  var noSite = document.getElementById("noNewsSite");
  var yesTV = document.getElementById("yesTV");
  var noTV = document.getElementById("noTV");
  var yesSM = document.getElementById("yesSM");
  var noSM = document.getElementById("noSM");
  var testForm = document.getElementById("test");
  var partyBox = document.getElementById("pol_party");

  noPaper.addEventListener("click", function () {
    yesPaper.checked = false;
    testValues[0] = "No";
    document.getElementById("whatPaper").style.display = "none";
  });

  yesPaper.addEventListener("click", function () {
    noPaper.checked = false;
    testValues[0] = "Yes";
    document.getElementById("whatPaper").style.display = "block";
  });

  yesSite.addEventListener("click", function () {
    noSite.checked = false;
    testValues[2] = "Yes";
    document.getElementById("whichNewsSite").style.display = "block";
  });

  noSite.addEventListener("click", function () {
    yesSite.checked = false;
    testValues[2] = "No";
    document.getElementById("whichNewsSite").style.display = "none";
  });

  yesTV.addEventListener("click", function () {
    noTV.checked = false;
    testValues[4] = "Yes";
    document.getElementById("whatTV").style.display = "block";
  });

  noTV.addEventListener("click", function () {
    yesTV.checked = false;
    testValues[4] = "No";
    document.getElementById("whatTV").style.display = "none";
  });

  yesSM.addEventListener("click", function () {
    noSM.checked = false;
    testValues[6] = "Yes";
    document.getElementById("whatSM").style.display = "block";
  });

  noSM.addEventListener("click", function () {
    yesSM.checked = false;
    testValues[6] = "No";
    document.getElementById("whatSM").style.display = "none";
  });

  d3.csv("Sample-Data/test.csv").then(function (data) {
    data.forEach(function (d) {
      t1++;

      var radLblA = "radLblForTest" + (1 + 5 * (t1 - 1));
      var radLblB = "radLblForTest" + (2 + 5 * (t1 - 1));
      var radLblC = "radLblForTest" + (3 + 5 * (t1 - 1));
      var radLblD = "radLblForTest" + (4 + 5 * (t1 - 1));
      var radLblE = "radLblForTest" + (5 + 5 * (t1 - 1));

      var radA = "radForTest" + (1 + 5 * (t1 - 1));
      var radB = "radForTest" + (2 + 5 * (t1 - 1));
      var radC = "radForTest" + (3 + 5 * (t1 - 1));
      var radD = "radForTest" + (4 + 5 * (t1 - 1));
      var radE = "radForTest" + (5 + 5 * (t1 - 1));

      var testRads = [radA, radB, radC, radD, radE];
      var testRadLbls = [radLblA, radLblB, radLblC, radLblD, radLblE];

      d3.select("#test").append("label").text(d.Question);
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

      addTestRads(test);
      document.getElementById(radLblE).innerHTML = d.Option5;
      addRow(testForm);

      for (var t2 = 0; t2 < arraySize(testRads); t2++) {
        document
          .getElementById(testRads[t2])
          .addEventListener("click", function () {
            var theRad = this;
            var str = theRad.id;
            var radNum = parseInt(str.substr(10), 10);
            var ind = Math.floor(radNum / 5.1) + 9;
            var newStr = str.replace("rad", "radLbl");
            testValues[ind] = document.getElementById(newStr).innerHTML;
            for (var t3 = 0; t3 < arraySize(testRads); t3++) {
              if (theRad != document.getElementById(testRads[t3])) {
                document.getElementById(testRads[t3]).checked = false;
              }
            }
          });
        document
          .getElementById(testRadLbls[t2])
          .addEventListener("click", function () {
            var theRadLbl = this;
            var str = theRadLbl.id;
            var radNum = parseInt(str.substr(13), 10);
            var ind = Math.floor(radNum / 5.1) + 9;
            testValues[ind] = theRadLbl.innerHTML;
            var newStr = str.replace("radLbl", "rad");
            var activeRad = document.getElementById(newStr);
            activeRad.checked = true;
            for (var t5 = 0; t5 < arraySize(testRads); t5++) {
              if (activeRad != document.getElementById(testRads[t5])) {
                document.getElementById(testRads[t5]).checked = false;
              }
            }
          });
      }
    });

    var testErr = document.createElement("div");
    testErr.style.display = "none";
    testErr.className = "alert alert-danger";
    testErr.role = "alert";
    testErr.innerHTML = "*Please complete all questions";
    testErr.id = "testErr";
    testForm.appendChild(testErr);
    addRow(testForm);

    var testBtn = document.createElement("button");
    testBtn.type = "button";
    testBtn.className = "btn btn-primary my-md-3";
    testBtn.innerHTML = "Submit & Next";
    testBtn.id = "testBtn";
    testForm.appendChild(testBtn);

    testBtn.addEventListener("click", function () {
      var checkedRads = 0;
      var radiosList = document.querySelectorAll(".radio");
      var radios = Array.from(radiosList);
      for (var t4 = 0; t4 < arraySize(radios); t4++) {
        if (radios[t4].checked == true) {
          checkedRads++;
        }
      }
      var party = partyBox.options[partyBox.selectedIndex].text;
      testValues[1] = document.getElementById("whatPaper").value;
      testValues[3] = document.getElementById("whichNewsSite").value;
      testValues[5] = document.getElementById("whatTV").value;
      testValues[7] = document.getElementById("whatSM").value;
      testValues[8] = party;

      if (checkedRads != 8 || party == "Choose...") {
        testErr.style.display = "inline-block";
      } else {
        testErr.style.display = "none";
        var endTime = Date.now();
        var difference = (endTime - startTime) / 1000;
        saveTest(uid, testValues, difference);
      }
    });
  });
}

var startTime;
var i = 0;
var size = 1.5;
if (window.matchMedia("(max-width: 500px)").matches) {
  size = 0.85;
}

// functions to add horizontal bars, buttons and rows to the queston form

const qform = document.getElementById("questions");
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
var maxScores = [];
var diffs = [];

function addRow(slide) {
  const newRow = document.createElement("div");
  newRow.className = "form-row my-md-3";
  slide.appendChild(newRow);
  const col = document.createElement("div");
  col.className = "col-md-6";
  newRow.appendChild(col);
}

function addRads(slide) {
  var radCol = document.createElement("div");
  radCol.className = "col-md-6";
  slide.append(radCol);
  radCol.style.display = "inline-block";
  var rad = document.createElement("input");
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

function addTestRads(slide) {
  var radCol = document.createElement("div");
  radCol.className = "col-md-6";
  slide.append(radCol);
  radCol.style.display = "inline-block";
  var rad = document.createElement("input");
  rad.type = "radio";
  rad.className = "radio";
  rad.id = "radForTest" + t;
  radCol.appendChild(rad);
  var radLbl = document.createElement("label");
  radLbl.className = "radLbl";
  radLbl.id = "radLblForTest" + t;
  radLbl.for = "radForTest" + t;
  radCol.appendChild(radLbl);

  t++;
}

var slideNo = 1;
var currentSlideID = "slide" + slideNo;

function addSliders(slide, numOfOpts, options, arrayOfValues, keyForValues) {
  var col = document.createElement("div");
  col.className = "col-md-6";
  slide.appendChild(col);
  if (numOfOpts == 2) {
    var label1 = document.createElement("label");
    var bar1 = document.createElement("input");
    var span1 = document.createElement("span");
    label1.innerHTML = options[0];
    col.appendChild(label1);
    addRow(col);
    bar1.type = "range";
    bar1.className = "form-control-range";
    bar1.value = 50;
    col.appendChild(bar1);
    col.appendChild(span1);
    span1.className = "font-weight-bold text-primary ml-2 mt-1";
    span1.innerHTML = bar1.value + "%";

    addRow(col);

    var label2 = document.createElement("label");
    var bar2 = document.createElement("input");
    var span2 = document.createElement("span");
    label2.innerHTML = options[1];
    col.appendChild(label2);
    addRow(col);
    bar2.type = "range";
    bar2.className = "form-control-range";
    bar2.value = 50;
    col.appendChild(bar2);
    col.appendChild(span2);
    span2.className = "font-weight-bold text-primary ml-2 mt-1";
    span2.innerHTML = bar2.value + "%";

    if (keyForValues !== "") {
      arrayOfValues[keyForValues][0] = bar1.value;
      arrayOfValues[keyForValues][1] = bar2.value;
    } else {
      arrayOfValues[0] = bar1.value;
      arrayOfValues[1] = bar2.value;
    }

    bar1.addEventListener("input", () => {
      span1.innerHTML = bar1.value + "%";
      bar2.value = 100 - bar1.value;
      span2.innerHTML = bar2.value + "%";

      if (keyForValues !== "") {
        arrayOfValues[keyForValues][0] = bar1.value;
        arrayOfValues[keyForValues][1] = bar2.value;
      } else {
        arrayOfValues[0] = bar1.value;
        arrayOfValues[1] = bar2.value;
      }
    });

    bar2.addEventListener("input", () => {
      span2.innerHTML = bar2.value + "%";
      bar1.value = 100 - bar2.value;
      span1.innerHTML = bar1.value + "%";

      if (keyForValues !== "") {
        arrayOfValues[keyForValues][0] = bar1.value;
        arrayOfValues[keyForValues][1] = bar2.value;
      } else {
        arrayOfValues[0] = bar1.value;
        arrayOfValues[1] = bar2.value;
      }
    });
  } else {
    var label1 = document.createElement("label");
    var bar1 = document.createElement("input");
    var span1 = document.createElement("span");
    label1.innerHTML = options[0];
    col.appendChild(label1);
    addRow(col);
    bar1.type = "range";
    bar1.className = "form-control-range";
    bar1.value = 33;
    col.appendChild(bar1);
    col.appendChild(span1);
    span1.className = "font-weight-bold text-primary ml-2 mt-1";
    span1.innerHTML = bar1.value + "%";

    addRow(col);

    var label2 = document.createElement("label");
    var bar2 = document.createElement("input");
    var span2 = document.createElement("span");
    label2.innerHTML = options[1];
    col.appendChild(label2);
    addRow(col);
    bar2.type = "range";
    bar2.className = "form-control-range";
    bar2.value = 33;
    col.appendChild(bar2);
    col.appendChild(span2);
    span2.className = "font-weight-bold text-primary ml-2 mt-1";
    span2.innerHTML = bar2.value + "%";

    addRow(col);

    var label3 = document.createElement("label");
    var bar3 = document.createElement("input");
    var span3 = document.createElement("span");
    label3.innerHTML = options[2];
    col.appendChild(label3);
    addRow(col);
    bar3.type = "range";
    bar3.className = "form-control-range";
    bar3.value = 34;
    col.appendChild(bar3);
    col.appendChild(span3);
    span3.className = "font-weight-bold text-primary ml-2 mt-1";
    span3.innerHTML = bar3.value + "%";

    if (keyForValues != "") {
      arrayOfValues[keyForValues][0] = bar1.value;
      arrayOfValues[keyForValues][1] = bar2.value;
      arrayOfValues[keyForValues][2] = bar3.value;
    } else {
      arrayOfValues[0] = bar1.value;
      arrayOfValues[1] = bar2.value;
      arrayOfValues[2] = bar3.value;
    }

    var prop = 0.5;
    bar1.addEventListener("input", () => {
      span1.innerHTML = bar1.value + "%";
      bar2.value = 100 - bar1.value - bar3.value;
      span2.innerHTML = bar2.value + "%";
      if (bar2.value == 0) {
        span2.innerHTML = "0%";
        bar3.value = 100 - bar1.value;
        span3.innerHTML = bar3.value + "%";
      }
      prop = bar1.value / (100 - bar3.value);
      if (keyForValues != "") {
        arrayOfValues[keyForValues][0] = bar1.value;
        arrayOfValues[keyForValues][1] = bar2.value;
        arrayOfValues[keyForValues][2] = bar3.value;
      } else {
        arrayOfValues[0] = bar1.value;
        arrayOfValues[1] = bar2.value;
        arrayOfValues[2] = bar3.value;
      }
    });

    bar2.addEventListener("input", () => {
      span2.innerHTML = bar2.value + "%";
      bar1.value = 100 - bar2.value - bar3.value;
      span1.innerHTML = bar1.value + "%";
      if (bar1.value == 0) {
        span1.innerHTML = "0%";
        bar3.value = 100 - bar2.value;
        span3.innerHTML = bar3.value + "%";
      }
      prop = bar1.value / (100 - bar3.value);
      if (keyForValues != "") {
        arrayOfValues[keyForValues][0] = bar1.value;
        arrayOfValues[keyForValues][1] = bar2.value;
        arrayOfValues[keyForValues][2] = bar3.value;
      } else {
        arrayOfValues[0] = bar1.value;
        arrayOfValues[1] = bar2.value;
        arrayOfValues[2] = bar3.value;
      }
    });

    bar3.addEventListener("input", () => {
      span3.innerHTML = bar3.value + "%";
      var diff = 100 - bar3.value;
      bar1.value = Math.floor(diff * prop);
      span1.innerHTML = bar1.value + "%";
      bar2.value = 100 - bar1.value - bar3.value;
      span2.innerHTML = bar2.value + "%";
      if (bar1.value == 0) {
        span1.innerHTML = "0%";
        bar2.value = 100 - bar3.value;
        span2.innerHTML = bar2.value + "%";
      }
      if (bar2.value == 0) {
        span2.innerHTML = "0%";
        bar1.value = 100 - bar3.value;
        span1.innerHTML = bar1.value + "%";
      }
      if (keyForValues != "") {
        arrayOfValues[keyForValues][0] = bar1.value;
        arrayOfValues[keyForValues][1] = bar2.value;
        arrayOfValues[keyForValues][2] = bar3.value;
      } else {
        arrayOfValues[0] = bar1.value;
        arrayOfValues[1] = bar2.value;
        arrayOfValues[2] = bar3.value;
      }
    });
  }
}

/*
loading in questions from a csv file and calling other functions to create the quiz
code taken and adapted from https://stackoverflow.com/questions/29259938/how-to-load-csv-file-to-use-with-d3
accessed 12-07-20
*/
function readData(file, section) {
  d3.csv(file).then(function (data) {
    data.forEach(function (d) {
      i++;

      var slide = document.createElement("div");
      slide.className = "slide";
      slide.id = "slide" + i;
      var slideID = "#slide" + i;
      qform.appendChild(slide);
      var uid = getCookie();

      var questionNum = "question" + i;
      var valuesNum = "values" + i;
      var optionsNum = "options" + i;
      var radsNum = "rads" + i;
      var radLblsNum = "radLbls" + i;
      var numOfOpts = 0;
      var ansIndexNum = "answers" + i;

      d3.select(slideID)
        .append("label")
        .text("( " + i + " / 21 ). " + d.Question);
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

      if (d.Option3 != "") {
        addRads(slide);
        document.getElementById(radLbls[radLblsNum][2]).innerHTML = d.Option3;
        options[optionsNum].push(d.Option3);
        numOfOpts++;
        addRow(slide);
      }

      var qcode = d.key;
      var year = d.year;
      qcodes.push(qcode);

      if (qcode != "covid19") {
        addRow(slide);
        d3.select(slideID)
          .append("label")
          .text(
            "What percentage of the British public do you think chose each answer? "
          );
        var yearlbl = document.createElement("i");
        yearlbl.innerHTML = " (Data from the year " + year + ")";
        slide.appendChild(yearlbl);
        addRow(slide);

        addSliders(slide, numOfOpts, options[optionsNum], values, valuesNum);
      }

      // end of referenced code

      var radErrText = document.createElement("div");
      radErrText.innerHTML = "*Please select your answer to the question";
      radErrText.id = "radErrText" + i;
      radErrText.className = "alert alert-danger";
      radErrText.role = "alert";
      radErrText.style.display = "none";
      slide.appendChild(radErrText);
      var radErrTextID = "radErrText" + i;

      addRow(slide);

      var confBtn = document.createElement("button");
      confBtn.type = "button";
      confBtn.innerHTML = "Confirm";
      confBtn.id = "confirm" + i;
      confBtn.className = "btn btn-primary my-md-3";
      slide.appendChild(confBtn);
      var conBtnID = "confirm" + i;

      addRow(slide);

      // ensuring only one radio button can be checked at a time
      for (var r3 = 0; r3 < arraySize(rads[radsNum]); r3++) {
        document
          .getElementById(rads[radsNum][r3])
          .addEventListener("click", function () {
            var theRad = this;
            for (var r4 = 0; r4 < arraySize(rads[radsNum]); r4++) {
              if (theRad != document.getElementById(rads[radsNum][r4])) {
                document.getElementById(rads[radsNum][r4]).checked = false;
              }
            }
          });
        document
          .getElementById(radLbls[radLblsNum][r3])
          .addEventListener("click", function () {
            var theRadLbl = this;
            var str = theRadLbl.id;
            var newStr = str.replace("radLbl", "radio");
            var activeRad = document.getElementById(newStr);
            activeRad.checked = true;
            for (var r5 = 0; r5 < arraySize(rads[radsNum]); r5++) {
              if (activeRad != document.getElementById(rads[radsNum][r5])) {
                document.getElementById(rads[radsNum][r5]).checked = false;
              }
            }
          });
      }

      // submitting data and disabling buttons after the confirm button is clicked
      document.getElementById(conBtnID).addEventListener("click", function () {
        document.getElementById(conBtnID).disabled = true;
        var endTime = Date.now();
        var difference = (endTime - startTime) / 1000;
        saveTime(uid, section, qcode, difference);
        if (qcode != "covid19") {
          writeData(
            uid,
            section,
            qcode,
            arraySize(options[optionsNum]),
            values[valuesNum]
          );
          saveUserScore(
            uid,
            values[valuesNum],
            trueAnswers[ansIndexNum],
            section,
            qcode,
            questionNum
          );
        }

        var selected = 0;
        for (var r2 = 0; r2 < arraySize(rads[radsNum]); r2++) {
          if (document.getElementById(rads[radsNum][r2]).checked == true) {
            selected++;
            var ans = document.getElementById(radLbls[radLblsNum][r2])
              .innerHTML;
            writeAnswer(uid, section, qcode, ans);
          }
        }
        if (selected == 0) {
          document.getElementById(conBtnID).type = "button";
          document.getElementById(conBtnID).disabled = false;
          document.getElementById(radErrTextID).style.display = "block";
        } else {
          document.getElementById(radErrTextID).style.display = "none";
          if (qcode != "covid19") {
            slideNo++;
            var nextSlide = "slide" + slideNo;
            showSlide(nextSlide, currentSlideID, slideNo);
            currentSlideID = "slide" + slideNo;
            startTime = Date.now();
            window.scrollBy(0, -500);
          }
        }
      });

      j = 1;
      k = 1;
    });
    showSlide(currentSlideID, currentSlideID, slideNo);
  });
}

if ($("body").is(".quiz1")) {
  readData("Sample-Data/questions.csv", "answers");
  readTrueAns("Sample-Data/questions.csv");
  const nextBtn = document.getElementById("nextBtn");
  window.addEventListener("load", function () {
    startTime = Date.now();
  });

  window.onbeforeunload = function () {
    return "Are you sure? All of your progress will be lost.";
  };
}

for (var num = 0; num < 21; num++) {
  var v = "values" + (num + 1);
  var barsNum = "bars" + (num + 1);
  var opt = "options" + (num + 1);
  var r = "rads" + (num + 1);
  var rl = "radLbls" + (num + 1);
  var tr = "answers" + (num + 1);
  var q = "question" + (num + 1);
  values[v] = [];
  hbars[barsNum] = [];
  barSpans[barsNum] = [];
  options[opt] = [];
  rads[r] = [];
  radLbls[rl] = [];
  trueAnswers[tr] = [];
  userScores[q] = 0;
}

/*
making one question appear at a time using slides
taken from https://www.sitepoint.com/simple-javascript-quiz/
accessed 14-09-20
*/
function showSlide(n, currentSlideID, slideNo) {
  document.getElementById(currentSlideID).className = "slide";
  document.getElementById(n).className = "active-slide";
  // end of referenced code
  if (slideNo == i) {
    document.getElementById("nextBtn").style.display = "none";
    finalSlides();
  }
}

// creates a bar chart using d3
function createChart(data, qIndex) {
  var vis = document.getElementById("vis");

  var width = 500;
  var height = 600;
  var bottomMar = 200;

  if (qIndex == 5 || qIndex == 17 || qIndex == 20) {
    height = 700;
    bottomMar = 380;
  }

  if (window.matchMedia("(max-width: 500px)").matches) {
    width = 300;
  }

  var maxValue = 100;

  var margin = {
    top: 30,
    left: 70,
    right: 30,
    bottom: bottomMar,
  };

  var svg = d3
    .select("#vis")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.top + "," + margin.left + ")");

  width = width - margin.left - margin.right;
  height = height - margin.top - margin.bottom;

  var yscale = d3.scaleLinear().range([height, 0]).domain([0, maxValue]);

  var xscale = d3.scaleBand().range([0, width]).padding(0.1);

  var duration = 1000;

  var xaxis = d3.axisBottom(xscale);
  var yaxis = d3.axisLeft(yscale);

  svg
    .append("g")
    .attr("transform", "translate(0, " + height + ")")
    .attr("class", "x axis");

  svg.append("g").attr("class", "y axis");

  if (data == values) {
    var vNum = "values" + qIndex;
    var fill = "#e3546c";
    var title = "Your Answers";
  } else {
    var vNum = "answers" + qIndex;
    var fill = "#042975";
    var title = "Actual Answers";
  }

  var oNum = "options" + qIndex;
  var qNum = "question" + qIndex;

  var qlblID = "questionLbl" + qIndex;
  document.getElementById(qlblID).innerHTML = qIndex + ". " + qs[qIndex - 1];

  var rLblID = "resultLbl" + qIndex;
  document.getElementById(rLblID).innerHTML =
    "Question difficulty: " +
    diffs[qIndex - 1] +
    ". Points available: " +
    Math.round(maxScores[qIndex - 1] / 10) +
    ". You scored: " +
    Math.round(userScores[qNum] / 10);

  xscale.domain(options[oNum]);
  yscale.domain([0, maxValue]);

  var bars = svg.selectAll(".bar").data(data[vNum]);

  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("fill", fill)
    .attr("width", xscale.bandwidth())
    .attr("height", 0)
    .attr("y", height)
    .merge(bars)
    .transition()
    .duration(duration)
    .attr("height", function (d, i) {
      return height - yscale(d);
    })
    .attr("y", function (d, i) {
      return yscale(d);
    })
    .attr("width", xscale.bandwidth())
    .attr("x", function (d, i) {
      return xscale(options[oNum][i]);
    });

  /*
adding a title to the chart
taken from https://stackoverflow.com/a/11194968/12239467
accessed 20-10-20
*/
  svg
    .append("text")
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .attr("y", 0 - margin.top)
    .attr("x", 0 + width / 2)
    .text(title);
  // end of referenced code

  /*
rotating x-axis labels
taken from https://stackoverflow.com/a/16863559/12239467
accessed 29-10-20
*/
  svg
    .select(".x.axis")
    .transition()
    .duration(duration)
    .call(xaxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  // end of referenced code

  svg.select(".y.axis").transition().duration(duration).call(yaxis);
}

function finalSlides() {
  var uid = getCookie();
  var slideID = "slide21";
  var theSlide = document.getElementById(slideID);
  var conID = "confirm21";
  document.querySelector("#top h6").innerHTML =
    "No sliders for this question! Please select your answer: ";
  document.getElementById(conID).addEventListener("click", function () {
    var startTime = Date.now();
    document.getElementById("nextBtn").style.display = "none";
    var num = 0;
    theSlide.innerHTML = "";
    location.href = "#top";
    theSlide.className = "active-slide";
    document.querySelector("#top h2").innerHTML = "Nearly There!";
    document.querySelector("#top h6").innerHTML = "";
    var heading = document.createElement("h6");
    heading.innerHTML =
      "Please answer the following demographic questions, we will then compute your score.";
    theSlide.appendChild(heading);
    addRow(theSlide);
    var demoDiv = document.createElement("div");
    var link = document.createElement("a");
    var linkTxt = document.createTextNode(
      " https://www.bbc.co.uk/news/magazine-22000973"
    );
    link.appendChild(linkTxt);
    link.title = " https://www.bbc.co.uk/news/magazine-22000973";
    link.href = "https://www.bbc.co.uk/news/magazine-22000973";
    link.target = "_blank";
    var classLbl = document.createElement("label");
    classLbl.innerHTML =
      "Please take the Great British Class Survey available at the following link (5 questions, opens in new window)";
    theSlide.appendChild(demoDiv);
    demoDiv.appendChild(classLbl);
    demoDiv.append(link);
    addRow(demoDiv);
    d3.csv("Sample-Data/demographics.csv").then(function (data) {
      data.forEach(function (d) {
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
        if (d.Option3 != "") {
          d3.select(boxID).append("option").text(d.Option3);
        }
        if (d.Option4 != "") {
          d3.select(boxID).append("option").text(d.Option4);
        }
        if (d.Option5 != "") {
          d3.select(boxID).append("option").text(d.Option5);
        }
        if (d.Option6 != "") {
          d3.select(boxID).append("option").text(d.Option6);
        }
        if (d.Option7 != "") {
          d3.select(boxID).append("option").text(d.Option7);
        }
        if (d.Option8 != "") {
          d3.select(boxID).append("option").text(d.Option8);
        }
        if (d.Option9 != "") {
          d3.select(boxID).append("option").text(d.Option9);
        }
        if (d.Option10 != "") {
          d3.select(boxID).append("option").text(d.Option10);
        }
        if (d.Option11 != "") {
          d3.select(boxID).append("option").text(d.Option11);
        }
        if (d.Option12 != "") {
          d3.select(boxID).append("option").text(d.Option12);
        }
        if (d.Option13 != "") {
          d3.select(boxID).append("option").text(d.Option13);
        }

        addRow(demoDiv);
      });
    });

    var btnDiv = document.createElement("div");
    btnDiv.id = "btnDiv";
    theSlide.appendChild(btnDiv);

    var demoErr = document.createElement("div");
    demoErr.className = "alert alert-danger";
    demoErr.role = "alert";
    demoErr.id = "demoErr";
    demoErr.style.display = "none";
    demoErr.innerHTML = "*Please complete the whole form.";
    btnDiv.appendChild(demoErr);
    addRow(btnDiv);

    var demoBtn = document.createElement("button");
    demoBtn.type = "button";
    demoBtn.className = "btn btn-primary my-md-3";
    demoBtn.id = "demographicBtn";
    demoBtn.innerHTML = "Confirm & Next";
    btnDiv.appendChild(demoBtn);
    addRow(btnDiv);

    document.getElementById("demographicBtn").onclick = function () {
      var classBox = document.getElementById("dropdown1");
      var genderBox = document.getElementById("dropdown2");
      var ageBox = document.getElementById("dropdown3");
      var raceBox = document.getElementById("dropdown4");
      var eduBox = document.getElementById("dropdown5");
      var houseBox = document.getElementById("dropdown6");

      var classBracket = classBox.options[classBox.selectedIndex].text;
      var gender = genderBox.options[genderBox.selectedIndex].text;
      var age = ageBox.options[ageBox.selectedIndex].text;
      var race = raceBox.options[raceBox.selectedIndex].text;
      var edu = eduBox.options[eduBox.selectedIndex].text;
      var house = houseBox.options[houseBox.selectedIndex].text;
      var fail;

      if (
        classBracket == "Choose..." ||
        gender == "Choose..." ||
        age == "Choose..." ||
        race == "Choose..." ||
        edu == "Choose..." ||
        house == "Choose..."
      ) {
        document.getElementById("demoErr").style.display = "inline-block";
      } else {
        if (
          classBracket == "International Elite" ||
          classBracket == "Traditional Middle Class" ||
          classBracket == "Established Affluent Workers" ||
          classBracket == "Managerial Working Class" ||
          classBracket == "Self Employed Service Workers" ||
          classBracket == "Technical Affluent Workers"
        ) {
          fail = "Yes";
        } else {
          fail = "No";
        }
        alertnessTest(uid, "Class_Survey", fail);
        document.getElementById("demoErr").style.display = "none";
        var endTime = Date.now();
        var difference = (endTime - startTime) / 1000;
        saveUserData(
          uid,
          classBracket,
          age,
          gender,
          race,
          edu,
          house,
          difference
        );

        location.href = "#top";
        window.scrollBy(0, -200);
        theSlide.className = "active-slide";
        var startTime1 = Date.now();
        document.querySelector("#top h2").innerHTML = "Well Done!";
        document.querySelector("#top h6").innerHTML = "";
        var heading = document.createElement("h6");
        theSlide.appendChild(heading);
        addRow(theSlide);
        document.getElementById("nextBtn").style.display = "inline-block";
        var totalScore = 0;
        var totalMax = 0;
        for (var s1 = 1; s1 < 21; s1++) {
          var qnum = "question" + s1;
          totalScore += userScores[qnum];
          totalMax += maxScores[s1 - 1];
        }

        var roundScore = Math.round(totalScore);
        theSlide.innerHTML = "";
        var scoreLbl = document.createElement("h5");
        var theScore = document.createElement("label");
        scoreLbl.innerHTML = "Interested to know how you did? ";
        theSlide.appendChild(scoreLbl);
        theScore.innerHTML =
          "Your total score was " +
          Math.round(roundScore / 10) +
          " out of a possible " +
          Math.round(totalMax / 10) +
          " (" +
          Math.round((roundScore / totalMax) * 100) +
          "%). Below you can see how your guesses for each question compared to the real data, ordered from worst to best. Feel free to save or print this page if desired (once you click 'Next', you will not be able to retrieve these results).";
        saveFinalScore(uid, Math.round((roundScore / totalMax) * 100));
        theSlide.appendChild(theScore);

        delete userScores.question21;
        /*
        sorting js object
        taken from https://stackoverflow.com/a/1069840/12239467
        accessed 26-10-20
        */
        var sortable = [];
        for (var item in userScores) {
          sortable.push([item, userScores[item]]);
        }

        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });
        // end of referenced code

        var topNextBtn = document.createElement("button");
        topNextBtn.innerHTML = "finish viewing results and continue >>>";
        topNextBtn.style.float = "right";
        topNextBtn.className = "btn btn-primary my-md-3";
        topNextBtn.type = "button";
        theSlide.appendChild(topNextBtn);

        addRow(theSlide);

        var vis = document.createElement("div");
        vis.id = "vis";
        theSlide.appendChild(vis);

        for (var ind = 0; ind < arraySize(sortable); ind++) {
          var qlbl = document.createElement("label");
          var q = sortable[ind][0];
          var num = parseInt(q.replace("question", ""), 10);
          qlbl.id = "questionLbl" + num;
          var resultLbl = document.createElement("label");
          resultLbl.id = "resultLbl" + num;
          if (ind == 0) {
            var aLbl = document.createElement("label");
            aLbl.innerHTML = "Your lowest scoring answer: ";
            vis.appendChild(aLbl);
            addRow(vis);
          } else if (ind == 1) {
            var aLbl = document.createElement("label");
            aLbl.innerHTML = "Your second lowest scoring answer: ";
            vis.appendChild(aLbl);
            addRow(vis);
          }
          vis.appendChild(qlbl);
          addRow(vis);
          vis.appendChild(resultLbl);
          addRow(vis);
          addRow(vis);
          createChart(values, num);
          createChart(trueAnswers, num);
          addRow(vis);
        }

        window.onbeforeunload = null;
        var btnarray = [nextBtn, topNextBtn];
        for (var item = 0; item < arraySize(btnarray); item++) {
          btnarray[item].onclick = function () {
            var uid = getCookie();
            var worst = sortable[0][0];
            var secondWorst = sortable[1][0];
            var worstNum = parseInt(worst.replace("question", ""), 10);
            var secondWorstNum = parseInt(
              secondWorst.replace("question", ""),
              10
            );
            var worstQcode = qcodes[worstNum - 1];
            var worstConf = "wConf" + worstNum;
            var worstQnum = "question" + worstNum;
            var worstQA = "answers" + worstNum;

            var secondWorstConf = "wConf" + secondWorstNum;
            var swQcode = qcodes[secondWorstNum - 1];
            var swQnum = "question" + secondWorstNum;
            var swQA = "answers" + secondWorstNum;

            var endTime1 = Date.now();
            var difference = (endTime1 - startTime1) / 1000;
            saveTime(uid, "results_timer", "", difference);

            worstQs(theSlide, worstNum, 21, worstAns);
            var startTime2 = Date.now();

            document.getElementById(worstConf).onclick = function () {
              theSlide.innerHTML = "";
              var endTime2 = Date.now();
              var difference = (endTime2 - startTime2) / 1000;
              saveTime(uid, "re_assessment", worstQcode, difference);
              writeData(
                uid,
                "re_assessment",
                worstQcode,
                arraySize(worstAns),
                worstAns
              );
              changeInScore(
                uid,
                worstAns,
                trueAnswers[worstQA],
                worstQcode,
                worstQnum
              );
              worstQs(theSlide, secondWorstNum, 21, sworstAns);
              var startTime3 = Date.now();
              document.getElementById(secondWorstConf).onclick = function () {
                var endTime3 = Date.now();
                var difference = (endTime3 - startTime3) / 1000;
                saveTime(uid, "re_assessment", swQcode, difference);
                writeData(
                  uid,
                  "re_assessment",
                  swQcode,
                  arraySize(sworstAns),
                  sworstAns
                );
                changeInScore(
                  uid,
                  sworstAns,
                  trueAnswers[swQA],
                  swQcode,
                  swQnum
                );
              };
            };
          };
        }
      }
    };
  });
}

function worstQs(theSlide, theNum, n, array) {
  document.getElementById("nextBtn").style.display = "none";
  var oNum = "options" + theNum;
  var barNum = "bars" + n;
  theSlide.innerHTML = "";
  document.querySelector("#top h6").innerHTML = "";
  var heading = document.createElement("h6");
  heading.innerHTML =
    "We will now test you again on the two questions you scored lowest on. You will not be penalized in any way if you get these wrong.";
  theSlide.appendChild(heading);
  addRow(theSlide);
  var qlbl = document.createElement("label");
  qlbl.innerHTML = qs[theNum - 1];
  theSlide.appendChild(qlbl);
  addRow(theSlide);
  var perc = document.createElement("label");
  perc.innerHTML =
    "What percentage of the British public do you think chose each answer?";
  theSlide.appendChild(perc);
  addRow(theSlide);

  addSliders(theSlide, arraySize(options[oNum]), options[oNum], array, "");
  j = 1;
  var wConfBtn = document.createElement("button");
  wConfBtn.className = "btn btn-primary my-md-3";
  wConfBtn.type = "button";
  wConfBtn.innerHTML = "Confirm & Next";
  wConfBtn.id = "wConf" + theNum;
  theSlide.appendChild(wConfBtn);
}

// reads in scoring csv file and adds the original BSAS results into arrays
var ansIndexNum = 0;
function readTrueAns(file) {
  d3.csv(file).then(function (data) {
    data.forEach(function (d) {
      ansIndexNum++;
      var ansIndex = "answers" + ansIndexNum;
      var qIndex = "question" + ansIndexNum;
      var ind = ansIndexNum - 1;

      trueAnswers[ansIndex][0] = parseInt(d.score1);
      trueAnswers[ansIndex][1] = parseInt(d.score2);
      if (d.Option3 != "") {
        trueAnswers[ansIndex][2] = parseInt(d.score3);
      }

      means[qIndex] = parseFloat(d.mean);
      stanDs[qIndex] = parseFloat(d.sd);
      maxScores[ind] = Math.round(parseFloat(d.Max));
      diffs[ind] = d.difficulty;

      var sum = trueAnswers[ansIndex].reduce((a, b) => a + b, 0);

      if (sum != 100) {
        for (var a = 0; a < arraySize(trueAnswers[ansIndex]); a++) {
          trueAnswers[ansIndex][a] = (trueAnswers[ansIndex][a] / sum) * 100;
        }
      }
    });
  });
}

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
  measurementId: "G-9XT7JWZZ72",
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
function writeData(uid, section, qcode, num, answers) {
  if (num == 2) {
    firebase
      .database()
      .ref("/" + uid + "/" + section + "/" + qcode + "/guess_of_public/")
      .set(
        {
          opt1: answers[num - 2],
          opt2: answers[num - 1],
        },
        function (error) {
          if (error) {
            alert("Data could not be saved" + error);
          } else {
            console.log("write successful");
          }
        }
      );
  }
  if (num == 3) {
    firebase
      .database()
      .ref("/" + uid + "/" + section + "/" + qcode + "/guess_of_public/")
      .set(
        {
          opt1: answers[num - 3],
          opt2: answers[num - 2],
          opt3: answers[num - 1],
        },
        function (error) {
          if (error) {
            alert("Data could not be saved" + error);
          } else {
            console.log("write successful");
          }
        }
      );
  }
}

// time stamp for each question
function saveTime(uid, section, qcode, time) {
  if (qcode == "") {
    firebase
      .database()
      .ref("/" + uid + "/" + section + "/timer/")
      .set({
        Timer: time,
      });
  } else {
    firebase
      .database()
      .ref("/" + uid + "/" + section + "/" + qcode + "/timer/")
      .set({
        Timer: time,
      });
  }
}

// save the user's actual answer
function writeAnswer(uid, section, qcode, ans) {
  firebase
    .database()
    .ref("/" + uid + "/" + section + "/" + qcode + "/their_answer/")
    .set({
      answer: ans,
    });
}

// save political knowledge test results
function saveTest(uid, vals, time) {
  firebase
    .database()
    .ref("/" + uid + "/political_knowledge_test/")
    .set(
      {
        paperYN: vals[0],
        paper: vals[1],
        webYN: vals[2],
        web: vals[3],
        tvYN: vals[4],
        tv: vals[5],
        smYN: vals[6],
        smSite: vals[7],
        political_interest: vals[9],
        party_vote: vals[8],
        prop_of_seats_HOC: vals[10],
        electricity: vals[11],
        party_with_most_seats: vals[12],
        Timer: time,
      },
      function (error) {
        if (error) {
          alert("Data could not be saved" + error);
        } else {
          window.location.href = "quiz.html";
        }
      }
    );
}

// function to save user details
function saveUserData(uid, classBracket, age, gender, race, edu, house, time) {
  firebase
    .database()
    .ref("/" + uid + "/details/")
    .set({
      class_bracket: classBracket,
      age: age,
      gender: gender,
      race: race,
      education: edu,
      adults_in_house: house,
      Timer: time,
    });
}

function saveClassSurvey(uid, ans) {
  firebase
    .database()
    .ref("/" + uid + "/details/class_survey/")
    .set({
      class: ans,
    });
}

// Calculate and save user score
function saveUserScore(uid, user_answers, true_answers, section, qcode, qnum) {
  var userScore = sumDiff(user_answers, true_answers);
  var normScore = Math.round((100 * (means[qnum] - userScore)) / stanDs[qnum]);
  userScores[qnum] = normScore;
  firebase
    .database()
    .ref("/" + uid + "/" + section + "/" + qcode + "/score/")
    .set({
      score: normScore,
    });
}
// save user feedback to firebase
function saveFeedback(uid, vals, text) {
  firebase
    .database()
    .ref("/" + uid + "/feedback/")
    .set({
      change_opinion: vals[0],
      interesting: vals[1],
      other_fb: text,
    });
}

function alertnessTest(uid, test, fail) {
  firebase
    .database()
    .ref("/" + uid + "/alertness_tests/" + test + "/")
    .set({
      failed: fail,
    });
}

function setTimestamp(uid, time, browser) {
  firebase
    .database()
    .ref("/" + uid + "/timestamp/")
    .set(
      {
        timestamp: time,
        browser: browser,
      },
      function (error) {
        if (error) {
          console.log("fail");
        } else {
          window.location.href = "knowledge.html";
        }
      }
    );
}

function saveFinalScore(uid, score) {
  firebase
    .database()
    .ref("/" + uid + "/final_score/")
    .set({
      score_as_percentage: score,
    });
}

function changeInScore(uid, newscores, true_answers, qcode, qnum) {
  var userScore = sumDiff(newscores, true_answers);
  var normScore = Math.round((100 * (means[qnum] - userScore)) / stanDs[qnum]);
  var change = normScore - userScores[qnum];
  firebase
    .database()
    .ref("/" + uid + "/re_assessment/" + qcode + "/change_in_score/")
    .set(
      {
        difference: change,
      },
      function (error) {
        if (error) {
          alert("Data could not be saved" + error);
        } else {
          if (newscores == sworstAns) {
            window.location.href = "feedback.html";
          } else {
            console.log("write successful");
          }
        }
      }
    );
}

// end of referenced code

function sumDiff(a, b) {
  var sdiff = 0;
  for (var v = 0; v < arraySize(a); v++) {
    sdiff += Math.abs(a[v] - b[v]);
  }
  return sdiff;
}

var fback = [];
var fback_checked = 0;
// functionality for the feedback section of the quiz
if ($("body").is(".feedback")) {
  var uid = getCookie();
  var yesRad = document.getElementById("yesChange");
  var noRad = document.getElementById("noChange");
  var notRad = document.getElementById("intNo");
  var litRad = document.getElementById("intLittle");
  var quiteRad = document.getElementById("intQuite");
  var veryRad = document.getElementById("intVery");
  var txtArea = document.getElementById("openFeedback");

  yesRad.addEventListener("click", function () {
    noRad.checked = false;
    fback[0] = "Yes";
    fback_checked += 1;
  });

  noRad.addEventListener("click", function () {
    yesRad.checked = false;
    fback[0] = "No";
    fback_checked += 1;
  });

  notRad.addEventListener("click", function () {
    litRad.checked = false;
    quiteRad.checked = false;
    veryRad.checked = false;
    fback[1] = "Not at all";
    fback_checked += 1;
  });

  litRad.addEventListener("click", function () {
    notRad.checked = false;
    quiteRad.checked = false;
    veryRad.checked = false;
    fback[1] = "A little";
    fback_checked += 1;
  });

  quiteRad.addEventListener("click", function () {
    litRad.checked = false;
    notRad.checked = false;
    veryRad.checked = false;
    fback[1] = "Quite interesting";
    fback_checked += 1;
  });

  veryRad.addEventListener("click", function () {
    litRad.checked = false;
    quiteRad.checked = false;
    notRad.checked = false;
    fback[1] = "Very interesting";
    fback_checked += 1;
  });

  document
    .getElementById("fbackConfirm")
    .addEventListener("click", function () {
      if (fback_checked < 2) {
        document.getElementById("fbErrText").style.display = "inline-block";
      } else {
        document.getElementById("fbErrText").className = "alert alert-success";
        document.getElementById("fbErrText").innerHTML = "Survey Code: " + uid;
        document.getElementById("fbErrText").style.display = "inline-block";
        document.getElementById("c_and_p").style.display = "inline-block";
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
    });
}
