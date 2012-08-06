/**
 * Module dependencies.
 */
var fs = require('fs');

/* ==========================================================================
 Helper functions
========================================================================== */

/**
 * Runs the specified function and returns a result object that includes the
 *   time it too to run the function.
 * @param {Function} fn The function to time.
 * @returns {Object} An object containing the answer (result of the function)
 *   and the time it took to run the function.
 */
function timedFunction (fn) {
  if (typeof fn !== 'function') {
    throw new Error('You must specify a valid function');
  }

  var start = new Date().getTime();
  var answer = fn();
  var end = new Date().getTime();

  return { answer: answer, time: end - start };
}

/**
 * Opens the specified file and splits the contents based on the
 *  specified pattern.
 * @returns {Array} The split contents of the file.
 */
function openAndSplit(fileName, pattern) {
  try {
    return fs.readFileSync(__dirname + '/files' + fileName, 'ascii').split(pattern);
  } catch (err) {
    console.error('Unable to read file :(');
    console.log(err);
  }
}

/**
 * Calculate the area of a triangle based on the three line segments
 *  that make up the triangle.
 * @param {Object} a First line segment.
 * @param {Object} b Second line segment.
 * @param {Object} c Third line segment.
 * @returns {Number} The are of the triangle.
 */
function calculateTriangleArea(a, b, c) {
  return Math.abs(0.5 * ((a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y)));
}

/**
 * Calculate the score for the names in the specified file.
 * @param {String} fileName The file with the names.
 * @returns {Number} The total score of all names in the file.
 */
function calculateScore (fileName) {
  var score = 0
    , names = []
    , cleanIndex = 0
    , alpha = 'abcdefghijklmnopqrstuvwxyz'
    , nameData = openAndSplit(fileName, ',');

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

/* ==========================================================================
 Constructors
========================================================================== */



/* ==========================================================================
 Routing
========================================================================== */

/**
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', {
      title: 'Euler : JavaScript'
  });
};

/**
 * GET solution for problem 1
 */
exports.problem1 = function(req, res) {
 var result = timedFunction(function() {
   var answer = 0, i;
   
   for (i = 0; i < 1000; i++) {
     if (i % 3 === 0 || i % 5 === 0) {
       answer += i;
     }
   }
   
   return answer;
 });
 
 res.render('solution', {
     title: 'Problem 1'
   , link: 'http://projecteuler.net/problem=1'
   , time: result.time
   , answer: result.answer
 });
};

/**
 * GET solution for problem 2
 */
exports.problem2 = function(req, res) {
  var result = timedFunction(function() {
    var first  = 0
      , second = 1
      , count  = 2
      , next   = 3
      , answer = 0;
    
    while (next < 4000000) {
      next = first + second;
      first = second;
      second = next;
      
      if ((next % 2) === 0) {
        answer += next;
      }
    }
    
    return answer;
  });
  
  res.render('solution', {
      title: 'Problem 2'
    , link: 'http://projecteuler.net/problem=2'
    , time: result.time
    , answer: result.answer
  });
};

/**
 * GET solution for problem 22
 */
 exports.problem22 = function(req, res) {
   var result = timedFunction(function() {
     return calculateScore('/names.txt');
   });
   
   res.render('solution', {
       title: 'Problem 22'
     , link: 'http://projecteuler.net/problem=22'
     , time: result.time
     , answer: result.answer
   });
 };

/**
 * GET solution for problem 25
 */
exports.problem25 = function(req, res) {
  // Fibonacci magic!
  var result = timedFunction(function() {
    var PHI = (1 + Math.sqrt(5)) / 2;
    return Math.ceil(((Math.log(10) * 999) + Math.log(5) / 2) / Math.log(PHI));
  });

  res.render('solution', {
    title: 'Problem 25'
  , link: 'http://projecteuler.net/problem=25'
  , time: result.time
  , answer: result.answer
  });
};

/**
 * GET solution for problem 102
 */
exports.problem102 = function(req, res) {
  var result = timedFunction(function() {
    var answer = 0
      , tri = openAndSplit('/triangles.txt', '\r\n')
      , i;
    
    for (i = 0; i < tri.length; i++) {
      var line = tri[i].split(',');
      if (line.length >= 6) {
        var a = { x: line[0], y: line[1] }
          , b = { x: line[2], y: line[3] }
          , c = { x: line[4], y: line[5] }
          , p = { x: 0, y: 0 };
        
        var area = calculateTriangleArea(a, b, c)
          , ap   = calculateTriangleArea(a, b, p)
          , bp   = calculateTriangleArea(a, p, c)
          , cp   = calculateTriangleArea(p, b, c);

        if (area === ap + bp + cp) {
          answer++;
        }
      }
    }
    
    return answer;
  });
  
  res.render('solution', {
      title: 'Problem 102'
    , link: 'http://projecteuler.net/problem=102'
    , time: result.time
    , answer: result.answer
  });
};

/**
 * GET 404 page
 */
exports.notfound = function(req, res) {
  res.render('404', {
    title: 'Not found :('
  });
};

