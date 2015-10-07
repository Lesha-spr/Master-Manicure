// Template
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

class Template {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $item: $root.find(DEFAULTS.SELECTORS.ITEM)
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

    render(data = {title: 'Template'}) {
        let template = app.templates['template'](data);

        this.elems.$root.html(template);
    }
}

export default Template;