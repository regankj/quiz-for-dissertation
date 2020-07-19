const d3 = require('d3');


// Function to make sure Privacy Statement is accepted
const contBtn = document.getElementById('continue');
if (contBtn){
  contBtn.addEventListener('click', function(){
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
    };
  });
};


// functions to add horizontal bars and buttons

const qform = document.getElementById('questions');
var questionTtl = 100;
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
    console.log(values["value1"]);
  });

  document.getElementById(upBtnID).addEventListener('click', function(){
    document.getElementById(downBtnID).disabled = false;
    count = count + 10;
    document.getElementById(barID).innerHTML = count + "%";
    document.getElementById(barID).style.width = (count * 0.5) + "em";
    var value = document.getElementById(barID).innerHTML;
    values[valueNum] = parseInt(value, 10);
    console.log(values["value1"]);
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

  })
});



// end of referenced code
