import app from './../app.js';
import $ from 'jquery';
import AjaxError from './../errors/base.js';

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
        MOB_FILTER: '.nav__filter',
        NAV_MOBILE: '.nav__mobile',
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
            $mobFilter: $root.find(DEFAULTS.SELECTORS.MOB_FILTER),
            $navMobile: $root.find(DEFAULTS.SELECTORS.NAV_MOBILE),
            $html: $(document.documentElement),
            $window: $(window)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {

    }

    bindEvents() {
        this.elems.$root.on('click', DEFAULTS.SELECTORS.ITEM, this.open.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.NAV_MENU, this.toggleMenu.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.CLOSE, this.closeFilters.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.NAV_MOBILE_GET_FILTERS, this.openMenu.bind(this));
        this.elems.$navBack.on('click',this.closeNav.bind(this));
    }

    open(event) {
        if ($(event.currentTarget).is('.active')) {
            event.preventDefault();
            this.elems.$navWrapper.toggleClass(DEFAULTS.CLASSES.NAV_EXPANDED);
            this.elems.$html.toggleClass(DEFAULTS.CLASSES.FILTER_EXPANDED).toggleClass(DEFAULTS.CLASSES.NAV_ACTIVE);
        }
    }

    openMenu(event) {
        if (event) {
            event.preventDefault();
        }

        this.elems.$html.toggleClass(DEFAULTS.CLASSES.FILTER_EXPANDED);
    }

    closeFilters(event) {
        event.preventDefault();

        this.elems.$item.removeClass(DEFAULTS.CLASSES.ACTIVE_ITEM);
        this.elems.$html.removeClass(DEFAULTS.CLASSES.FILTER_EXPANDED);
    }

    toggleMenu(event) {
        event.preventDefault();

        this.elems.$navWrapper.addClass(DEFAULTS.CLASSES.NAV_EXPANDED);
        this.elems.$html.removeClass(DEFAULTS.CLASSES.FILTER_EXPANDED).addClass(DEFAULTS.CLASSES.NAV_ACTIVE);
    }

    closeNav(event) {
        event.preventDefault();

        this.elems.$html.removeClass(DEFAULTS.CLASSES.NAV_ACTIVE);
        this.elems.$navWrapper.removeClass(DEFAULTS.CLASSES.NAV_EXPANDED);
    }
}

export default Filters;