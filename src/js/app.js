var $ = require('jquery');
var pubsub = require('./pubsub');

window.Handlebars = require('handlebars');
window.MM = {};

var app = MM;

app.modules = app.modules || {};
app.templates = app.templates || {};
app.pubsub = new pubsub();

module.exports = app;

// Components
app.Navigation = require('./components/navigation');

$(function() {
    require('./start')(app, document.querySelectorAll('[data-module]'));
});
