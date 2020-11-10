var express = require('express');
var app = express();

const roleRoute = require('./role');
const areaRoute = require('./area');
const clusterRoute = require('./cluster');
const clubRoute = require('./club');
const userRoute = require('./user');
const personCardRoute = require('./personcard');
const eventRoute = require('./event');
const messageRoute = require('./message');
const menuPageRoute = require('./menupage');
const utilRoute = require('./util');

app.use('/role', roleRoute );
app.use('/area', areaRoute );
app.use('/cluster', clusterRoute );
app.use('/club', clubRoute );
app.use('/user', userRoute );
app.use('/personcard', personCardRoute );
app.use('/event', eventRoute );
app.use('/message', messageRoute );
app.use('/menupage', menuPageRoute );
app.use('/util', utilRoute );

module.exports = app;
