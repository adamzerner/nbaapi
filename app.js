var express = require('express');
var app = express();
var parse = require('csv-parse');
var fs = require('fs');

app.get('/win_shares_per_48/career/:player', function (req, res) {
  fs.readFile('data/' + req.params.player + '/advanced.csv', function (err, csv) {
    if (err) {
      res.send('0'); // should send 0 if the player isn't found/never played
      return;
    }

    parse(csv, function (err, advancedPlayerData) {
      for (var i = 0, len = advancedPlayerData.length; i < len; i++) {
        if (advancedPlayerData[i][0] === 'Career') {
          res.send(advancedPlayerData[i][23]);
          break;
        }
      }

      res.send('0'); // should send 0 if the player isn't found/never played
    });
  });
});

app.get('/win_shares_per_season/:player', function (req, res) {
  fs.readFile('data/' + req.params.player + '/advanced.csv', function (err, csv) {
    if (err) {
      res.send('0');
      return;
    }

    parse(csv, function (err, advancedPlayerData) {
      if (err) {
        res.send('0');
        return;
      }

      try {
        var rookieYear = +advancedPlayerData[1][0].split('-')[0];
        var yearsInLeague = 2015 - rookieYear + 1;
        var totalWinShares;
        var winSharesPerSeason;

        for (var i = 0, len = advancedPlayerData.length; i < len; i++) {
          if (advancedPlayerData[i][0] === 'Career') {
            totalWinShares = advancedPlayerData[i][22];
            break;
          }
        }

        winSharesPerSeason = totalWinShares / yearsInLeague;

        if (!winSharesPerSeason) {
          winSharesPerSeason = 0;
        }

        res.send(winSharesPerSeason.toString());
      } catch (e) {
        res.send('0');
        return;
      }
    });
  });
});

app.listen(3000, function () {
  console.log('NBA API listening on port 3000...');
});
