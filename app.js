var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();


// logging and body-parsing
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// statically serve front-end dependencies
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/angular', express.static(__dirname + '/node_modules/angular'));

// serve dynamic routes
app.use('/api', require('./server/routes'));

// serve the files for the Angular app
app.use(express.static(__dirname + '/browser'));
app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/browser/templates/index.html');
});



// failed to catch req above means 404, forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log({ error: err });
  res.send();
});

// listen on a port
var port = 8080;
app.listen(port, function () {
	console.log('The server is listening closely on port', port);
});
