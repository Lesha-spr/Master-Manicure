var $ = require('jquery');
var pubsub = require('./pubsub');

var MM = {};
var app = MM;

app.modules = {};
app.pubsub = new pubsub();

module.exports = app;

// Components
app.Navigation = require('./components/navigation');

$(function() {
    require('./start')(app, document.querySelectorAll('[data-module]'));
});
