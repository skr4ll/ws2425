// Divs zur Ausgabe von Gamedaten
const div_win_counter = document.getElementById("winCounterDiv");
const div_round_outcome = document.getElementById("roundOutcomeDiv");
const div_choices = document.getElementById("choicesDiv");
const div_endscreen = document.getElementById("endScreenDiv");
const div_endscreen_text = document.getElementById("endScreenTextDiv");
// Divs zum Ein- und Ausblenden der unterschiedlichen Bereiche
const div_menu = document.getElementById("menuDiv");
const div_singleplayer = document.getElementById("spGameDiv");
// Buttons
const button_new_game = document.getElementById("buttonNewGame");
const button_main_menu = document.getElementById("buttonMainMenu");
// Arrays für die Zählung der einzelnen Siege, wins_count[0] ist SP1 und gleichzeitig der Singleplayer
const game_elements = ["img/stein.JPG", "img/schere.JPG", "img/papier.JPG"];
let roundcounter = 0, number_of_rounds = 0, game_mode_id = 0;
// Spielerinstanzen
const current_players[0] = new Player("Spieler-1"), human_2 = new Player("Spieler-2"),  current_players[1] = new Player("Computer-1");
const players = [current_players[0],  current_players[1], human_2];

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

function roundInput() {
    let rounds = document.getElementById("anzahlRunden").value;
    if (rounds && !isNaN(rounds) && rounds % 2 !== 0){
        number_of_rounds = rounds;
        console.log(`rounds set to ${number_of_rounds}`)
    }
    else{
        number_of_rounds = 1;
        console.log(`rounds set to ${number_of_rounds}`)
    } 
}

function showMenu(){
    div_choices.innerHTML = "", div_round_outcome.innerHTML = "", div_win_counter.innerHTML = "";
    div_endscreen.style.display = "none";
    div_menu.style.display = "block";
}

function initGame(selected_game){
    roundInput();
    roundcounter = 0, current_players[0].wincount = 0,  current_players[1].wincount = 0;
    div_choices.innerHTML = "", div_round_outcome.innerHTML = "", div_win_counter.innerHTML = "";
    div_menu.style.display = "none";
    div_endscreen.style.display = "none";

    switch (selected_game) {
        // Case 0 ist Spieler vs. Zufallszahl aka Singleplayer
        case 0:
            div_singleplayer.style.display = "block";
            game_mode_id = selected_game;
            break;
        default:
            break;
    }
}

function evalOutcome(game_mode_id){
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
            console.log(`HIGHEST-STREAK: player at: ${players[0].highest_streak} and machine at: ${players[1].highest_streak}`);
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
                players[2].updateStreak(players[1].streak_count);
                players[0].streak_count = 0;
            } 
            console.log(`HIGHEST-STREAK: player at: ${players[0].highest_streak} and machine at: ${players[2].highest_streak}`);
            
        break;        
        default:
            break;
    }
    endScreen(endtext, game_mode_id);
}

function endScreen(string_endtext, game_mode_id){
    let game_over = `GAME OVER...${string_endtext}`;
    switch (game_mode_id) {
        case 0:
            div_singleplayer.style.display = "none";    
        break;
    
        default:
            break;
    }
    div_endscreen_text.innerHTML = "<br>" + game_over;
    div_endscreen.style.display = "block";

}

function spGame(choice) {
    let player_choice = choice;
    let choice_2 = Math.floor(Math.random() * 3);
    // let choice_2 = 1;
    // twoPlayerLogic(player_choice, choice_2, game_mode_id);
    div_choices.innerHTML = `
        Du: <img src="${game_elements[choice]}" alt="Auswahl-1" style="vertical-align: middle;"> - 
        Programm: <img src="${game_elements[choice_2]}" alt="Auswahl-2" style="vertical-align: middle;">`;
   
    if (player_choice == choice_2){
        div_round_outcome.innerHTML = "Unentschieden: Runde wird wiederholt!";
    }
    else{
        switch (player_choice) {
            case 0:
                if (choice_2 == 1){
                    div_round_outcome.innerHTML = "Du gewinnst!"
                    current_players[0].wincount++;
                }
                else{
                    div_round_outcome.innerHTML = "Programm gewinnt -.-"
                     current_players[1].wincount++; 
                }
                div_win_counter.innerHTML = `Du: ${current_players[0].wincount} --- Program: ${ current_players[1].wincount}`
                console.log(`player: ${current_players[0].wincount} and machine: ${ current_players[1].wincount}`);
                roundcounter++;
                if (roundcounter == number_of_rounds) evalOutcome(game_mode_id);
            break;
            case 1:
                if (choice_2 == 2){
                    div_round_outcome.innerHTML = "Du gewinnst!"
                    current_players[0].wincount++;
                }
                else{
                    div_round_outcome.innerHTML = "Programm gewinnt -.-"
                     current_players[1].wincount++;  
                }
                div_win_counter.innerHTML = `Du: ${current_players[0].wincount} --- Program: ${ current_players[1].wincount}`
                console.log(`player: ${current_players[0].wincount} and machine: ${ current_players[1].wincount}`);
                roundcounter++;
                if (roundcounter == number_of_rounds) evalOutcome(game_mode_id);
            break;            
            case 2:
                if (choice_2 == 0){
                    div_round_outcome.innerHTML = "Du gewinnst!"
                    current_players[0].wincount++;
                }
                else{
                    div_round_outcome.innerHTML = "Programm gewinnt -.-"
                     current_players[1].wincount++;  
                }
                div_win_counter.innerHTML = `Du: ${current_players[0].wincount} --- Program: ${ current_players[1].wincount}`
                console.log(`player: ${current_players[0].wincount} and machine: ${ current_players[1].wincount}`);
                roundcounter++;
                if (roundcounter == number_of_rounds) evalOutcome(game_mode_id);
            break;
        }
    }
}

function twoPlayerLogic(choice_1, choice_2, gmid) {
    let current_players = [];
    current_players[0] = players[0];
    if (gmid === 0) current_players[1] = players[1];
    else current_players[1] = players[2];

    if (choice_1 == choice_2){
        div_round_outcome.innerHTML = "Unentschieden: Runde wird wiederholt!";
    }
    else{
        switch (choice_1) {
            case 0:
                if (choice_2 == 1){w
                    div_round_outcome.innerHTML = `${current_players[0].name} gewinnt!`
                    current_players[0].wincount++;
                }
                else{
                    div_round_outcome.innerHTML = `${current_players[1].name} gewinnt!`
                     current_players[1].wincount++; 
                }
                div_win_counter.innerHTML = `Du: ${current_players[0].wincount} --- Program: ${ current_players[1].wincount}`
                roundcounter++;
                if (roundcounter == number_of_rounds) evalOutcome(game_mode_id);
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
                div_win_counter.innerHTML = `Du: ${current_players[0].wincount} --- Program: ${ current_players[1].wincount}`
                roundcounter++;
                if (roundcounter == number_of_rounds) evalOutcome(game_mode_id);
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
                div_win_counter.innerHTML = `Du: ${current_players[0].wincount} --- Program: ${ current_players[1].wincount}`
                roundcounter++;
                if (roundcounter == number_of_rounds) evalOutcome(game_mode_id);
            break;
        }
    }
}
function pvpTwoPlayers(params) {
    
}