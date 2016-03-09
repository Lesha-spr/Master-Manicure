import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        ONE_CLICK_BUY: '.one-click-buy'
    },
    CLASSES: {
        ACTIVE_BUTTON: 'ui-button_state_active'
    },
    // NOTE: should be some i18n, not the default text string
    TEXT: 'В корзине'
};

class AddToCart {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root
        };

        this.bindEvents();
    }

    bindEvents() {
        this.elems.$root.one('submit', this.addToCart.bind(this));
    }

    addToCart(event) {
        if (this.elems.$root.parents('.product-in-basket').length) {
            return false;
        }

        let data = $.extend({
            count: 1,
            action: app.ACTIONS.ADD_TO_CART
        }, app.SERVICES.BASE, $.deparam(this.elems.$root.serialize()));
        let selector = `[data-product-id="${this.elems.$root[0].elements[0].value}"]`;

        event.stopPropagation();
        event.preventDefault();

        $.ajax({
            url: '/?' + $.param(data),
            type: 'POST',
            success: (data) => {
                app.pubsub.publish(app.EVENTS.UPDATE_CART);
                $(selector).addClass(DEFAULTS.CLASSES.ACTIVE_BUTTON).text(DEFAULTS.TEXT);
            }
        });
    }
}

export default AddToCart;