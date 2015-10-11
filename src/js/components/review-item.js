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

    }

    bindEvents() {
        this.elems.$reply.on('click', this.render.bind(this));
    }

    render(data = {}) {

    }
}

export default ReviewItem;