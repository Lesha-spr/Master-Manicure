// Template
import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        ITEM: '.block__item'
    },
    CLASSES: {
        ACTIVE_ITEM: 'block__item_state_active'
    },
    PAGE: 1
};

class Articles {
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
        this.getArticles(DEFAULTS.PAGE);
    }

    bindEvents() {

    }

    getArticles(page) {
        let data = {
            page: page
        };

        $.ajax({
            url: app.SERVICES.ARTICLES,
            dataType: 'json',
            data: data,
            success: data => {
                this.render(data);
            }
        });
    }

    render(data = {}) {
        let template = app.templates['articles'](data);

        this.elems.$root.html(template);
    }
}

export default Articles;