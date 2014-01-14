
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

/**
 * Create a new instance of the express app, but also export
 * it as a node module so that grunt-express can spin off 
 * a new instance.
 */
var app = express();
module.exports = app;

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var TodoSchema = require('./models/Todo.js').TodoSchema;
var Todo = db.model('todos', TodoSchema);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index(Todo));
app.get('/webApp', routes.webApp(Todo));
app.get('/users', user.list);
app.get('/todos.json', routes.get(Todo));

app.put('/todo/:id.json', routes.update(Todo));

app.post('/todo.json', routes.addTodo(Todo));

// Only create server instance in production. For development let grunt-express launch
// the instance so it can do cool things like inject livereload middleware into the
// server's request stack!
//if ('production' == app.get('env')) {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
//}
