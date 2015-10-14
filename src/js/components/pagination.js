import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        ITEM: '.pagination__item'
    },
    PAGE: 1
};

class Pagination {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $item: $root.find(DEFAULTS.SELECTORS.ITEM),
            $window: $(window)
        };

        this.data = null;
        this.sorting = $.bbq.getState().sorting;

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.getPagination(true);
    }

    bindEvents() {
        this.elems.$window.on('hashchange', this.getPagination.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.ITEM, this.goToPage.bind(this));
    }

    goToPage(event) {
        let page = $(event.currentTarget).data('page');

        $.bbq.pushState({
            page: page
        });
    }

    getPagination(force = false) {
        let sorting = $.bbq.getState().sorting;

        if (force === true || sorting !== this.sorting) {
            this.sorting = sorting;

            $.ajax({
                url: app.SERVICES.PAGINATION,
                dataType: 'json',
                data: {
                    sorting: this.sorting
                },
                success: data => {
                    this.data = data;
                    this.render(this.data);
                }
            });
        } else {
            this.render(this.data);
        }
    }

    render(data = {}) {
        data.pagination.page = $.bbq.getState().page || DEFAULTS.PAGE;

        let template = app.templates['pagination'](data);

        this.elems.$root.html(template);
    }
}

export default Pagination;