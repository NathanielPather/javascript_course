// Includes the http module
var http = require('http');

// Includes the request module
var request = require("request");

//  API Key
const API_KEY = "RGAPI-4ba08cf3-4b05-4103-a437-4b38ffb3359c";

// Riot search with API key
const searchApiCall = "https://oc1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Lexhanatin?api_key=" + API_KEY;

// Returns a new instance of http.Server
// req = request
// req contains client request information.
// res = response
// res contains information to return
http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// searchApicall = destination link
    request(searchApiCall, function(error, response, body) {
        
        //construct the JSON response to send back to client
        res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*', });
//write a response to the client in JSON
        res.write(JSON.stringify(body));
//end the response
        res.end();
    });
}).listen(8081);