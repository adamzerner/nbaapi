var async = require('async');
var request = require('request');

function lowerCaseUnderscore(name) {
  return name.toLowerCase().replace(/ /g, '_');
}

var players = [
  'Blake Griffin',
  'Hasheem Thabeet',
  'James Harden',
  'Tyreke Evans',
  'Ricky Rubio',
  'Jonny Flynn',
  'Stephen Curry',
  'Jordan Hill',
  'DeMar DeRozan',
  'Brandon Jennings',
  'Terrence Williams',
  'Gerald Henderson',
  'Tyler Hansbrough',
  'Earl Clark',
  'Austin Daye',
  'James Johnson',
  'Jrue Holiday',
  'Ty Lawson',
  'Jeff Teague',
  'Eric Maynor',
  'Darren Collison',
  'Victor Claver',
  'Omri Casspi',
  'BJ Mullens',
  'Rodrigue Beaubois',
  'Taj Gibson',
  'DeMarre Carroll',
  'Wayne Ellington',
  'Toney Douglas',
  'Christian Eyenga',
  'Jeff Pendergraph',
  'Jermaine Taylor',
  'Dante Cunningham',
  'Sergio Llull',
  'DaJuan Summers',
  'Sam Young',
  'DeJuan Blair',
  'Jon Brockman',
  'Jonas Jerebko',
  'Derrick Brown',
  'Jodie Meeks',
  'Patrick Beverly',
  'Marcus Thornton',
  'Chase Budinger',
  'Nick Calathes',
  'Danny Green',
  'Henk Norel',
  'Taylor Griffin',
  'Sergii Gladyr',
  'Goran Suton',
  'Jack McClinton',
  'AJ Price',
  'Nando De Colo',
  'Robert Vaden',
  'Patrick Mills',
  'Ahmad Nivins',
  'Emir Preldzic',
  'Lester Hudson',
  'Chinemelu Elonu',
  'Robert Dozier',
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
