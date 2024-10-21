// Initialer Alert
// alert("Hallo");
//
// if (confirm("Seite betreten?")) {
//     // Der alert im if Block
//     alert("Confirm wurde gegeben: Willkommen auf der Seite");
//     // Die Abfrage der präferierten Farbe. Der default case weiß ist sehr zu empfehlen hinsichtlich der Augengesundheit
//     let col = prompt("Farbe (red, purple, blue)? Default = weiß");
//     // Nur wenn eine der 3 Farben eingegeben wird, wird etwas gemacht
//     switch (col) {
//         case "red":
//         case "purple":
//         case "blue":
//             document.body.style.backgroundColor = col;
//         break;
//     } 
// } 
// else {
//     // Der Alert im else block
//     alert("Kein confirm: Hau rein");
//     // Überschrift und Bildelement erzeugen, wenn Confirm nicht gegeben
//     const cya = document.createElement("h3");
//     cya.innerHTML = "CYAAAAAAAAAAA!";
//     const gifCya = document.createElement("img");
//     gifCya.src = "img/cya.gif";  
//     // Alle Kindelemente von body durch die beiden oben erzeugten Elemente ersetzen
//     document.body.replaceChildren(cya, gifCya);
// }
//
// Die Berechnung des Betrags pro Tag
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


/* >>>>>> Hilfsfunktionen zur Berechnung <<<<<<<<<<< */

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
