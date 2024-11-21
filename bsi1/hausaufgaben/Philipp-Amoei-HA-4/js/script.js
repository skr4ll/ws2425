// Divs zur Ausgabe von Gamedaten
const div_win_counter = document.getElementById("winCounterDiv");
const div_round_outcome = document.getElementById("roundOutcomeDiv");
const div_choices = document.getElementById("choicesDiv");
const div_endscreen = document.getElementById("endScreenDiv");
const div_endscreen_text = document.getElementById("endScreenTextDiv");
const div_highscore = document.getElementById("highscoreDiv");
// Divs zum Ein- und Ausblenden der unterschiedlichen Bereiche
const div_menu = document.getElementById("menuDiv");
const div_singleplayer = document.getElementById("spGameDiv");
const div_singleplayer3 = document.getElementById("spGameDiv3");
const div_pvp = document.getElementById("PvpDiv");
// Buttons
const button_new_game = document.getElementById("buttonNewGame");
const button_main_menu = document.getElementById("buttonMainMenu");
const game_elements = ["img/stein.JPG", "img/schere.JPG", "img/papier.JPG"];
let roundcounter = 0, number_of_rounds = 1, game_mode_id = 0;
// Spielerinstanzen
const human_1 = new Player("SpielerEins"), human_2 = new Player("SpielerZwei"), computer_1 = new Player("ComputerEins"), computer_2 = new Player("ComputerZwei");
// Dieses Array dient der leichteren Auswertung für die Darstellung des Highscores
const players = [human_1, computer_1, human_2, computer_2];

// FUNKTIONEN FÜR DEN PROGRAMMABLAUF:
// Konstruktor für die Spielerinstanzen
function Player(name) {
    this.name = name;
    this.wincount = 0;
    this.highest_streak = 0;
    this.streak_count = 0;
    this.on_streak = false;

    this.displayInfo = function() {
      console.log(`Name: ${this.name}, Wins: ${this.wincount}, Highest Streak: ${this.highest_streak}`);
    };
    this.updateStreak = function(comp_streak) {
        if (comp_streak > this.highest_streak) {
          this.highest_streak = comp_streak;
        }
      };
  }
// Hier wird die ausgewählte Rundenzahl gesetzt
function roundInput() {
    let rounds = document.getElementById("anzahlRunden").value;
    if (rounds && !isNaN(rounds) && rounds % 2 !== 0){
        number_of_rounds = rounds;
        console.log(`rounds set to ${number_of_rounds}`)
    }
}
// Das Menü wird angezeigt beim öffnen der Seite und nach Klick auf Button: HAUPTMENÜ (siehe endScreenDiv)
function showMenu(){
    div_choices.innerHTML = "", div_round_outcome.innerHTML = "", div_win_counter.innerHTML = "";
    div_endscreen.style.display = "none";
    div_menu.style.display = "block";
}
// Hier wird der Highscore der bereits teilnehmenden Spieler aktualisiert
function updateHighscore() {
    const sortedPlayers = players.sort((a, b) => b.highest_streak - a.highest_streak);

    div_highscore.innerHTML = "<strong>Highscores (Streak):</strong><br>";

    sortedPlayers.forEach(player => {
        if (player.highest_streak > 0){
            const playerEntry = document.createElement("p");
            playerEntry.textContent = `${player.name}: ${player.highest_streak}`;
            div_highscore.appendChild(playerEntry);
        }

    });
}
// Wird aufgerufen, wenn neue Runde beginnt (setzt die divs und den wincounter zurück und ruft den entsprechenden gamemode auf)
function initGame(selected_game){
    roundInput();
    roundcounter = 0;
    players.forEach(p => {
        p.wincount = 0;
    });
    div_choices.innerHTML = "", div_round_outcome.innerHTML = "", div_win_counter.innerHTML = "";
    div_menu.style.display = "none";
    div_endscreen.style.display = "none";

    switch (selected_game) {
        // Case 0 ist Spieler vs. Zufallszahl aka Singleplayer
        case 0:
            div_singleplayer.style.display = "block";
            game_mode_id = selected_game;
        break;
        case 1:
            div_pvp.style.display = "block";
            game_mode_id = selected_game;
            pvpTwoPlayers();
        break;
        case 2:
            div_singleplayer3.style = "block";
            game_mode_id = selected_game;
        break;
    }
    console.log(`game_mode_id = ${game_mode_id}`);
}
// Sind alle festgelegten Runden gespielt, wird hier das Ergebnis eines Spiels ermittelt
function evalOutcome(){
    let endtext = "";
    switch (game_mode_id) {
        // SINGLEPLAYER (User gegen Zufall)
        case 0:
            if (players[0].wincount > players[1].wincount){
                endtext = ` Du gewinnst mit ${players[0].wincount} zu ${players[1].wincount}`;
                players[0].streak_count++;
                players[0].updateStreak(players[0].streak_count);
                players[1].streak_count = 0;
            } 
            else{
                endtext = `Du verlierst mit ${players[0].wincount} zu ${players[1].wincount}`;
                players[1].streak_count++;
                players[1].updateStreak(players[1].streak_count);
                players[0].streak_count = 0;
            } 
        break;
        // PvP 1v1
        case 1:
            if (players[0].wincount > players[2].wincount){
                endtext = ` ${players[0].name} gewinnt mit ${players[0].wincount} zu ${players[2].wincount}`;
                players[0].streak_count++;
                players[0].updateStreak(players[0].streak_count);
                players[2].streak_count = 0;
            } 
            else{
                endtext = `${players[2].name} gewinnt mit ${players[2].wincount} zu ${players[0].wincount}`;
                players[2].streak_count++;
                players[2].updateStreak(players[2].streak_count);
                players[0].streak_count = 0;
            } 
        break;
        // Singleplayer mit 2 Computern (Zufall)
        case 2:
            let most_wins = 0, winner_player = null, others = [];
            players.forEach (p => {
                if (p.wincount > most_wins){
                    most_wins = p.wincount;
                    winner_player = p;
                }
            });
            winner_player.streak_count++;
            players.forEach (p => {
                p.updateStreak(p.streak_count);
                if (p != winner_player){
                    p.streak_count = 0;
                    others.push(p);
                }
            });
            endtext = `${winner_player.name} gewinnt mit ${winner_player.wincount} zu ${others[0].name}: ${others[0].wincount} zu ${others[1].name}: ${others[1].wincount}`;
        break;
    }
    updateHighscore();
    endScreen(endtext);
}
// Hier werden die Endergebnisse eines Spiels angezeigt (wird gecallt aus evalOutcome)
function endScreen(string_endtext){
    let game_over = `GAME OVER...${string_endtext}`;
    div_win_counter.innerHTML = "";
    setTimeout(() => {
        div_round_outcome.innerHTML = "";
    }, 800);
    switch (game_mode_id) {
        case 0:
            div_singleplayer.style.display = "none";    
        break;
        case 2:
            div_singleplayer3.style.display = "none";
        break;
    }
    div_endscreen_text.innerHTML = "<br>" + game_over;
    div_endscreen.style.display = "block";
}

