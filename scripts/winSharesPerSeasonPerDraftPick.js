var async = require('async');
var request = require('request');

var arrayOfRequests = [];

function makeRequestFunction(url) {
  return function (callback) {
    request(url, function (err, response, body) {
      callback(null, +body);
    });
  };
}

for (var i = 1; i <= 56; i++) {
  var url = 'http://localhost:3000/win_shares_per_season/draft_pick/' + i;
  arrayOfRequests.push(makeRequestFunction(url));
}

async.series(arrayOfRequests, function (err, results) {
  console.log(results);
});
