import $ from 'jquery';
import app from './../app.js';
import AjaxError from './../errors/base.js';

const DEFAULTS = {
    ENTRIES: 0,
    SELECTORS: {
        INNER: '.mini-cart__inner'
    }
};

class MiniCart {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $inner: $root.find(DEFAULTS.SELECTORS.INNER)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        $.ajax({
            url: app.SERVICES.IN_YOUR_CART,
            dataType: 'json',
            success: data => {
                this.render(data);
            },
            error: (jqXhr, textStatus, errorThrown) => {
                // TODO: here should be proper error handling
                this.render({
                    entries: DEFAULTS.ENTRIES
                });

                new AjaxError(...arguments);
            }
        });
    }

    bindEvents() {
        app.pubsub.subscribe(app.EVENTS.IN_YOUR_CART, this.render);
    }

    render(data) {
        let template = app.templates['mini-cart'](data);

        this.elems.$inner.html(template);
    }
}

export default MiniCart;