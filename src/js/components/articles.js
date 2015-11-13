import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    CLASSES: {
        ACTIVE_ITEM: 'block__item_state_active'
    },
    PAGE: 1,
    SORTING: 'new'
};

class Articles {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $window: $(window)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.getArticles(DEFAULTS.PAGE);
    }

    bindEvents() {
        this.elems.$window.on('hashchange', this.getArticles.bind(this));
    }

    getArticles() {
        let state = $.bbq.getState();
        let data = {
            page: state.page || DEFAULTS.PAGE,
            sorting: state.sorting || DEFAULTS.SORTING
        };

        $.ajax({
            url: app.SERVICES.ARTICLES,
            dataType: 'json',
            data: data,
            success: data => {
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

    render(data = {}) {
        let template = app.templates['articles'](data);

        this.elems.$root.html(template);
    }
}

export default Articles;