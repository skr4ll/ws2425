// Meine Funcs:
// Konstruktor für USERS:
function User(name, alter, interessen) {
  this.name = name;
  this.alter = alter;
  this.interessen = interessen;
}

const user_1 = new User("rduke", 20, ["substanzen", "(gonzo-)journalismus"]);
const user_2 = new User("hlanda", 25, ["sprachen", "politik", "pistolen"]);
const user_3 = new User("sschwammkopf", 30, ["quallenfischen", "karate", "schnecken"]);

const users = [user_1, user_2, user_3];
const tblUsers = document.getElementById("tableUsers");
let count = 0;

users.forEach(populateTable);

function populateTable(user){
  let zeile = tblUsers.insertRow();
  let inhalt1 = zeile.insertCell(0);
  let inhalt2 = zeile.insertCell(1);
  let inhalt3 = zeile.insertCell(2);
  inhalt1.innerHTML = user.name;
  inhalt2.innerHTML = user.alter;
  
  let btn = document.createElement("button");
  btn.textContent = "anzeigen";
  btn.className = "w3-button";
    btn.onclick = function() {
        openModal(user.interessen);
    };
    inhalt3.appendChild(btn);
}

function openModal(interessen){
  document.getElementById("interessenPar").innerHTML = interessen;
  document.getElementById('id01').style.display='block'
}
function closeModal(){
  document.getElementById('id01').style.display='none';
}



// W3 funcs:

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

function myFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace("w3-black", "w3-red");
  } else { 
    x.className = x.className.replace(" w3-show", "");
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace("w3-red", "w3-black");
  }
}