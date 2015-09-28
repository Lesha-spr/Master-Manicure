import app from './../app.js';
import $ from 'jquery';
import _ from 'lodash';
import state from './../helpers/bbq.js';

const DEFAULTS = {
    SELECTORS: {
        ITEM: '.filters__item',
        SIDE: '.filters__side',
        CONTROL: '.filters__control'
    },
    CLASSES: {
        ACTIVE_ITEM: 'filters__item_state_active',
        LAST_ACTIVE_ITEM: 'filters__item_state_last-active',
        ACTIVE_SIDE: 'filters__side_state_active',
        FILTER_EXPANDED: 'g-filter-expanded'
    }
};

class Filters {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $item: $root.find(DEFAULTS.SELECTORS.ITEM),
            $side: $root.find(DEFAULTS.SELECTORS.SIDE),
            $html: $(document.documentElement),
            $window: $(window)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {}

    bindEvents() {
        // TODO: migrate to bbq
        this.elems.$window.on('statechange popstate', this.getFilter.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.ITEM, this.chooseCategory.bind(this));
        this.elems.$root.on('change', DEFAULTS.SELECTORS.CONTROL, this.resolveQuery.bind(this));
    }

    resolveQuery(event) {
        // TODO: migrate to bbq
        let $form = $(event.currentTarget.form);
        let param = $form.serializeArray();

        state.pushState(param);
    }

    chooseCategory(event) {
        let $current = $(event.currentTarget);
        let isCurrentActive = $current.hasClass(DEFAULTS.CLASSES.ACTIVE_ITEM);

        event.preventDefault();

        this.elems.$html.toggleClass(DEFAULTS.CLASSES.FILTER_EXPANDED, !isCurrentActive);
        this.elems.$item.removeClass(DEFAULTS.CLASSES.ACTIVE_ITEM);
        $current.toggleClass(DEFAULTS.CLASSES.ACTIVE_ITEM, !isCurrentActive);

        if (!isCurrentActive && !$current.hasClass(DEFAULTS.CLASSES.LAST_ACTIVE_ITEM)) {
            state.pushState({
                category: $current.data('category')
            });

            this.elems.$item.removeClass(DEFAULTS.CLASSES.LAST_ACTIVE_ITEM);
            $current.addClass(DEFAULTS.CLASSES.LAST_ACTIVE_ITEM);
        }
    }

    getFilter() {
        // TODO: migrate to bbq
        $.ajax({
            url: app.SERVICES.FILTERS,
            data: {},
            dataType: 'json',
            success: data => {
                this.render(data);
            }
        });
    }

    render(data = {}) {
        let template = app.templates['filters'](data);

        this.elems.$side.html(template);
    }
}

export default Filters;