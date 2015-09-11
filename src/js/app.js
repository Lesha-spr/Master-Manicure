var $ = require('jquery');

var MM = {
    modules: {}
};

var app = MM;

// Components
app.Navigation = require('./components/navigation');

require('./start')(app, document.querySelectorAll('[data-module]'));