// FUNKTIONEN DER SPIELLOGIK:
// Das Singleplayer Game. Hier werden Buttons zur Auswahl angezeigt, da sich kein zweiter Spieler vor dem Bildschirm befindet
function spGame(choice) {
    let player_choice = choice;
    //let program_choice = Math.floor(Math.random() * 3);
     let program_choice = 1;
    div_choices.innerHTML = `
        Du: <img src="${game_elements[choice]}" alt="Auswahl-1" style="vertical-align: middle;"> - 
        Programm: <img src="${game_elements[program_choice]}" alt="Auswahl-2" style="vertical-align: middle;">`;
    twoPlayerLogic(player_choice, program_choice);
}
function spGame3(choice) {
    let player_choice = choice;
    let program_1_choice = Math.floor(Math.random() * 3);
    let program_2_choice = Math.floor(Math.random() * 3);
     //let program_choice = 1;
    div_choices.innerHTML = `
        Du: <img src="${game_elements[player_choice]}" alt="Auswahl-1" style="vertical-align: middle;"> - 
        ${computer_1.name} <img src="${game_elements[program_1_choice]}" alt="Auswahl-2" style="vertical-align: middle;">
        ${computer_2.name} <img src="${game_elements[program_2_choice]}" alt="Auswahl-3" style="vertical-align: middle;">`;
    threePlayerLogic(player_choice, program_1_choice, program_2_choice);
}
function pvpTwoPlayers() {
    const playRound = () => {
        div_pvp.innerHTML = "P1: Stein: a, Schere: s, Papier: d";
        keyboardInput((c_1, c_2) => {
            console.log(`Processing inputs: ${c_1}, ${c_2}`);
            div_choices.innerHTML = `${players[0].name}: <img src="${game_elements[c_1]}" alt="Auswahl-1" style="vertical-align: middle;"> - 
                                     ${players[2].name}: <img src="${game_elements[c_2]}" alt="Auswahl-2" style="vertical-align: middle;">`;
            twoPlayerLogic(c_1, c_2);

            if (roundcounter < number_of_rounds) {
                playRound(); // Call itself for the next round
            }
        });
    };

    playRound();
}

