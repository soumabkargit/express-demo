const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const config = require('config');
var _ = require('underscore');
var mysql = require('mysql');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const app =  express();
app.use(express.json()); // req.body
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use(helmet());
app.use('/', home);
app.use('/api/courses', courses);
app.set('view engine','pug');
app.set('views','./views');

if (app.get('env')==='development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enable...');
}

console.log(`NODE_ENV: ${process.env.NODE_ENV}`) ;
console.log(`app: ${app.get('env')}`) ;
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
//console.log(`Mail Server: ${config.get('mail.password')}`);
dbDebugger('Connected to the database ...');
var result = _.contains([1,2,3],2);
console.log(result);
const port = process.env.PORT || 3000;
 app.listen(3000, ()=> console.log(`Listening on port ...${port}`));

