// Konstante für die Abfrage der Eingabe aus HA2
const inputFieldName = document.getElementById("name");
const inputFieldEmail  = document.getElementById("email");
const inputFieldAlter = document.getElementById("alter");
const selectBox = document.getElementById("genre");
const errorDiv = document.getElementById("divErrorMessage");
const meinung = document.getElementById("meinung");
const textfeldDiv = document.getElementById("divTextfeld");
const userDatenDiv = document.getElementById("divUserDaten");
// regex für die Email (kopiert aus StackOverflow)
const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
// ERSTER PART HA1, auskommentiert weil nervig:
/**** Initialer Alert
alert("Hallo");

if (confirm("Seite betreten?")) {
    // Der alert im if Block
    alert("Confirm wurde gegeben: Willkommen auf der Seite");
    // Die Abfrage der präferierten Farbe. Der default case weiß ist sehr zu empfehlen hinsichtlich der Augengesundheit
    let col = prompt("Farbe (red, purple, blue)? Default = weiß");
    // Nur wenn eine der 3 Farben eingegeben wird, wird etwas gemacht
    switch (col) {
        case "red":
        case "purple":
        case "blue":
            document.body.style.backgroundColor = col;
        break;
    } 
} 
else {
    // Der Alert im else block
    alert("Kein confirm: Hau rein");
    // Überschrift und Bildelement erzeugen, wenn Confirm nicht gegeben
    const cya = document.createElement("h3");
    cya.innerHTML = "CYAAAAAAAAAAA!";
    const gifCya = document.createElement("img");
    gifCya.src = "img/cya.gif";  
    // Alle Kindelemente von body durch die beiden oben erzeugten Elemente ersetzen
    document.body.replaceChildren(cya, gifCya);
} 
****/ 

//Die Berechnung des Betrags pro Tag
function calcAmountPerDay() {
  // Konstanten, die die jeweiligen html Element enthalten
  const resultTextParagraph = document.getElementById("resultText");
  const resultDiv = document.getElementById("result");
  const resultImgDiv = document.getElementById("resultImg");
  const amountInputField = document.getElementById("inputField");

  // Ist der Werte der Eingabe keine Zahl: Fehler
  if (isNaN(amountInputField.value) || amountInputField.value === "") {
    resultTextParagraph.innerHTML = "Bitte eine Zahl eingeben";
  }
  else {
    /* Andernfalls wird der Eingabewert über das Feld "value" referenziert. Es wird durch die Zahl geteilt die "daysLeftCalc()" zurück
    gibt und die Nachkommastellen werden auf 2 beschränkt (toFixed(2)) Das ganze wird durch Number() noch mal explizit als Zahl gecastet */
    resultTextParagraph.innerHTML = "Betrag pro Tag: ";
    let result = Number(amountInputField.value / daysLeftCalc()).toFixed(2);
    // Ins entsprechende <div> das Ergebnis mit angehängtem € schreiben
    resultDiv.innerHTML = result + "€";

    // Unterhalb werden, je nach Durchschnittsbetrag 3 unterschiedliche Bilder angezeigt
    if (result <= 5) {
      resultDiv.style.color = "red";
      let badImg = document.createElement("img");
      badImg.src = "img/betragSchlecht.jpg"
      // replaceChildren() um bei mehrmaligem Aufruf die Bilder nicht endlos weiter anzuhängen
      resultImgDiv.replaceChildren(badImg);
      resultDiv.appendChild(resultImgDiv);
    }
    else if (result > 5 && result < 8) {
      resultDiv.style.color = "yellow";
      let mediumImg = document.createElement("img");
      mediumImg.src = "img/betragMittel.jpg"
      resultImgDiv.replaceChildren(mediumImg);
      resultDiv.appendChild(resultImgDiv);
    }
    else {
      resultDiv.style.color = "darkgreen";
      let goodImg = document.createElement("img");
      goodImg.src = "img/betragGut.gif";
      resultImgDiv.replaceChildren(goodImg);
      resultDiv.appendChild(resultImgDiv);
    }
  }
}

//Verarbeiten der persönlichen Daten

