var express = require('express');
var app = express();
var parse = require('csv-parse');
var fs = require('fs');

var draftPlayers = {
  2003: [
    { name: 'LeBron James', winSharesPerSeason: 14.807692307692308 },
    { name: 'Darko Milicic', winSharesPerSeason: 0.5461538461538461 },
    { name: 'Carmelo Anthony', winSharesPerSeason: 7.1 },
    { name: 'Chris Bosh', winSharesPerSeason: 8.153846153846153 },
    { name: 'Dwyane Wade', winSharesPerSeason: 8.753846153846153 },
    { name: 'Chris Kaman', winSharesPerSeason: 1.8923076923076925 },
    { name: 'Kirk Hinrich', winSharesPerSeason: 4.038461538461538 },
    { name: 'TJ Ford', winSharesPerSeason: 1.2999999999999998 },
    { name: 'Mike Sweetney', winSharesPerSeason: 0 },
    { name: 'Jarvis Hayes', winSharesPerSeason: 0 },
    { name: 'Mickael Pietrus', winSharesPerSeason: 1.5153846153846153 },
    { name: 'Nick Collison', winSharesPerSeason: 3.6666666666666665 },
    { name: 'Marcus Banks', winSharesPerSeason: 0.5076923076923077 },
    { name: 'Luke Ridnour', winSharesPerSeason: 2.769230769230769 },
    { name: 'Reece Gaines', winSharesPerSeason: -0.04615384615384615 },
    { name: 'Troy Bell', winSharesPerSeason: -0.015384615384615385 },
    { name: 'Zarko Cabarkapa', winSharesPerSeason: 0 },
    { name: 'David West', winSharesPerSeason: 6.130769230769231 },
    { name: 'Aleksandar Pavlovic', winSharesPerSeason: 0 },
    { name: 'Dahntay Jones', winSharesPerSeason: 0.7615384615384616 },
    { name: 'Boris Diaw', winSharesPerSeason: 3.8846153846153846 },
    { name: 'Zoran Planinic', winSharesPerSeason: 0 },
    { name: 'Travis Outlaw', winSharesPerSeason: 1.2692307692307692 },
    { name: 'Brian Cook', winSharesPerSeason: 0.7846153846153846 },
    { name: 'Carlos Delfino', winSharesPerSeason: 1.875 },
    { name: 'Ndudi Ebi', winSharesPerSeason: 0 },
    { name: 'Kendrick Perkins', winSharesPerSeason: 2.146153846153846 },
    { name: 'Leandro Barbosa', winSharesPerSeason: 2.8307692307692305 },
    { name: 'Josh Howard', winSharesPerSeason: 2.923076923076923 },
    { name: 'Maciej Lampe', winSharesPerSeason: 0 },
    { name: 'Jason Kapono', winSharesPerSeason: 0.7923076923076924 },
    { name: 'Luke Walton', winSharesPerSeason: 1.0384615384615385 },
    { name: 'Jerome Beasley', winSharesPerSeason: 0 },
    { name: 'Mario Austin', winSharesPerSeason: 0 },
    { name: 'Travis Hansen', winSharesPerSeason: 0 },
    { name: 'Steve Blake', winSharesPerSeason: 2.2384615384615385 },
    { name: 'Slavko Vranes', winSharesPerSeason: 0 },
    { name: 'Derrick Zimmerman', winSharesPerSeason: 0 },
    { name: 'Willie Green', winSharesPerSeason: 0.9923076923076923 },
    { name: 'Zaza Pachulia', winSharesPerSeason: 3.2615384615384615 },
    { name: 'Keith Bogans', winSharesPerSeason: 1.5692307692307692 },
    { name: 'Malick Badiane', winSharesPerSeason: 0 },
    { name: 'Matt Bonner', winSharesPerSeason: 3.2083333333333335 },
    { name: 'Sani Becirovic', winSharesPerSeason: 0 },
    { name: 'Mo Williams', winSharesPerSeason: 3.076923076923077 },
    { name: 'James Lang', winSharesPerSeason: 0 },
    { name: 'James Jones', winSharesPerSeason: 1.8692307692307693 },
    { name: 'Paccelis Morlende', winSharesPerSeason: 0 },
    { name: 'Kyle Korver', winSharesPerSeason: 4.7384615384615385 },
    { name: 'Remon Van de Hare', winSharesPerSeason: 0 },
    { name: 'Tommy Smith', winSharesPerSeason: 0 },
    { name: 'Nedzad Sinanovic', winSharesPerSeason: 0 },
    { name: 'Rick Rickert', winSharesPerSeason: 0 },
    { name: 'Brandon Hunter', winSharesPerSeason: 0 },
    { name: 'Xue Yuyang', winSharesPerSeason: 0 },
    { name: 'Andreas Glyniadakis', winSharesPerSeason: 0 },
  ],

  2004: [
    { name: 'Dwight Howard', winSharesPerSeason: 9.433333333333334 },
    { name: 'Emeka Okafor', winSharesPerSeason: 3.6916666666666664 },
    { name: 'Ben Gordon', winSharesPerSeason: 2.775 },
    { name: 'Shaun Livingston', winSharesPerSeason: 1.9583333333333333 },
    { name: 'Devin Harris', winSharesPerSeason: 4.058333333333334 },
    { name: 'Josh Childress', winSharesPerSeason: 2.1416666666666666 },
    { name: 'Luol Deng', winSharesPerSeason: 6.0249999999999995 },
    { name: 'Rafael Araujo', winSharesPerSeason: -0.03333333333333333 },
    { name: 'Andre Iguodala', winSharesPerSeason: 6.833333333333333 },
    { name: 'Luke Jackson', winSharesPerSeason: 0.016666666666666666 },
    { name: 'Andris Biedrins', winSharesPerSeason: 2.558333333333333 },
    { name: 'Robert Swift', winSharesPerSeason: 0.14166666666666666 },
    { name: 'Sebastian Telfair', winSharesPerSeason: 0.4166666666666667 },
    { name: 'Kris Humphries', winSharesPerSeason: 2.3833333333333333 },
    { name: 'Al Jefferson', winSharesPerSeason: 5.591666666666666 },
    { name: 'Kirk Snyder', winSharesPerSeason: 0.375 },
    { name: 'Josh Smith', winSharesPerSeason: 4.25 },
    { name: 'JR Smith', winSharesPerSeason: 3.6916666666666664 },
    { name: 'Dorell Wright', winSharesPerSeason: 2.158333333333333 },
    { name: 'Jameer Nelson', winSharesPerSeason: 3.7416666666666667 },
    { name: 'Pavel Podkolzine', winSharesPerSeason: 0 },
    { name: 'Viktor Khryapa', winSharesPerSeason: 0 },
    { name: 'Sergei Monia', winSharesPerSeason: 0 },
    { name: 'Delonte West', winSharesPerSeason: 2.0416666666666665 },
    { name: 'Tony Allen', winSharesPerSeason: 2.9583333333333335 },
    { name: 'Kevin Martin', winSharesPerSeason: 5.108333333333333 },
    { name: 'Sasha Vujacic', winSharesPerSeason: 1.325 },
    { name: 'Beno Udrih', winSharesPerSeason: 2.5083333333333333 },
    { name: 'David Harrison', winSharesPerSeason: 0 },
    { name: 'Anderson Varejao', winSharesPerSeason: 3.85 },
    { name: 'Jackson Vroman', winSharesPerSeason: 0 },
    { name: 'Peter Ramos', winSharesPerSeason: 0 },
    { name: 'Lionel Chalmers', winSharesPerSeason: 0 },
    { name: 'Donta Smith', winSharesPerSeason: 0 },
    { name: 'Andrew Emmett', winSharesPerSeason: 0 },
    { name: 'Antonio Burks', winSharesPerSeason: 0 },
    { name: 'Royal Ivey', winSharesPerSeason: 0 },
    { name: 'Chris Duhon', winSharesPerSeason: 2.0833333333333335 },
    { name: 'Albert Miralles', winSharesPerSeason: 0 },
    { name: 'Justin Reed', winSharesPerSeason: 0 },
    { name: 'David Young', winSharesPerSeason: 0 },
    { name: 'Viktor Sanikidze', winSharesPerSeason: 0 },
    { name: 'Trevor Ariza', winSharesPerSeason: 3.841666666666667 },
    { name: 'Tim Pickett', winSharesPerSeason: 0 },
    { name: 'Bernard Robinson', winSharesPerSeason: 0 },
    { name: 'Ha Seung-Jin', winSharesPerSeason: 0 },
    { name: 'Pape Sow', winSharesPerSeason: 0 },
    { name: 'Ricky Minard', winSharesPerSeason: 0 },
    { name: 'Sergey Lishchuk', winSharesPerSeason: 0 },
    { name: 'Vassilis Spanoulis', winSharesPerSeason: 0 },
    { name: 'Christian Drejer', winSharesPerSeason: 0 },
    { name: 'Romain Sato', winSharesPerSeason: 0 },
    { name: 'Matt Freije', winSharesPerSeason: 0 },
    { name: 'Rickey Paulding', winSharesPerSeason: 0 },
    { name: 'Luis Flores', winSharesPerSeason: 0 },
    { name: 'Marcus Douhit', winSharesPerSeason: 0 },
    { name: 'Sergei Karaulov', winSharesPerSeason: 0 },
    { name: 'Blake Stepp', winSharesPerSeason: 0 },
    { name: 'Rashad Wright', winSharesPerSeason: 0 },
  ],

  2005: [
    { name: 'Andrew Bogut', winSharesPerSeason: 4.472727272727273 },
    { name: 'Marvin Williams', winSharesPerSeason: 4.445454545454545 },
    { name: 'Deron Williams', winSharesPerSeason: 6.8090909090909095 },
    { name: 'Chris Paul', winSharesPerSeason: 13.1 },
    { name: 'Raymond Felton', winSharesPerSeason: 3.209090909090909 },
    { name: 'Martell Webster', winSharesPerSeason: 2.2454545454545456 },
    { name: 'Charlie Villanueva', winSharesPerSeason: 2.0545454545454547 },
    { name: 'Channing Frye', winSharesPerSeason: 3.063636363636364 },
    { name: 'Ike Diogu', winSharesPerSeason: 0.5909090909090909 },
    { name: 'Andrew Bynum', winSharesPerSeason: 3.4 },
    { name: 'Fran Vazquez', winSharesPerSeason: 0 },
    { name: 'Yaroslav Korolev', winSharesPerSeason: 0 },
    { name: 'Sean May', winSharesPerSeason: 0.23636363636363636 },
    { name: 'Rashad McCants', winSharesPerSeason: 0.32727272727272727 },
    { name: 'Antoine Wright', winSharesPerSeason: 0.2818181818181818 },
    { name: 'Joey Graham', winSharesPerSeason: 0 },
    { name: 'Danny Granger', winSharesPerSeason: 4.409090909090909 },
    { name: 'Gerald Green', winSharesPerSeason: 1.2636363636363637 },
    { name: 'Hakim Warrick', winSharesPerSeason: 1.8545454545454545 },
    { name: 'Julius Hodge', winSharesPerSeason: 0 },
    { name: 'Nate Robinson', winSharesPerSeason: 2.5272727272727273 },
    { name: 'Jarrett Jack', winSharesPerSeason: 3.2363636363636363 },
    { name: 'Francisco Garcia', winSharesPerSeason: 1.6545454545454545 },
    { name: 'Luther Head', winSharesPerSeason: 1.3363636363636362 },
    { name: 'Johan Petro', winSharesPerSeason: 0.5 },
    { name: 'Jason Maxiell', winSharesPerSeason: 1.8454545454545455 },
    { name: 'Linas Kleiza', winSharesPerSeason: 1.2363636363636363 },
    { name: 'Ian Mahinmi', winSharesPerSeason: 2.2222222222222223 },
    { name: 'Wayne Simien', winSharesPerSeason: 0.08181818181818182 },
    { name: 'David Lee', winSharesPerSeason: 6.390909090909091 },
    { name: 'Salim Stoudamire', winSharesPerSeason: 0.2 },
    { name: 'Daniel Ewing', winSharesPerSeason: 0 },
    { name: 'Brandon Bass', winSharesPerSeason: 3.690909090909091 },
    { name: 'CJ Miles', winSharesPerSeason: 2.036363636363636 },
    { name: 'Ricky Sanchez', winSharesPerSeason: 0 },
    { name: 'Ersan Ilyasova', winSharesPerSeason: 3.37 },
    { name: 'Ronny Turiaf', winSharesPerSeason: 1.7454545454545454 },
    { name: 'Travis Diener', winSharesPerSeason: 0.509090909090909 },
    { name: 'Von Wafer', winSharesPerSeason: 0.3 },
    { name: 'Monta Ellis', winSharesPerSeason: 3.7181818181818183 },
    { name: 'Roko Ukic', winSharesPerSeason: 0 },
    { name: 'Chris Taft', winSharesPerSeason: 0 },
    { name: 'Mile Ilic', winSharesPerSeason: 0 },
    { name: 'Louis Williams', winSharesPerSeason: 3.772727272727273 },
    { name: 'Erazem Lorbek', winSharesPerSeason: 0 },
    { name: 'Bracey Wright', winSharesPerSeason: 0 },
    { name: 'Michael Gelabale', winSharesPerSeason: 0 },
    { name: 'Andray Blatche', winSharesPerSeason: 1.7454545454545454 },
    { name: 'Ryan Gomes', winSharesPerSeason: 1.7636363636363634 },
    { name: 'Robert Whaley', winSharesPerSeason: 0 },
    { name: 'Axel Hervelle', winSharesPerSeason: 0 },
    { name: 'Orien Greene', winSharesPerSeason: 0 },
    { name: 'Dijon Thompson', winSharesPerSeason: 0 },
    { name: 'Lawrence Roberts', winSharesPerSeason: 0 },
    { name: 'Amir Johnson', winSharesPerSeason: 4.1000000000000005 },
    { name: 'Marcin Gortat', winSharesPerSeason: 5.355555555555556 },
    { name: 'Uros Slokar', winSharesPerSeason: 0 },
    { name: 'Cenk Akyol', winSharesPerSeason: 0 },
    { name: 'Alex Acker', winSharesPerSeason: 0 },
  ],

  2006: [
    { name: 'Andrea Bargnani', winSharesPerSeason: 1.89 },
    { name: 'LaMarcus Aldridge', winSharesPerSeason: 7.95 },
    { name: 'Adam Morrison', winSharesPerSeason: -0.13999999999999999 },
    { name: 'Tyrus Thomas', winSharesPerSeason: 1.3 },
    { name: 'Shelden Williams', winSharesPerSeason: 0.99 },
    { name: 'Brandon Roy', winSharesPerSeason: 3.7399999999999998 },
    { name: 'Randy Foye', winSharesPerSeason: 2.33 },
    { name: 'Rudy Gay', winSharesPerSeason: 4.55 },
    { name: 'Patrick OBryant', winSharesPerSeason: 0.05 },
    { name: 'Saer Sene', winSharesPerSeason: 0.03 },
    { name: 'JJ Redick', winSharesPerSeason: 4.17 },
    { name: 'Hilton Armstrong', winSharesPerSeason: 0.39 },
    { name: 'Thabo Sefolosha', winSharesPerSeason: 3.13 },
    { name: 'Ronnie Brewer', winSharesPerSeason: 3.04 },
    { name: 'Cedric Simmons', winSharesPerSeason: 0.01 },
    { name: 'Rodney Carney', winSharesPerSeason: 0.62 },
    { name: 'Shawne Williams', winSharesPerSeason: 0.67 },
    { name: 'Oleksiy Pecherov', winSharesPerSeason: 0 },
    { name: 'Quincy Douby', winSharesPerSeason: 0 },
    { name: 'Renaldo Balkman', winSharesPerSeason: 0.72 },
    { name: 'Rajon Rondo', winSharesPerSeason: 5.12 },
    { name: 'Marcus Williams', winSharesPerSeason: 0 },
    { name: 'Josh Boone', winSharesPerSeason: 0.9099999999999999 },
    { name: 'Kyle Lowry', winSharesPerSeason: 5.9799999999999995 },
    { name: 'Shannon Brown', winSharesPerSeason: 0.9199999999999999 },
    { name: 'Jordan Farmar', winSharesPerSeason: 1.3800000000000001 },
    { name: 'Sergio Rodriguez', winSharesPerSeason: 0.36 },
    { name: 'Maurice Ager', winSharesPerSeason: -0.09 },
    { name: 'Mardy Collins', winSharesPerSeason: -0.16 },
    { name: 'Joel Freeland', winSharesPerSeason: 0 },
    { name: 'James White', winSharesPerSeason: 0 },
    { name: 'Steve Novak', winSharesPerSeason: 1.45 },
    { name: 'Solomon Jones', winSharesPerSeason: 0 },
    { name: 'Paul Davis', winSharesPerSeason: 0 },
    { name: 'PJ Tucker', winSharesPerSeason: 1.75 },
    { name: 'Craig Smith', winSharesPerSeason: 0 },
    { name: 'Bobby Jones', winSharesPerSeason: 0 },
    { name: 'Kosta Perovic', winSharesPerSeason: 0 },
    { name: 'David Noel', winSharesPerSeason: 0 },
    { name: 'Denham Brown', winSharesPerSeason: 0 },
    { name: 'James Augustine', winSharesPerSeason: 0 },
    { name: 'Daniel Gibson', winSharesPerSeason: 1.6 },
    { name: 'Marcus Vinicius', winSharesPerSeason: 0 },
    { name: 'Lior Eliyahu', winSharesPerSeason: 0 },
    { name: 'Alexander Johnson', winSharesPerSeason: 0 },
    { name: 'Dee Brown', winSharesPerSeason: 0 },
    { name: 'Paul Milsap', winSharesPerSeason: 7.31 },
    { name: 'Leon Powe', winSharesPerSeason: 0 },
    { name: 'Ryan Hollins', winSharesPerSeason: 1.04 },
    { name: 'Chiekh Samb', winSharesPerSeason: 0 },
    { name: 'Guillermo Diaz', winSharesPerSeason: 0 },
    { name: 'Yotam Halperin', winSharesPerSeason: 0 },
    { name: 'Hassan Adams', winSharesPerSeason: 0 },
    { name: 'Ejike Ugboaja', winSharesPerSeason: 0 },
    { name: 'Eden Bavcic', winSharesPerSeason: 0 },
    { name: 'JR Pinnock', winSharesPerSeason: 0 },
    { name: 'Damir Markota', winSharesPerSeason: 0 },
    { name: 'Will Blalock', winSharesPerSeason: 0 },
  ],

  2007: [
    { name: 'Greg Oden', winSharesPerSeason: 0.9125 },
    { name: 'Kevin Durant', winSharesPerSeason: 11.988888888888889 },
    { name: 'Al Horford', winSharesPerSeason: 7.133333333333334 },
    { name: 'Mike Conley', winSharesPerSeason: 5.866666666666666 },
    { name: 'Jeff Green', winSharesPerSeason: 3.5555555555555554 },
    { name: 'Yi Jianlian', winSharesPerSeason: 0.34444444444444444 },
    { name: 'Corey Brewer', winSharesPerSeason: 2 },
    { name: 'Brandan Wright', winSharesPerSeason: 2.588888888888889 },
    { name: 'Joakim Noah', winSharesPerSeason: 6.366666666666666 },
    { name: 'Spencer Hawes', winSharesPerSeason: 2.322222222222222 },
    { name: 'Acie Law', winSharesPerSeason: 0.17777777777777778 },
    { name: 'Thaddeus Young', winSharesPerSeason: 4.733333333333333 },
    { name: 'Julian Wright', winSharesPerSeason: 0.43333333333333335 },
    { name: 'Al Thornton', winSharesPerSeason: 0.6777777777777777 },
    { name: 'Rodney Stuckey', winSharesPerSeason: 3.1888888888888887 },
    { name: 'Nick Young', winSharesPerSeason: 1.5222222222222221 },
    { name: 'Sean Williams', winSharesPerSeason: 0.3333333333333333 },
    { name: 'Marco Belinelli', winSharesPerSeason: 2.2444444444444445 },
    { name: 'Javaris Crittenton', winSharesPerSeason: 0.011111111111111112 },
    { name: 'Jason Smith', winSharesPerSeason: 1.2888888888888888 },
    { name: 'Daequan Cook', winSharesPerSeason: 0.5444444444444445 },
    { name: 'Jared Dudley', winSharesPerSeason: 4.188888888888889 },
    { name: 'Wilson Chandler', winSharesPerSeason: 2.2222222222222223 },
    { name: 'Rudy Fernandez', winSharesPerSeason: 1.775 },
    { name: 'Morris Almond', winSharesPerSeason: 0 },
    { name: 'Aaron Brooks', winSharesPerSeason: 2.088888888888889 },
    { name: 'Arron Afflalo', winSharesPerSeason: 0 },
    { name: 'Tiago Splitter', winSharesPerSeason: 4.2 },
    { name: 'Alando Tucker', winSharesPerSeason: 0.044444444444444446 },
    { name: 'Petteri Koponen', winSharesPerSeason: 0 },
    { name: 'Carl Landry', winSharesPerSeason: 3.988888888888889 },
    { name: 'Gabe Pruitt', winSharesPerSeason: 0.044444444444444446 },
    { name: 'Marcus Williams', winSharesPerSeason: -0.011111111111111112 },
    { name: 'Nick Fazekas', winSharesPerSeason: 0.08888888888888889 },
    { name: 'Glen Davis', winSharesPerSeason: 2.066666666666667 },
    { name: 'Jermareo Davidson', winSharesPerSeason: 0 },
    { name: 'Josh McRoberts', winSharesPerSeason: 2.022222222222222 },
    { name: 'Kyrylo Fesenko', winSharesPerSeason: 0.1 },
    { name: 'Stanko Barac', winSharesPerSeason: 0 },
    { name: 'Sun Yue', winSharesPerSeason: -0.0125 },
    { name: 'Chris Richard', winSharesPerSeason: 0.07777777777777778 },
    { name: 'Derrick Byars', winSharesPerSeason: 0.02 },
    { name: 'Adam Haluska', winSharesPerSeason: 0 },
    { name: 'Reyshawn Terry', winSharesPerSeason: 0 },
    { name: 'Jared Jordan', winSharesPerSeason: 0 },
    { name: 'Stephane Lasme', winSharesPerSeason: 0.03333333333333333 },
    { name: 'Dominic McGuire', winSharesPerSeason: 0 },
    { name: 'Marc Gasol', winSharesPerSeason: 7.725 },
    { name: 'Aaron Gray', winSharesPerSeason: 0.6888888888888889 },
    { name: 'Renaldas Seibutis', winSharesPerSeason: 0 },
    { name: 'JamesOn Curry', winSharesPerSeason: 0 },
    { name: 'Taurean Green', winSharesPerSeason: -0.011111111111111112 },
    { name: 'Demetris Nichols', winSharesPerSeason: -0.022222222222222223 },
    { name: 'Brad Newley', winSharesPerSeason: 0 },
    { name: 'Herbert Hill', winSharesPerSeason: 0 },
    { name: 'Ramon Sessions', winSharesPerSeason: 3.066666666666667 },
    { name: 'Sammy Mejia', winSharesPerSeason: 0 },
    { name: 'Giorgos Printezis', winSharesPerSeason: 0 },
    { name: 'DJ Strawberry', winSharesPerSeason: -0.022222222222222223 },
    { name: 'Milovan Rakovic', winSharesPerSeason: 0 },
  ],

  2008: [
    { name: 'Derrick Rose', winSharesPerSeason: 3.925 },
    { name: 'Michael Beasley', winSharesPerSeason: 1.3875 },
    { name: 'OJ Mayo', winSharesPerSeason: 2.725 },
    { name: 'Russell Westbrook', winSharesPerSeason: 8.375 },
    { name: 'Kevin Love', winSharesPerSeason: 8.025 },
    { name: 'Danilo Gallinari', winSharesPerSeason: 4.275 },
    { name: 'Eric Gordon', winSharesPerSeason: 2.8 },
    { name: 'Joe Alexander', winSharesPerSeason: 0.0625 },
    { name: 'DJ Augustin', winSharesPerSeason: 3.7125 },
    { name: 'Brook Lopez', winSharesPerSeason: 5.5875 },
    { name: 'Jerryd Bayless', winSharesPerSeason: 2.2125 },
    { name: 'Jason Thompson', winSharesPerSeason: 2.975 },
    { name: 'Brandon Rush', winSharesPerSeason: 0 },
    { name: 'Anthony Randolph', winSharesPerSeason: 0.725 },
    { name: 'Robin Lopez', winSharesPerSeason: 4.25 },
    { name: 'Marreese Speights', winSharesPerSeason: 3 },
    { name: 'Roy Hibbert', winSharesPerSeason: 4.25 },
    { name: 'JaVale McGee', winSharesPerSeason: 2.475 },
    { name: 'JJ Hickson', winSharesPerSeason: 2.7375 },
    { name: 'Alexis Ajinca', winSharesPerSeason: 0.825 },
    { name: 'Ryan Anderson', winSharesPerSeason: 4.625 },
    { name: 'Courtney Lee', winSharesPerSeason: 3.7625 },
    { name: 'Kosta Koufos', winSharesPerSeason: 2.6375 },
    { name: 'Serge Ibaka', winSharesPerSeason: 6.8 },
    { name: 'Nicolas Batum', winSharesPerSeason: 5.3 },
    { name: 'George Hill', winSharesPerSeason: 6 },
    { name: 'Darrell Arthur', winSharesPerSeason: 1.4125 },
    { name: 'Donte Greene', winSharesPerSeason: 0 },
    { name: 'DJ White', winSharesPerSeason: 0.475 },
    { name: 'JR Giddens', winSharesPerSeason: 0.0125 },
    { name: 'Nikola Pekovic', winSharesPerSeason: 3.1333333333333333 },
    { name: 'Walter Sharpe', winSharesPerSeason: -0.0125 },
    { name: 'Joey Dorsey', winSharesPerSeason: 0.3625 },
    { name: 'Mario Chalmers', winSharesPerSeason: 3.9625 },
    { name: 'DeAndre Jordan', winSharesPerSeason: 6.8875 },
    { name: 'Omer Asik', winSharesPerSeason: 3.3166666666666664 },
    { name: 'Luc Richard Mbah a Moute', winSharesPerSeason: 2.5 },
    { name: 'Kyle Weaver', winSharesPerSeason: 0.1875 },
    { name: 'Sonny Weams', winSharesPerSeason: 0 },
    { name: 'Chris Douglas-Roberts', winSharesPerSeason: 0.675 },
    { name: 'Nathan Jawai', winSharesPerSeason: 0.025 },
    { name: 'Sean Singletary', winSharesPerSeason: 0 },
    { name: 'Patrick Ewing Jr', winSharesPerSeason: 0 },
    { name: 'Ante Tomic', winSharesPerSeason: 0 },
    { name: 'Goran Dragic', winSharesPerSeason: 4.575 },
    { name: 'Trent Plaisted', winSharesPerSeason: 0 },
    { name: 'Bill Walker', winSharesPerSeason: 0 },
    { name: 'Malik Hairston', winSharesPerSeason: 0.1 },
    { name: 'Richard Hendrix', winSharesPerSeason: 0 },
    { name: 'DeVon Hardin', winSharesPerSeason: 0 },
    { name: 'Shan Foster', winSharesPerSeason: 0 },
    { name: 'Darnell Jackson', winSharesPerSeason: 0.1625 },
    { name: 'Tadija Dragicevic', winSharesPerSeason: 0 },
    { name: 'Maarty Leunen', winSharesPerSeason: 0 },
    { name: 'Mike Taylor', winSharesPerSeason: -0.05 },
    { name: 'Sasha Kaun', winSharesPerSeason: 0.2 },
    { name: 'James Gist', winSharesPerSeason: 0 },
    { name: 'Joe Crawford', winSharesPerSeason: 0 },
    { name: 'Deron Washington', winSharesPerSeason: 0 },
    { name: 'Semih Erden', winSharesPerSeason: 0.3 },
  ],

  2009: [
    { name: 'Blake Griffin', winSharesPerSeason: 9.116666666666667 },
    { name: 'Hasheem Thabeet', winSharesPerSeason: 0.6857142857142857 },
    { name: 'James Harden', winSharesPerSeason: 10.9 },
    { name: 'Tyreke Evans', winSharesPerSeason: 3.3000000000000003 },
    { name: 'Ricky Rubio', winSharesPerSeason: 3.4200000000000004 },
    { name: 'Jonny Flynn', winSharesPerSeason: -0.15714285714285717 },
    { name: 'Stephen Curry', winSharesPerSeason: 10.228571428571428 },
    { name: 'Jordan Hill', winSharesPerSeason: 2.3428571428571425 },
    { name: 'DeMar DeRozan', winSharesPerSeason: 0 },
    { name: 'Brandon Jennings', winSharesPerSeason: 4.014285714285714 },
    { name: 'Terrence Williams', winSharesPerSeason: -0.028571428571428574 },
    { name: 'Gerald Henderson', winSharesPerSeason: 2.314285714285714 },
    { name: 'Tyler Hansbrough', winSharesPerSeason: 2.8857142857142857 },
    { name: 'Earl Clark', winSharesPerSeason: 0.41428571428571426 },
    { name: 'Austin Daye', winSharesPerSeason: 0.6428571428571429 },
    { name: 'James Johnson', winSharesPerSeason: 1.7 },
    { name: 'Jrue Holiday', winSharesPerSeason: 3.242857142857143 },
    { name: 'Ty Lawson', winSharesPerSeason: 5.557142857142857 },
    { name: 'Jeff Teague', winSharesPerSeason: 4.728571428571429 },
    { name: 'Eric Maynor', winSharesPerSeason: 0.4714285714285714 },
    { name: 'Darren Collison', winSharesPerSeason: 4.514285714285714 },
    { name: 'Victor Claver', winSharesPerSeason: 0.05 },
    { name: 'Omri Casspi', winSharesPerSeason: 2.2285714285714286 },
    { name: 'BJ Mullens', winSharesPerSeason: 0.08571428571428572 },
    { name: 'Rodrigue Beaubois', winSharesPerSeason: 0.6857142857142857 },
    { name: 'Taj Gibson', winSharesPerSeason: 4.8 },
    { name: 'DeMarre Carroll', winSharesPerSeason: 2.6 },
    { name: 'Wayne Ellington', winSharesPerSeason: 1.0571428571428572 },
    { name: 'Toney Douglas', winSharesPerSeason: 1.657142857142857 },
    { name: 'Christian Eyenga', winSharesPerSeason: -0.06666666666666667 },
    { name: 'Jeff Pendergraph', winSharesPerSeason: 0.9 },
    { name: 'Jermaine Taylor', winSharesPerSeason: 0.028571428571428574 },
    { name: 'Dante Cunningham', winSharesPerSeason: 2.5142857142857147 },
    { name: 'Sergio Llull', winSharesPerSeason: 0 },
    { name: 'DaJuan Summers', winSharesPerSeason: -0.014285714285714287 },
    { name: 'Sam Young', winSharesPerSeason: 0.7428571428571429 },
    { name: 'DeJuan Blair', winSharesPerSeason: 2.7142857142857144 },
    { name: 'Jon Brockman', winSharesPerSeason: 0.5285714285714286 },
    { name: 'Jonas Jerebko', winSharesPerSeason: 2.4285714285714284 },
    { name: 'Derrick Brown', winSharesPerSeason: 0.6428571428571429 },
    { name: 'Jodie Meeks', winSharesPerSeason: 2.9714285714285715 },
    { name: 'Patrick Beverly', winSharesPerSeason: 3.575 },
    { name: 'Marcus Thornton', winSharesPerSeason: 2.7857142857142856 },
    { name: 'Chase Budinger', winSharesPerSeason: 1.9857142857142858 },
    { name: 'Nick Calathes', winSharesPerSeason: 0.8666666666666667 },
    { name: 'Danny Green', winSharesPerSeason: 3.857142857142857 },
    { name: 'Henk Norel', winSharesPerSeason: 0 },
    { name: 'Taylor Griffin', winSharesPerSeason: 0 },
    { name: 'Sergii Gladyr', winSharesPerSeason: 0 },
    { name: 'Goran Suton', winSharesPerSeason: 0 },
    { name: 'Jack McClinton', winSharesPerSeason: 0 },
    { name: 'AJ Price', winSharesPerSeason: 0.6714285714285715 },
    { name: 'Nando De Colo', winSharesPerSeason: 0.6 },
    { name: 'Robert Vaden', winSharesPerSeason: 0 },
    { name: 'Patrick Mills', winSharesPerSeason: 2.1285714285714286 },
    { name: 'Ahmad Nivins', winSharesPerSeason: 0 },
    { name: 'Emir Preldzic', winSharesPerSeason: 0 },
    { name: 'Lester Hudson', winSharesPerSeason: 0.028571428571428574 },
    { name: 'Chinemelu Elonu', winSharesPerSeason: 0 },
    { name: 'Robert Dozier', winSharesPerSeason: 0 },
  ],
};

function average(arr) {
  var sum = 0;

  for (var i = 0, len = arr.length; i < len; i++) {
    sum += Number(arr[i]);
  }

  return sum / len;
}

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

app.get('/win_shares_per_season/draft_pick/:pick', function (req, res) {
  var winSharesPerSeason = [];

  for (var year in draftPlayers) {
    winSharesPerSeason.push(draftPlayers[year][+req.params.pick - 1].winSharesPerSeason);
  }

  res.send(average(winSharesPerSeason).toString());
});

app.get('/draft_pick/:pick', function (req, res) {
  var picks = [];

  for (var year in draftPlayers) {
    picks.push(draftPlayers[year][+req.params.pick - 1]);
  }

  res.json(picks);
});

app.listen(3000, function () {
  console.log('NBA API listening on port 3000...');
});
