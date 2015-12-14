import $ from 'jquery';
import app from './../app.js';
import AjaxError from './../errors/base.js';

const DEFAULTS = {
    COUNT: 0,
    SELECTORS: {
        INNER: '.mini-cart__inner',
        WRAPPER: '.mini-cart__icon',
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
            $sideCart: $(''),
            $html: $('html')
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.getCart();
    }

    bindEvents() {
        this.elems.$root.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', DEFAULTS.SELECTORS.WRAPPER, () => {
            this.elems.$root.find(DEFAULTS.SELECTORS.WRAPPER).removeClass(DEFAULTS.CLASSES.TOGGLING);
        });
        this.elems.$root.on('click', DEFAULTS.SELECTORS.WRAPPER, this.toggleSide.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.CLOSE, this.toggleSide.bind(this));
        app.pubsub.subscribe(app.EVENTS.UPDATE_CART, this.onUpdateCart.bind(this));
    }

    toggleSide(event) {
        event.preventDefault();
        event.stopPropagation();

        this.elems.$html.toggleClass(DEFAULTS.CLASSES.GLOBAL_SIDE_ACTIVE);
        this.elems.$sideCart.toggleClass(DEFAULTS.CLASSES.SIDE_ACTIVE);
    }

    onUpdateCart() {
        this.elems.$root.find(DEFAULTS.SELECTORS.WRAPPER).addClass(DEFAULTS.CLASSES.TOGGLING);
    }

    getCart() {
        $.ajax({
            url: app.SERVICES.CART,
            dataType: 'json',
            success: data => {
                this.render(data);
            },
            error: (jqXhr, textStatus, errorThrown) => {
                // TODO: here should be proper error handling
                this.render({
                    count: DEFAULTS.COUNT
                });

                new AjaxError(...arguments);
            }
        });
    }

    render(data) {
        let template = app.templates['mini-cart'](data);

        this.elems.$inner.html(template);
        this.elems.$sideCart = this.elems.$root.find(DEFAULTS.SELECTORS.SIDE_CART);

        app.submodules(this.elems.$sideCart);
    }
}

export default MiniCart;