import $ from 'jquery';
import app from './../app.js';

const DEFAULTS = {
    SELECTORS: {
        INPUT: '.sorting__item'
    },
    SORTING: 'rating'
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
        let sorting = $.bbq.getState().sorting || DEFAULTS.SORTING;

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