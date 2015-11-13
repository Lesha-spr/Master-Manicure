import app from './../app.js';
import $ from 'jquery';
import Filters from './filters.js';

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

class SupFilters extends Filters {
    constructor(element) {
        super(element);
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

    // Rewrite
    bindEvents() {
        this.elems.$root.on('click', DEFAULTS.SELECTORS.NAV_MENU, this.toggleMenu.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.CLOSE, this.closeFilters.bind(this));
        this.elems.$navBack.on('click',this.closeNav.bind(this));
    }
}

export default SupFilters;