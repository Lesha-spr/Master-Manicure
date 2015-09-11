var $ = require('jquery');
var app = require('./../app');

class Navigation {
    constructor($element) {
        this.elems = {
            $component: $element
        };

        this.initialize();
    }

    initialize() {

    }
}

module.exports = Navigation;