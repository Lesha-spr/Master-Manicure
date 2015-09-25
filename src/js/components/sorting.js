import $ from 'jquery';
import app from './../app.js';
import state from './../helpers/state.js';

const DEFAULTS = {
    SELECTORS: {
        ITEM: '.sorting__item'
    },
    CLASSES: {
        ACTIVE: 'sorting__item_state_active'
    },
    SORTING: 'rating'
};

class Sorting {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $item: $root.find(DEFAULTS.SELECTORS.ITEM),
            $window: $(window),
            $body: $(document.body)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.setActive();
    }

    bindEvents() {
        this.elems.$root.on('click', DEFAULTS.SELECTORS.ITEM, this.handleSorting.bind(this));
    }

    setActive() {
        let sorting = state.getState().sorting || DEFAULTS.SORTING;
        console.log(sorting);
    }

    handleSorting(event) {
        let $current = $(event.currentTarget);
        let sorting = $current.data('sorting');

        event.preventDefault();

        this.elems.$item.removeClass(DEFAULTS.CLASSES.ACTIVE);
        $current.addClass(DEFAULTS.CLASSES.ACTIVE);

        this.sort(sorting);
    }

    sort(sorting) {

    }
}

export default Sorting;