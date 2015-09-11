var $ = require('jquery');
var pubsub = require('./pubsub');

var MM = {
    modules: {}
};

var app = MM;

app.pubsub = new pubsub();

module.exports = app;

// Components
app.Navigation = require('./components/navigation');

$(function() {
    require('./start')(app, document.querySelectorAll('[data-module]'));
});
