import $ from 'jquery';
import app from './../app.js';
import AjaxError from './../errors/base.js';

const DEFAULTS = {
    SELECTORS: {
        INNER: '.mini-cart__inner',
        WRAPPER: '.mini-cart__icon',
        ENTRIES: '.mini-cart__entries',
        SIDE_CART: '.mini-cart__side',
        CLOSE: '.mini-cart__close'
    },
    CLASSES: {
        TOGGLING: 'mini-cart__icon_state_toggling',
        SIDE_ACTIVE: 'mini-cart__side_state_active',
        GLOBAL_SIDE_ACTIVE: 'g-side-active'
    }
};

class MiniCart {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $inner: $root.find(DEFAULTS.SELECTORS.INNER),
            $sideCart: $root.find(DEFAULTS.SELECTORS.SIDE_CART),
            $html: $('html')
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {

    }

    bindEvents() {
        this.elems.$root.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', DEFAULTS.SELECTORS.WRAPPER, () => {
            this.elems.$root.find(DEFAULTS.SELECTORS.WRAPPER).removeClass(DEFAULTS.CLASSES.TOGGLING);
        });
        this.elems.$root.on('click', DEFAULTS.SELECTORS.WRAPPER, this.toggleSide.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.CLOSE, this.toggleSide.bind(this));
        app.pubsub.subscribe(app.EVENTS.UPDATE_CART, this.updateCart.bind(this));
    }

    toggleSide(event) {
        event.preventDefault();
        event.stopPropagation();

        // KOSTYL style
        if (+this.elems.$root.find(DEFAULTS.SELECTORS.ENTRIES).text()) {
            this.elems.$html.toggleClass(DEFAULTS.CLASSES.GLOBAL_SIDE_ACTIVE);
            this.elems.$sideCart.toggleClass(DEFAULTS.CLASSES.SIDE_ACTIVE);
        }
    }

    updateCart(options) {
        let data = $.extend({
            action: app.ACTIONS.UPDATE_CART
        }, app.SERVICES.BASE);

        $.ajax({
            url: '/?' + $.param(data),
            type: 'GET',
            beforeSend: () => {
                this.elems.$root.find(DEFAULTS.SELECTORS.WRAPPER).addClass(DEFAULTS.CLASSES.TOGGLING);
            },
            success: (html) => {
                this.elems.$root.html(html);

                this.elems.$inner = this.elems.$root.find(DEFAULTS.SELECTORS.INNER);
                this.elems.$sideCart = this.elems.$root.find(DEFAULTS.SELECTORS.SIDE_CART);

                if (!+this.elems.$root.find(DEFAULTS.SELECTORS.ENTRIES).text()) {
                    this.elems.$html.removeClass(DEFAULTS.CLASSES.GLOBAL_SIDE_ACTIVE);
                    this.elems.$sideCart.removeClass(DEFAULTS.CLASSES.SIDE_ACTIVE);

                    return this;
                }

                if (options && options.isOpen) {
                    this.elems.$html.addClass(DEFAULTS.CLASSES.GLOBAL_SIDE_ACTIVE);
                    this.elems.$sideCart.addClass(DEFAULTS.CLASSES.SIDE_ACTIVE);
                }

                app.submodules(this.elems.$sideCart);
            }
        });
    }
}

export default MiniCart;