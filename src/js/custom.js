
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
