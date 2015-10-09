import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        REPLY: '.review__reply',
        FORM_HOLDER: '.review__reply-form'
    }
};

class ReviewItem {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $reply: $root.find(DEFAULTS.SELECTORS.REPLY),
            $formHolder: $root.find(DEFAULTS.SELECTORS.FORM_HOLDER)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        // Initialize logic
        // this.render(); Example
    }

    bindEvents() {
        this.elems.$reply.on('click', this.render.bind(this));
    }

    render(data = {}) {
        //let template = app.templates['template'](data);
        //
        //this.elems.$formHolder.html(template);
    }
}

export default ReviewItem;