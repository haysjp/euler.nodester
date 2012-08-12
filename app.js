/*
 * javascript-euler
 * https://github.com/fiveisprime/euler.nodester
 *
 * Copyright (c) 2012 Matt Hernandez
 * Licensed under Creative Commons license.
 */

/**
 * Module dependencies.
 */
var express = require('express')
  , http    = require('http')
  , routes  = require('./routes')
  , path    = require('path');

var app = express();

/**
 * Server configuration.
 */
app.configure(function(){
  app.set('port', process.env.PORT || 20109);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express['static'](path.join(__dirname, 'public')));

  // Make sure the the router is last. This will allow 'public' to
  // take precedence over *
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * Requests
 */
app.get('/', routes.index);
app.get('/1', routes.problem1);
app.get('/2', routes.problem2);
app.get('/22', routes.problem22);
app.get('/25', routes.problem25);
app.get('/102', routes.problem102);

// 404 all the things
app.get('*', routes.notfound);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
