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



function addRow(){
  const qform = document.getElementById('questions');
  const newRow = document.createElement('div');
  newRow.className = "form-row my-md-3";
  qform.appendChild(newRow);
  const col = document.createElement('div');
  col.className = "col-md-6";
  newRow.appendChild(col);
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
    addRow();
    d3.select("#questions").append("label").text(d.Option2);
    addRow();
    d3.select("#questions").append("label").text(d.Option3);
    addRow();
    d3.select("#questions").append("label").text(d.Option4);
    addRow();
    d3.select("#questions").append("label").text(d.Option5);
    addRow();
  })
});

// end of referenced code
