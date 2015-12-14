import app from './../app.js';
import $ from 'jquery';
import mask from 'jquery.inputmask';

const DEFAULTS = {
    SELECTORS: {
        PHONE: '[name="phone"]'
    }
};

class Checkout {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $phone: $root.find(DEFAULTS.SELECTORS.PHONE)
        };

        this.initialize();
    }

    initialize() {
        this.elems.$phone.inputmask('(999) 9999999');
    }
}

export default Checkout;