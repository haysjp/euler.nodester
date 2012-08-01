
/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();

/**
 * Server configuration.
 */
app.configure(function(){
  app.set('port', process.env.PORT || 20109);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Handle index - link to the files.
app.get('/', function(req, res) {
  res.render('index', {
      title: 'Project Euler solutions using JavaScript'
  });
});

// Handle the small file.
app.get('/small', function(req, res) {
  var start = new Date().getTime();
  var score = calculateScore('names.txt');
  var end = new Date().getTime();
  
  res.render('score', {
      title: 'Project Euler - Problem 22'
    , time: end - start
    , score: score
  });
});

// Handle the big file
app.get('/big', function(req, res) {
  var start = new Date().getTime();
  var score = calculateScore('names-big.txt');
  var end = new Date().getTime();
  
  res.render('score', {
      title: 'Project Euler - Problem 22'
    , time: end - start
    , score: score
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

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
    , alpha = 'abcdefghijklmnopqrstuvwxyz';

  try {
    var nameData = fs.readFileSync(fileName, 'ascii').split(',');
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
    };
    
    // Add the index multiplier.
    score += thisScore * (index + 1);
  });
  
  return score;
}
