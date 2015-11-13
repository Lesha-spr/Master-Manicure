import app from './../app.js';
import $ from 'jquery';
import waypoints from 'waypoints/lib/noframework.waypoints.js';

const DEFAULTS = {
    SELECTORS: {
        NAV_ITEM: '.product-menu__nav-item',
        ANCHOR: '[data-anchor]'
    },
    CLASSES: {
        MENU_SHOWN: 'product-menu_state_shown',
        NAV_ITEM_ACTIVE: 'product-menu__nav-item_state_active'
    }
};

class ProductMenu {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $navItem: $root.find(DEFAULTS.SELECTORS.NAV_ITEM),
            $anchor: $(DEFAULTS.SELECTORS.ANCHOR),
            $window: $(window),
            $html: $('html, body')
        };

        this.waypoints = [];

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        let _this = this;

        this.elems.$anchor.each((index, element) => {
            this.waypoints.push(new Waypoint({
                element: element,
                handler: function() {
                    let selector = `[data-anchor-link="${$(this.element).data('anchor')}"]`;

                    _this.elems.$navItem.removeClass(DEFAULTS.CLASSES.NAV_ITEM_ACTIVE);
                    $(selector).addClass(DEFAULTS.CLASSES.NAV_ITEM_ACTIVE);
                },
                offset: _this.elems.$root.outerHeight(true)
            }));
        });
    }

    bindEvents() {
        this.elems.$window.on('scroll', this.toggleMenu.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.NAV_ITEM, this.scroll.bind(this));
    }

    toggleMenu() {
        let scrollTop = this.elems.$window.scrollTop();

        this.elems.$root.toggleClass(DEFAULTS.CLASSES.MENU_SHOWN, scrollTop >= this.elems.$root.outerHeight(true));
    }

    scroll(event) {
        event.preventDefault();

        let anchor = $(event.currentTarget).data('anchor-link');

        this.elems.$html.animate({
            scrollTop: $(`[data-anchor="${anchor}"]`).offset().top - this.elems.$root.outerHeight(true)
        }, 1000);
    }
}

export default ProductMenu;