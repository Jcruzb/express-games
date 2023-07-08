const express = require('express');
const logger = require('morgan');
const hbs = require('hbs');

const app = express();

require('./config/db.config');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false })); // Para que me inyecte el req.body

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));

const routes = require('./config/routes.config');
app.use(routes);

app.listen(3000, () => console.log('App listening on port 3000!'));