var async = require('async');
var request = require('request');

function lowerCaseUnderscore(name) {
  return name.toLowerCase().replace(/ /g, '_');
}

var players = [
      'Karl-Anthony Towns',
      'DAngelo Russell',
      'Jahlil Okafor',
      'Kristaps Porzingis',
      'Mario Hezonja',
      'Willie Cauley-Stein',
      'Emmanuel Mudiay',
      'Stanley Johnson',
      'Frank Kaminsky',
      'Justise Winslow',
      'Myles Turner',
      'Trey Lyles',
      'Devin Booker',
      'Cameron Payne',
      'Kelly Oubre',
      'Terry Rozier',
      'Rashad Vaughn',
      'Sam Dekker',
      'Jerian Grant',
      'Delon Wright',
      'Justin Anderson',
      'Bobby Portis',
      'Rondae Hollis-Jefferson',
      'Tyus Jones',
      'Jarell Martin',
      'Nikola Milutinov',
      'Larry Nance Jr',
      'RJ Hunter',
      'Chris McCullough',
      'Kevon Looney',
      'Cedi Osman',
      'Montrezl Harrell',
      'Jordan Mickey',
      'Anthony Brown',
      'Guillermon Hernangomez',
      'Rakeem Christmas',
      'Richaun Holmes',
      'Darrun Hilliard',
      'Juan Vaulet',
      'Josh Richardson',
      'Pat Connaughton',
      'Olivier Hanlan',
      'Joseph Young',
      'Andrew Harrison',
      'Marcus Thornton',
      'Norman Powell',
      'Arturas Gudaitis',
      'Dakari Johnson',
      'Aaron White',
      'Marcus Eriksson',
      'Tyler Harvey',
      'Satnam Singh Bhamara',
      'Sir Dominic Pointer',
      'Daniel Diez',
      'Cady Lalanne',
      'Branden Dawson',
      'Nikola Radicevic',
      'JP Tokoto',
      'Dimitrios Agravanis',
      'Luka Mitrovic',
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
