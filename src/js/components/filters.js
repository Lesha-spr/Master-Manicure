import app from './../app.js';
import $ from 'jquery';
import AjaxError from './../errors/base.js';

const DEFAULTS = {
    SELECTORS: {
        ITEM: '.filters__item',
        SIDE: '.filters__side',
        CONTROL: '.filters__control',
        CLOSE: '.filters__close',
        NAV: '.nav__main',
        NAV_WRAPPER: '.nav__wrapper',
        NAV_MENU: '.nav__menu',
        NAV_BACK: '.nav__back'
    },
    CLASSES: {
        ACTIVE_ITEM: 'filters__item_state_active',
        CURRENT_ITEM: 'filters__item_state_current',
        LAST_ACTIVE_ITEM: 'filters__item_state_last-active',
        ACTIVE_SIDE: 'filters__side_state_active',
        FILTER_EXPANDED: 'g-filter-expanded',
        NAV_EXPANDED: 'nav__wrapper_expanded'
    }
};

class Filters {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $item: $root.find(DEFAULTS.SELECTORS.ITEM),
            $side: $root.find(DEFAULTS.SELECTORS.SIDE),
            $nav: $root.find(DEFAULTS.SELECTORS.NAV),
            $navWrapper: $root.find(DEFAULTS.SELECTORS.NAV_WRAPPER),
            $navBack: $root.find(DEFAULTS.SELECTORS.NAV_BACK),
            $html: $(document.documentElement),
            $window: $(window)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.getActive();
    }

    getActive() {
        let category = $.bbq.getState().category;

        this.elems.$item.removeClass(DEFAULTS.CLASSES.CURRENT_ITEM).filter((index, item) => {
            return $(item).data('category') === category;
        }).addClass(DEFAULTS.CLASSES.CURRENT_ITEM);
    }

    bindEvents() {
        this.elems.$root.on('click', DEFAULTS.SELECTORS.ITEM, this.chooseCategory.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.NAV_MENU, this.toggleMenu.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.CLOSE, this.closeFilters.bind(this));
        this.elems.$navBack.on('click',this.closeNav.bind(this));
        this.elems.$root.on('change', DEFAULTS.SELECTORS.CONTROL, this.pushState.bind(this));
    }

    closeFilters(event) {
        event.preventDefault();

        this.elems.$item.removeClass(DEFAULTS.CLASSES.ACTIVE_ITEM);
        this.elems.$html.removeClass(DEFAULTS.CLASSES.FILTER_EXPANDED);
    }

    toggleMenu(event) {
        event.preventDefault();

        this.elems.$navWrapper.addClass(DEFAULTS.CLASSES.NAV_EXPANDED);
        this.elems.$html.removeClass(DEFAULTS.CLASSES.FILTER_EXPANDED);
    }

    closeNav(event) {
        event.preventDefault();

        this.elems.$navWrapper.removeClass(DEFAULTS.CLASSES.NAV_EXPANDED);
    }

    pushState(event) {
        let $form = $(event.currentTarget.form);
        let state = $.deparam($form.serialize());

        this.elems.$window.scrollTop(0);
        state.page = 1;

        $.bbq.pushState(state);

        this.getFilter();
    }

    chooseCategory(event) {
        let $current = $(event.currentTarget);
        let isCurrentActive = $current.hasClass(DEFAULTS.CLASSES.ACTIVE_ITEM);

        event.preventDefault();

        this.elems.$navWrapper.removeClass(DEFAULTS.CLASSES.NAV_EXPANDED);
        this.elems.$html.toggleClass(DEFAULTS.CLASSES.FILTER_EXPANDED, !isCurrentActive);
        this.elems.$item.removeClass(DEFAULTS.CLASSES.ACTIVE_ITEM);
        $current.toggleClass(DEFAULTS.CLASSES.ACTIVE_ITEM, !isCurrentActive);

        if (!isCurrentActive && !$current.hasClass(DEFAULTS.CLASSES.LAST_ACTIVE_ITEM)) {
            this.elems.$window.scrollTop(0);
            $.bbq.pushState({
                category: $current.data('category'),
                page: 1
            });

            this.elems.$item.removeClass(DEFAULTS.CLASSES.LAST_ACTIVE_ITEM);
            $current.addClass(DEFAULTS.CLASSES.LAST_ACTIVE_ITEM);

            this.getActive();
            this.getFilter();
        }
    }

    getFilter() {
        let data = $.bbq.getState();

        if (data.category) {
            $.ajax({
                url: app.SERVICES.FILTERS,
                data: data,
                dataType: 'json',
                success: data => {
                    this.render(data);
                },
                error: (jqXhr, textStatus, errorThrown) => {
                    new AjaxError(...arguments);
                },
                beforeSend: () => {
                    app.Spinner.show(this.elems.$root);
                },
                complete: () => {
                    app.Spinner.hide(this.elems.$root);
                }
            });
        }
    }

    render(data = {}) {
        let template = app.templates['filters'](data);

        this.elems.$side.html(template);
    }
}

export default Filters;