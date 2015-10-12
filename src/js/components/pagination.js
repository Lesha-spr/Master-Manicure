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

class Pagination {
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
        this.getPagination();
    }

    bindEvents() {
        this.elems.$root.on('click', DEFAULTS.SELECTORS.ITEM, this.render.bind(this));
    }

    getPagination() {
        let data = {
            page: $.bbq.getState().page || DEFAULTS.PAGE
        };

        $.ajax({
            url: app.SERVICES.PAGINATION,
            dataType: 'json',
            data: data,
            success: data => {
                this.render(data);
            }
        });
    }

    render(data = {}) {
        let template = app.templates['pagination'](data);

        this.elems.$root.html(template);
    }
}

export default Pagination;