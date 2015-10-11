import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        LIST: '.reviews__list',
        GET_MORE: '.reviews__get-more',
        REPLY: '.review__reply'
    },
    STEP: 1
};

class Reviews {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $list: $root.find(DEFAULTS.SELECTORS.LIST),
            $getMore: $root.find(DEFAULTS.SELECTORS.GET_MORE)
        };

        this.step = this.step || DEFAULTS.STEP;

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.getReviews();
    }

    bindEvents() {
        this.elems.$getMore.on('click', this.getReviews.bind(this));
    }

    getReviews() {
        let data = {
            step: this.step
        };

        $.ajax({
            url: app.SERVICES.REVIEWS,
            dataType: 'json',
            data: data,
            success: data => {
                this.step += DEFAULTS.STEP;

                this.render(data);
            }
        });
    }

    render(data = {}) {
        if (data.entries && data.entries.length) {
            let template = app.templates['reviews'](data);

            this.elems.$list.append(template);
            app.start();
        } else {
            this.elems.$getMore.remove();
        }
    }
}

export default Reviews;