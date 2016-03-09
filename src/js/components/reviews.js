import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        LIST: '.reviews__list',
        GET_MORE: '.reviews__get-more'
    }
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
        let data = $.extend({
            action: app.ACTIONS.GET_REVIEWS
        }, app.SERVICES.REVIEWS, {mid: 1, cid: 1});

        event.stopPropagation();
        event.preventDefault();

        $.ajax({
            url: '/?' + $.param(data),
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                this.render(data);
            },
            beforeSend: () => {
                app.Spinner.show(this.elems.$root);
            },
            complete: () => {
                app.Spinner.hide(this.elems.$root);
            }
        });
    }

    render(data = []) {
        if (data && data.length) {
            let template = app.templates['reviews'](data);

            this.elems.$list.append(template);
            app.submodules(this.elems.$list);
        } else {
            this.elems.$getMore.remove();
        }
    }
}

export default Reviews;