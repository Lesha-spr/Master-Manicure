import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        SPINNER: '.spinner'
    },
    CLASSES: {
        FIXED: 'spinner_fixed'
    }
};

class Spinner {
    constructor() {
        this.spinner = null;
    }

    show($element, isFixed) {
        this.spinner = app.templates['spinner']({isFixed: isFixed});

        $element.append(this.spinner);
    }

    hide($element) {
        $element.find(DEFAULTS.SELECTORS.SPINNER).remove();
    }
}

export default Spinner;