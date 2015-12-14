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
        let data = $.deparam(this.elems.$root.serialize());
        let selector = `[data-product-id="${data.product}"]`;

        event.stopPropagation();
        event.preventDefault();

        $.ajax({
            url: app.SERVICES.CART,
            data: data,
            type: 'POST',
            dataType: 'json',
            success: (data) => {
                $(selector).addClass(DEFAULTS.CLASSES.ACTIVE_BUTTON).text(DEFAULTS.TEXT);

                app.pubsub.publish(app.EVENTS.UPDATE_CART, data);
                console.log(data);
            }
        });
    }
}

export default AddToCart;