function twoPlayerLogic(choice_1, choice_2) {
    let current_players = [];
    current_players[0] = human_1;
    if (game_mode_id === 0) current_players[1] = computer_1;
    else current_players[1] = human_2;
    if (choice_1 == choice_2){
        div_round_outcome.innerHTML = "Unentschieden: Runde wird wiederholt!";
    }
    else{
        // ToDo Hier auch Schleife verwenden wie bei 3 Spielern!
        switch (choice_1) {
            case 0:
                if (choice_2 == 1){
                    div_round_outcome.innerHTML = `${current_players[0].name} gewinnt!`
                    current_players[0].wincount++;
                }
                else{
                    div_round_outcome.innerHTML = `${current_players[1].name} gewinnt!`
                     current_players[1].wincount++; 
                }
                roundcounter++;
                div_win_counter.innerHTML = `${current_players[0].name}: ${current_players[0].wincount} ${current_players[1].name}:
                                             ${current_players[1].wincount}  RUNDE: ${roundcounter} von ${number_of_rounds}`;
                if (roundcounter == number_of_rounds) evalOutcome();
            break;
            
            case 1:
                if (choice_2 == 2){
                    div_round_outcome.innerHTML = `${current_players[0].name} gewinnt!`
                    current_players[0].wincount++;
                }
                else{
                    div_round_outcome.innerHTML = `${current_players[1].name} gewinnt!`
                     current_players[1].wincount++;  
                }
                roundcounter++;
                div_win_counter.innerHTML = `${current_players[0].name}: ${current_players[0].wincount} ${current_players[1].name}:
                                             ${current_players[1].wincount} -----> RUNDE: ${roundcounter} von ${number_of_rounds} <-----`;
                if (roundcounter == number_of_rounds) evalOutcome();
            break;            
            
            case 2:
                if (choice_2 == 0){
                    div_round_outcome.innerHTML = `${current_players[0].name} gewinnt!`
                    current_players[0].wincount++;
                }
                else{
                    div_round_outcome.innerHTML = `${current_players[1].name} gewinnt!`
                     current_players[1].wincount++;  
                }
                roundcounter++;
                div_win_counter.innerHTML = `${current_players[0].name}: ${current_players[0].wincount} ${current_players[1].name}:
                                             ${current_players[1].wincount} RUNDE: ${roundcounter} von ${number_of_rounds}`
                if (roundcounter == number_of_rounds) evalOutcome();
            break;
        }
    }
}

function threePlayerLogic(choice_1, choice_2, choice_3) {
    const current_players = [];
    const choices = [choice_1, choice_2, choice_3];
    current_players.push(human_1, computer_1, computer_2);
    
    if (choice_1 == choice_2 && choice_2 == choice_3){
        div_round_outcome.innerHTML = "Unentschieden: Runde wird wiederholt!";
    }
    else if (choice_1 != choice_2 && choice_2 != choice_3 && choice_1 != choice_3){
        div_round_outcome.innerHTML = "Zirkuläre Runde!!!: Runde wird wiederholt!";
    }
    else{
        div_round_outcome.innerHTML = "";
    	for (let i = 0; i < 3; i++){
      	    //console.log(`I ist: ${i}`)
            for (let j = 0; j < 3; j++){
                //console.log(`J ist: ${j}`)
                if (j == i) {
                    continue;
                }
                else{
                    if (choices[i] == choices[j]) continue;
                    else if (choices[i] == 0 && choices[j] == 1){
                        div_round_outcome.innerHTML += `${current_players[i].name} schlägt ${current_players[j].name} und`
                        current_players[i].wincount++;
                        console.log(`${current_players[i].name} beats ${current_players[j].name}`); continue;
                    }
                    else if (choices[i] == 1 && choices[j] == 2){
                        div_round_outcome.innerHTML += `${current_players[i].name} schlägt ${current_players[j].name} und`
                        current_players[i].wincount++;
                        console.log(`${current_players[i].name} beats ${current_players[j].name}`); continue;
                    }
                    else if (choices[i] == 2 && choices[j] == 0){
                        div_round_outcome.innerHTML += `${current_players[i].name} schlägt ${current_players[j].name} und`
                        current_players[i].wincount++;
                        console.log(`${current_players[i].name} beats ${current_players[j].name}`); continue;
                    }
                    else continue;
                }
            }    
        }
        roundcounter++;
        div_win_counter.innerHTML = `${current_players[0].name}: ${current_players[0].wincount} ${current_players[1].name}:
                                     ${current_players[1].wincount} ${current_players[2].name}: ${current_players[2].wincount} -----> RUNDE: ${roundcounter} von ${number_of_rounds} <-----`;
        if (roundcounter == number_of_rounds) evalOutcome();
    }
}

function keyboardInput(cb) {
    let p1_choice = 0, p2_choice = 0;
    let p1_key = null;
    const keys_p1 = new Map([
        ["a", 0],
        ["s", 1],
        ["d", 2]
      ]);
    const keys_p2 = new Map([
        ["i", 0],
        ["o", 1],
        ["p", 2]
    ]);
    const keyDownHandler = (event) => {
        if(!p1_key && keys_p1.has(event.key)) {
            p1_key = event.key;
            p1_choice = keys_p1.get(p1_key);
            div_pvp.innerHTML = "P2: Stein: i, Schere: o, Papier: p";
        }
        else if(p1_key && keys_p2.has(event.key)) {
            const p2_key = event.key;
            p2_choice = keys_p2.get(p2_key);
            document.removeEventListener('keydown', keyDownHandler);
            p1_key = null;
            div_pvp.innerHTML = "";
            cb(p1_choice, p2_choice);
        }
    };
    document.addEventListener('keydown', keyDownHandler);
}