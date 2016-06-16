var async = require('async');
var request = require('request');

function lowerCaseUnderscore(name) {
  return name.toLowerCase().replace(/ /g, '_');
}

var players = [
      'John Wall',
      'Evan Turner',
      'Derrick Favors',
      'Wesley Johnson',
      'DeMarcus Cousins',
      'Ekpe Udoh',
      'Greg Monroe',
      'Al Farouq Aminu',
      'Gordon Hayward',
      'Paul George',
      'Cole Aldrich',
      'Xavier Henry',
      'Ed Davis',
      'Patrick Patterson',
      'Larry Sanders',
      'Luke Babbitt',
      'Kevin Seraphin',
      'Eric Bledsoe',
      'Avery Bradley',
      'James Anderson',
      'Craig Brackins',
      'Elliot Williams',
      'Trevor Booker',
      'Damion James',
      'Dominique Jones',
      'Quincy Pondexter',
      'Jordan Crawford',
      'Greivis Vasquez',
      'Daniel Orton',
      'Lazar Hayward',
      'Tibor Pleiss',
      'Dexter Pittman',
      'Hassan Whiteside',
      'Armon Johnson',
      'Nemanja Bjelica',
      'Terrico White',
      'Darington Hobson',
      'Andy Rautins',
      'Landry Fields',
      'Lance Stephenson',
      'Jarvis Varnado',
      'Da Sean Butler',
      'Devin Ebanks',
      'Jerome Jordan',
      'Paulo Prestes',
      'Gani Lawal',
      'Tiny Gallon',
      'Latavious Williams',
      'Ryan Richards',
      'Soloman Alabi',
      'Magnum Rolle',
      'Luke Harangody',
      'Pape Sy',
      'Willie Warren',
      'Jeremy Evans',
      'Hamady Ndiaye',
      'Ryan Reid',
      'Derrick Caracter',
      'Stanley Robinson',
      'Dwayne Collins',
    ];

var arrayOfRequests = [];
players.forEach(function (player) {
  var formattedPlayer = lowerCaseUnderscore(player);
  arrayOfRequests.push(function (callback) {
    request('http://localhost:3000/win_shares_per_season/' + formattedPlayer, function (err, response, body) {
      callback(null, {
        name: player,
        winSharesPerSeason: +body,
      });
    });
  });
});

async.parallel(arrayOfRequests, function (err, results) {
  console.log(results);
});
