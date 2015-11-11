import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        BUTTON: '.add-to-cart'
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
            $root: $root,
            $button: $root.find(DEFAULTS.SELECTORS.BUTTON)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        // Initialize logic
        // this.render(); Example
    }

    bindEvents() {
        this.elems.$root.one('submit', this.addToCart.bind(this));
    }

    addToCart(event) {
        let data = $.deparam(this.elems.$root.serialize());
        let selector = `[data-product-id="${data.product}"]`;

        event.preventDefault();

        $.ajax({
            url: app.SERVICES.ADD_TO_CART,
            data: data,
            dataType: 'json',
            success: (data) => {
                $(selector).addClass(DEFAULTS.CLASSES.ACTIVE_BUTTON).text(DEFAULTS.TEXT);

                app.pubsub.publish(app.EVENTS.UPDATE_CART);
                console.log(data);
            }
        });
    }
}

export default AddToCart;