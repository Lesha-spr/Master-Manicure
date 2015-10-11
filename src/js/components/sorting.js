import $ from 'jquery';
import app from './../app.js';

const DEFAULTS = {
    SELECTORS: {
        INPUT: '.sorting__input'
    }
};

class Sorting {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $input: $root.find(DEFAULTS.SELECTORS.INPUT)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.getActive();
    }

    getActive() {
        let sorting = $.bbq.getState().sorting || this.elems.$input.eq(0).val();

        this.elems.$input.filter((index, input) => {
            return input.value === sorting;
        }).prop('checked', true);
    }

    bindEvents() {
        this.elems.$root.on('change', DEFAULTS.SELECTORS.INPUT, this.pushState.bind(this));
    }

    pushState() {
        let data = $.deparam(this.elems.$root.serialize());

        $.bbq.pushState(data);
    }
}

export default Sorting;