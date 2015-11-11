import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        ITEM: '.block__item'
    },
    CLASSES: {
        ACTIVE_ITEM: 'block__item_state_active'
    }
};

class ProductMenu {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        // Initialize logic
        // this.render(); Example
    }

    bindEvents() {
        this.elems.$root.on('click', DEFAULTS.SELECTORS.ITEM, this.render.bind(this));
    }
}

export default ProductMenu;