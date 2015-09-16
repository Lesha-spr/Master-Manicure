import app from './../app.js';

const DEFAULTS = {};

class Navigation {
    constructor($element) {
        this.elems = {
            $component: $element
        };

        this.initialize();
    }

    initialize() {
        console.log(app.templates.component());
    }
}

module.exports = Navigation;