import $ from 'jquery';
import app from './../app.js';

const DEFAULTS = {};

class Navigation {
    constructor(element) {
        this.elems = {
            $component: $(element)
        };

        this.initialize();
    }

    initialize() {
        console.log(app.templates.component());
    }
}

app.Navigation = Navigation;

export default Navigation;