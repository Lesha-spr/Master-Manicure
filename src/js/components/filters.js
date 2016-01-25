import app from './../app.js';
import $ from 'jquery';
import AjaxError from './../errors/base.js';
import Menu from './menu.js';

const DEFAULTS = {
    SELECTORS: {
        ITEM: '.filters__item',
        SIDE: '.filters__side',
        CONTROL: '.filters__control',
        CLOSE: '.filters__close, .nav__close',
        NAV: '.nav__main',
        NAV_WRAPPER: '.nav__wrapper',
        NAV_MENU: '.nav__menu',
        NAV_BACK: '.nav__back',
        NAV_MOBILE_GET_FILTERS: '.nav__filter-icon'
    },
    CLASSES: {
        ACTIVE_ITEM: 'filters__item_state_active',
        CURRENT_ITEM: 'filters__item_state_current',
        LAST_ACTIVE_ITEM: 'filters__item_state_last-active',
        ACTIVE_SIDE: 'filters__side_state_active',
        FILTER_EXPANDED: 'g-filter-expanded',
        NAV_ACTIVE: 'g-nav-active',
        NAV_EXPANDED: 'nav__wrapper_expanded'
    }
};

class Filters extends Menu {
    constructor(element) {
        super(element);
    }

    initialize() {
        this.getActive();
    }

    getActive(isCategoryChosen) {
        let category = $.bbq.getState().category;
        let $current = this.elems.$item.removeClass(DEFAULTS.CLASSES.CURRENT_ITEM).filter((index, item) => {
            return $(item).data('category') === category;
        });

        this.elems.$mobFilter.removeAttr('class').addClass(`nav__filter nav__filter_${$current.data('category')}`);

        if (!isCategoryChosen) {
            this.chooseCategory($current);
        }
    }

    bindEvents() {
        //this.elems.$root.on('click', DEFAULTS.SELECTORS.ITEM, this.chooseCategory.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.NAV_MENU, this.toggleMenu.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.CLOSE, this.closeFilters.bind(this));
        this.elems.$navBack.on('click',this.closeNav.bind(this));
        this.elems.$root.on('change', DEFAULTS.SELECTORS.CONTROL, this.pushState.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.NAV_MOBILE_GET_FILTERS, this.openMenu.bind(this));
    }

    pushState(event) {
        let $form = $(event.currentTarget.form);
        let state = $.deparam($form.serialize());

        this.elems.$window.scrollTop(0);
        state.page = 1;

        $.bbq.pushState(state);

        this.getFilter();
    }

    openMenu(event) {
        event.preventDefault();

        this.elems.$html.toggleClass(DEFAULTS.CLASSES.FILTER_EXPANDED);
    }

    chooseCategory(param) {
        let $current;
        if (param.currentTarget) {
            $current = $(param.currentTarget);
            param.preventDefault();
        } else {
            $current = param;
        }

        let isCurrentActive = $current.hasClass(DEFAULTS.CLASSES.ACTIVE_ITEM);

        this.elems.$navWrapper.removeClass(DEFAULTS.CLASSES.NAV_EXPANDED);
        this.elems.$html.removeClass(DEFAULTS.CLASSES.NAV_ACTIVE);
        if (!this.elems.$navMobile.is(':visible')) {
            this.elems.$html.toggleClass(DEFAULTS.CLASSES.FILTER_EXPANDED, !isCurrentActive);
        }
        this.elems.$item.removeClass(DEFAULTS.CLASSES.ACTIVE_ITEM);
        $current.toggleClass(DEFAULTS.CLASSES.ACTIVE_ITEM, !isCurrentActive);

        if (!isCurrentActive && !$current.hasClass(DEFAULTS.CLASSES.LAST_ACTIVE_ITEM)) {
            this.elems.$window.scrollTop(0);
            $.bbq.pushState({
                category: $current.data('category'),
                page: 1
            });

            this.elems.$item.removeClass(DEFAULTS.CLASSES.LAST_ACTIVE_ITEM).removeClass(DEFAULTS.CLASSES.CURRENT_ITEM);
            $current.addClass(DEFAULTS.CLASSES.LAST_ACTIVE_ITEM).addClass(DEFAULTS.CLASSES.CURRENT_ITEM);

            this.getFilter();
            this.getActive(true);
        }
    }

    getFilter() {
        let data = $.bbq.getState();

        if (data.category) {
            return $.ajax({
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