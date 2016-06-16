var async = require('async');
var request = require('request');

function lowerCaseUnderscore(name) {
  return name.toLowerCase().replace(/ /g, '_');
}

var players = [
      'Kyrie Irving',
      'Derrick Williams',
      'Enes Kanter',
      'Tristan Thompson',
      'Jonas Valanciunas',
      'Jan Vesely',
      'Bismack Biyombo',
      'Brandon Knight',
      'Kemba Walker',
      'Jimmer Fredette',
      'Klay Thompson',
      'Alec Burks',
      'Markieff Morris',
      'Marcus Morris',
      'Kawhi Leonard',
      'Nikola Vucevic',
      'Iman Shumpert',
      'Chris Singleton',
      'Tobias Harris',
      'Donatas Motiejunas',
      'Nolan Smith',
      'Kenneth Faried',
      'Nikola Mirotic',
      'Reggie Jackson',
      'Marshon Brooks',
      'Jordan Hamilton',
      'JaJuan Johnson',
      'Norris Cole',
      'Cory Joseph',
      'Jimmy Butler',
      'Bojan Bogdanovic',
      'Justin Harper',
      'Kyle Singler',
      'Shelvin Mack',
      'Tyler Honeycutt',
      'Jordan Williams',
      'Trey Thompkins',
      'Chandler Parsons',
      'Jeremy Tyler',
      'Jon Leuer',
      'Darius Morris',
      'Davis Bertans',
      'Malcolm Lee',
      'Charles Jenkins',
      'Josh Harrellson',
      'Andrew Goudelock',
      'Travis Leslie',
      'Keith Benson',
      'Josh Selby',
      'Lavoy Allen',
      'Jon Diebler',
      'Vernon Macklin',
      'DeAndre Liggins',
      'Milan Macvan',
      'Etwaun Moore',
      'Chukwudiebere Maduabum',
      'Tanguy Ngombo',
      'Ater Majok',
      'Adam Hanga',
      'Isaiah Thomas',
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

async.series(arrayOfRequests, function (err, results) {
  console.log(results);
});
