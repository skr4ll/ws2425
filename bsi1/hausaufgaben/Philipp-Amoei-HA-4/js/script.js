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
const game_elements = ["Stein", "Schere", "Papier"], wins_count = [0, 0, 0, 0, 0, 0];
let roundcounter = 0, number_of_rounds = 5, game_mode_id = 0;

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
const human_1 = new Player("human_1"), machine_1 = new Player("machine_1");


function showMenu(){
    div_choices.innerHTML = "", div_round_outcome.innerHTML = "", div_win_counter.innerHTML = "";
    div_endscreen.style.display = "none";
    div_menu.style.display = "block";
}

function initGame(selected_game){
    roundcounter = 0;
    div_choices.innerHTML = "", div_round_outcome.innerHTML = "", div_win_counter.innerHTML = "";
    for (let index = 0; index < wins_count.length; index++) {
        wins_count[index] = 0;     
    }
    div_endscreen.style.display = "none";
    switch (selected_game) {
        // Case 0 ist ein Spieler vs. Zufallszahl aka Singleplayer
        case 0:
            // add obj
            human_1.wincount = 0, machine_1.wincount = 0;
            div_menu.style.display = "none";
            div_singleplayer.style.display = "block";
            game_mode_id = selected_game;
            break;
        default:
            break;
    }
}

function spGame(choice) {
    let player_choice = choice;
    let program_choice = Math.floor(Math.random() * 3);
    div_choices.innerHTML = `Du wählst: ${game_elements[choice]} - Programm wählt: ${game_elements[program_choice]}`
   
    if (player_choice == program_choice){
        div_round_outcome.innerHTML = "Unentschieden: Runde wird wiederholt!";
    }
    else{
        switch (player_choice) {
            case 0:
                if (program_choice == 1){
                    div_round_outcome.innerHTML = "Du gewinnst!"
                    wins_count[0]++;
                    // add obj
                    human_1.on_streak = true, machine_1.on_streak = false;
                    human_1.wincount++, human_1.streak_count++;
                }
                else{
                    div_round_outcome.innerHTML = "Programm gewinnt -.-"
                    wins_count[1]++;
                    // add obj
                    machine_1.wincount++; 
                }
                div_win_counter.innerHTML = `Du: ${wins_count[0]} --- Program: ${wins_count[1]}`
                console.log(`player: ${human_1.wincount} and machine: ${machine_1.wincount}`);
                roundcounter++;
                if (roundcounter == number_of_rounds) evalOutcome(wins_count, 0);
            break;
            case 1:
                if (program_choice == 2){
                    div_round_outcome.innerHTML = "Du gewinnst!"
                    wins_count[0]++;
                }
                else{
                    div_round_outcome.innerHTML = "Programm gewinnt -.-"
                    wins_count[1]++; 
                }
                div_win_counter.innerHTML = `Du: ${wins_count[0]} --- Program: ${wins_count[1]}`
                console.log(`player: ${wins_count[0]} and machine: ${wins_count[1]}`);
                roundcounter++;
                if (roundcounter == number_of_rounds) evalOutcome(wins_count, 0);
            break;            
            case 2:
                if (program_choice == 0){
                    div_round_outcome.innerHTML = "Du gewinnst!"
                    wins_count[0]++;
                }
                else{
                    div_round_outcome.innerHTML = "Programm gewinnt -.-"
                    wins_count[1]++; 
                }
                div_win_counter.innerHTML = `Du: ${wins_count[0]} --- Program: ${wins_count[1]}`
                console.log(`player: ${wins_count[0]} and machine: ${wins_count[1]}`);
                roundcounter++;
                if (roundcounter == number_of_rounds) evalOutcome(wins_count, 0);
            break;
        }
    }
}

function evalOutcome(arr_wins_count, game_mode_id){
    let endtext = "";
    switch (game_mode_id) {
        case 0:
            if (arr_wins_count[0] > arr_wins_count[1]) endtext = ` Du gewinnst mit ${arr_wins_count[0]} zu ${arr_wins_count[1]}`;
            else endtext = `Du verlierst mit ${arr_wins_count[0]} zu ${arr_wins_count[1]}`;
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

