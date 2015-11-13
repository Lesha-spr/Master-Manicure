import app from './../app.js';
import $ from 'jquery';
import _ from 'lodash';

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

    prepareData(data) {
        // Magic, don't touch!
        let edge = Math.round(data.pagination.show / 2);

        data.pagination.page = Number($.bbq.getState().page) || DEFAULTS.PAGE;
        data.showFirst = data.pagination.page > edge;
        data.preEllipsis = data.pagination.page > edge + 1;
        data.showLast = data.pagination.page < data.pagination.pageCount - Math.floor(data.pagination.show / 2);
        data.postEllipsis = data.pagination.page < data.pagination.pageCount - edge;

        if (data.preEllipsis) {
            data.preEllipsis = data.pagination.page - edge;
        }

        if (data.postEllipsis) {
            data.postEllipsis = data.pagination.page + edge;
        }

        return data;
    }

    render(data = {}) {
        let template = app.templates['pagination'](this.prepareData(data));

        this.elems.$root.html(template);
    }
}

export default Pagination;