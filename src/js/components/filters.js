import app from './../app.js';
import $ from 'jquery';
import state from './../helpers/state.js';

const DEFAULTS = {
    SELECTORS: {
        ITEM: '.filters__item',
        SIDE: '.filters__side',
        CONTROL: '.filters__control'
    },
    CLASSES: {
        ACTIVE_ITEM: 'filters__item_state_active',
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
        this.elems.$window.on('statechange popstate', this.getFilter.bind(this));
        this.elems.$root.on('change', DEFAULTS.SELECTORS.CONTROL, this.resolveQuery.bind(this));
        this.elems.$item.on('click', this.chooseCategory.bind(this));
    }

    resolveQuery(event) {
        let $form = $(event.currentTarget.form);
        let param = $form.serializeArray();

        state.pushState(param);
    }

    chooseCategory(event) {
        let $current = $(event.currentTarget);
        let isCurrentActive = $current.hasClass(DEFAULTS.CLASSES.ACTIVE_ITEM);

        event.preventDefault();

        this.elems.$side.toggleClass(DEFAULTS.CLASSES.ACTIVE_SIDE, !isCurrentActive);
        this.elems.$html.toggleClass(DEFAULTS.CLASSES.FILTER_EXPANDED, !isCurrentActive);
        this.elems.$item.removeClass(DEFAULTS.CLASSES.ACTIVE_ITEM);
        $current.toggleClass(DEFAULTS.CLASSES.ACTIVE_ITEM, !isCurrentActive);

        if (!isCurrentActive) {
            state.pushState({
                category: $current.data('category')
            });
        }
    }

    getFilter() {
        $.ajax({
            url: app.SERVICES.FILTERS,
            data: state.getState(),
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