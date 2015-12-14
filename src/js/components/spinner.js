import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        SPINNER: '.spinner'
    }
};

class Spinner {
    constructor() {
        this.template = null;
        this.initialize();
    }

    initialize() {
        this.template = app.templates['spinner']();
    }

    show($element) {
        $element.append(this.template);
    }

    hide($element) {
        $element.find(DEFAULTS.SELECTORS.SPINNER).remove();
    }
}

export default Spinner;