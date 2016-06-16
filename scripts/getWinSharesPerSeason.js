var async = require('async');
var request = require('request');

function lowerCaseUnderscore(name) {
  return name.toLowerCase().replace(/ /g, '_');
}

var players = [
      'Andrea Bargnani',
      'LaMarcus Aldridge',
      'Adam Morrison',
      'Tyrus Thomas',
      'Shelden Williams',
      'Brandon Roy',
      'Randy Foye',
      'Rudy Gay',
      'Patrick OBryant',
      'Saer Sene',
      'JJ Redick',
      'Hilton Armstrong',
      'Thabo Sefolosha',
      'Ronnie Brewer',
      'Cedric Simmons',
      'Rodney Carney',
      'Shawne Williams',
      'Oleksiy Pecherov',
      'Quincy Douby',
      'Renaldo Balkman',
      'Rajon Rondo',
      'Marcus Williams',
      'Josh Boone',
      'Kyle Lowry',
      'Shannon Brown',
      'Jordan Farmar',
      'Sergio Rodriguez',
      'Maurice Ager',
      'Mardy Collins',
      'Joel Freeland',
      'James White',
      'Steve Novak',
      'Solomon Jones',
      'Paul Davis',
      'PJ Tucker',
      'Craig Smith',
      'Bobby Jones',
      'Kosta Perovic',
      'David Noel',
      'Denham Brown',
      'James Augustine',
      'Daniel Gibson',
      'Marcus Vinicius',
      'Lior Eliyahu',
      'Alexander Johnson',
      'Dee Brown',
      'Paul Milsap',
      'Leon Powe',
      'Ryan Hollins',
      'Chiekh Samb',
      'Guillermo Diaz',
      'Yotam Halperin',
      'Hassan Adams',
      'Ejike Ugboaja',
      'Eden Bavcic',
      'JR Pinnock',
      'Damir Markota',
      'Will Blalock',
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
