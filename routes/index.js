/**
 * Module dependencies.
 */
var fs = require('fs');

/**
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', {
      title: 'Project Euler solutions using JavaScript'
  });
}

/**
 * GET solution for problem 22
 */
 exports.problem22 = function(req, res) {
   console.log(__dirname);
   var start = new Date().getTime();
   var answer = calculateScore(__dirname + '/names.txt');
   var end = new Date().getTime();
 
   res.render('solution', {
       title: 'Project Euler - Problem 22'
     , link: 'http://projecteuler.net/problem=22'
     , time: end - start
     , answer: answer
   });
 }

/**
 * GET solution for problem 25
 */
exports.problem25 = function(req, res) {
  // Fibonacci magic!
  var start = new Date().getTime();
  var PHI = (1 + Math.sqrt(5)) / 2;
  var answer = Math.ceil(((Math.log(10) * 999) + Math.log(5) / 2) / Math.log(PHI));
  var end = new Date().getTime();

  res.render('solution', {
    title: 'Project Euler - Problem 25'
  , link: 'http://projecteuler.net/problem=25'
  , time: end - start
  , answer: answer
  });
}

/**
 * GET 404 page
 */
exports.notfound = function(req, res) {
  res.render('404', {
    title: 'Not found :('
  });
}

/* ==========================================================================
 Helper functions
========================================================================== */

/**
 * Calculate the score for the names in the specified file.
 * @param {String} fileName The file with the names.
 * @returns The total score of all names in the file.
 * @type Number
 */
function calculateScore (fileName) {
  var score = 0
    , names = []
    , cleanIndex = 0
    , alpha = 'abcdefghijklmnopqrstuvwxyz'
    , nameData;

  try {
    nameData = fs.readFileSync(fileName, 'ascii').split(',');
  } catch (err) {

    console.error('Unable to read file :(');
    console.log(err);
  }

  // Sort then calculate the score.
  nameData.sort().forEach(function(name, index) {
    var thisScore = 0, i;
    for (i = 0; i < name.length; i++) {
      // The score for the current name.
      thisScore += alpha.indexOf(name[i].toLowerCase()) + 1;
    }

    // Add the index multiplier.
    score += thisScore * (index + 1);
  });

  return score;
}