function processPersonalData() {
  let arrayCheckboxes = getCheckedCheckboxValues();
  // Eingaben aus Selectbox
  let selectBoxValue = selectBox.value;
  errorDiv.innerHTML = "";
  userDatenDiv.innerHTML = "";
  textfeldDiv.innerHTML = "";
  let noErrors = true;
  let userName, userEmail, userAlter, radio;
  userDatenDiv.style.backgroundColor = "white";
  // Eingaben aus den Textfeldern:
  if (validate(inputFieldName.value, "name")) {
     userName = inputFieldName.value;
  } else {
    errorDiv.innerHTML += " >>> Namen eingeben/überprüfen "
    noErrors = false;
  }
  if (validate(inputFieldEmail.value, "email")) {
     userEmail = inputFieldEmail.value;
    
  } else {
    errorDiv.innerHTML += " >>> Email eingeben/überprüfen "
    noErrors = false;
  }
  if (validate(inputFieldAlter.value, "alter")) {
     userAlter = inputFieldAlter.value;
  } else {
    errorDiv.innerHTML += " >>> Alter eingeben/überprüfen "
    noErrors = false;
  }
  
  // Eingaben aus Checkbox
  if (arrayCheckboxes.length < 1) {
    errorDiv.innerHTML += " >>> Mindestens ein Interesse auswählen ";
    noErrors = false;
  }

  // Eingabe aus Radio
  let radioBox = document.querySelector("input[name=lieblingstier]:checked");
  if (!radioBox){
    errorDiv.innerHTML += " >>> Lieblingstier auswählen ";
    noErrors = false;
  } else{
     radio = radioBox.value;
  }

  if(noErrors){
    if (selectBoxValue == "Prog- Rock/Metal") selectBoxValue += ", (nice!): >>> &#129304 &#129304 &#129304 &#128526 <<<";
    userDatenDiv.style.backgroundColor = "grey";
    userDatenDiv.innerHTML = ` Dein Name: ${userName}, deine Email: ${userEmail} und dein Alter: ${userAlter}.<br> 
                                                         Dein Musikgenre ist: ${selectBoxValue}. <br> Dein Lieblingstier: ${radio} und deine Interessen sind:
                                                         ${arrayCheckboxes.toString()}`;
    console.log(`${userName}, ${userEmail}, ${userAlter}, ${selectBoxValue}, ${radio}, ${arrayCheckboxes}`);

    if(meinung.value){
      console.log(meinung.value);
      textfeldDiv.innerHTML = "Dein Kommentar:<br>"
      textfeldDiv.innerHTML += meinung.value;
      textfeldDiv.style.backgroundColor = "chocolate";
    }
  }

}

/* >>>>>> Hilfsfunktionen <<<<<<<<<<< */
function validate(feld, typ) {
  switch (typ) {
    case "name":
      if (feld && /^[a-z]+$/i.test(feld)){
        return true;
      } 
    break;
    case "email":
      if (feld && String(feld).toLowerCase().match(re)){
        return true;
      } 
    break;   
    case "alter":
      if (feld && !isNaN(Number(feld))){
        return true;
      }
    break;
    default:
      return false;
  }
}

function getCheckedCheckboxValues() {
  let array = []
  let checkboxes = document.querySelectorAll('input[name=interessen]:checked')
  for (let i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value)
  }
return array;
}

function hideShowElement(ele) {
  let x = document.getElementById(ele);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
// Wieviele Tage hat der aktuelle Monat? Wieviele Tage sind noch übrig diesen Monat?
function daysLeftCalc() {
  // new Date() ohne Parameter liefert ein Datumsobjekt des heutigen Tages. Es enhält u.a. Felder für Tag, Monat, Jahr, die hier in Konstanten abgelgt werden
  const date = new Date();
  const dayToCheck = date.getDate();
  const monthToCheck = date.getMonth();
  const yearToCheck = date.getFullYear();
  const isLeapYear = leapYear(yearToCheck);
  let monthDays = 31;
  // Die Monate werden ab 0 (Januar) bis 11 (Dezember) gezählt
  switch (monthToCheck) {
    case "1":
      if (isLeapYear) {
        monthDays = 29;
      }
      else {
        monthDays = 28;
      }
      break;
    case "3":
    case "5":
    case "8":
    case "10":
      monthDays = 30;
      break;
  }
  // Zu den verbleibenden Tagen 1 addieren, damit aktueller Tag mit einbezogen
  const remainingDays = monthDays - dayToCheck + 1;
  return remainingDays;
}

// Schaltjahr prüfen
function leapYear(year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}
