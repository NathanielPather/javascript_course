import $ from "jquery";
const API_KEY = "RGAPI-d66418bc-9e62-47f4-bc4e-4ccb064eab13";
let search_term;
let account_ID;
let game_ID;
let game_duration;
let player_name;
let participant_ID;
let player_team;
let matchPlayers = [];
let winning_team;
let player_object;
let test = 1;
let ready_cb;

/* Searches for a player */
export function searchPlayer(ready) {
    ready_cb = ready;
    console.log(ready_cb);
    search_term = $("#search-input").val();
    console.log("search term is:");
    console.log(search_term);
    if (search_term == "") {
        alert("Please enter a name");
    }
    else {
        let searchPlayerApiCall = "https://oc1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + search_term + "?api_key=" + API_KEY;
        $.get(searchPlayerApiCall, function(response){
            account_ID = response.accountId;
            searchMatches(account_ID);
        });
    }
}

/* Search for a players matches */
export function searchMatches(account_ID) {
    let searchMatchesApiCall = "https://oc1.api.riotgames.com/lol/match/v3/matchlists/by-account/" + account_ID + "?endIndex=5&api_key=" + API_KEY;
     $.get(searchMatchesApiCall, function(response){
        console.log(response);
        grabMatchData(response);
    });
}

/* Grabs data from all the matches */
export function grabMatchData(response) {
    for(var i = 0; i < response.matches.length; i++) {
        game_ID = response.matches[i].gameId;
        let grabGameDataApiCal = "https://oc1.api.riotgames.com/lol/match/v3/matches/" + game_ID + "?api_key=" + API_KEY;
        $.get(grabGameDataApiCal, function(gameData){
            console.log(gameData);
            extractmatchData(gameData);
        });
    }
}

/* Extract required data from all the matches */
export function extractmatchData(gameData) {
    game_duration = gameData.gameDuration;
    var minutes = Math.floor(game_duration / 60);
    var seconds = game_duration - minutes * 60;

    console.log("Minutes is: " + minutes + " Seconds is: " + seconds);
    
    let gameMode = gameData.gameMode;
    console.log(gameMode);
    extractPlayerNames(gameData);
}

/* Extract player data from all the matches */
export function extractPlayerNames(gameData) {
    matchPlayers = [];
    player_object = ""
    for(var i = 0; i < gameData.participantIdentities.length; i++) {
        player_name = gameData.participantIdentities[i].player.summonerName;
        
        participant_ID = gameData.participantIdentities[i].participantId;
        let counter = 0;
        player_team = undefined;
        while ((player_team == undefined) && (counter <= gameData.participantIdentities.length-1)) {
            if (gameData.participants[counter].participantId == participant_ID) {
                player_team = gameData.participants[counter].teamId;
            }
            else {
                counter++;
            }
        }
        
        let win_counter = 0;
        let winning_team = undefined;
        while(winning_team == undefined) {
            if (gameData.teams[win_counter].win == "Win") {
                winning_team = gameData.teams[win_counter].teamId;
            }
            else {
                win_counter++;
            }
        }
        player_object = { "playerName":  player_name, "team": player_team, "winningTeam": "winning_team" };
        matchPlayers.push(player_object);
    }
    ready_cb(matchPlayers);
}