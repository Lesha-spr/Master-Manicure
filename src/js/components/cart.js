import app from './../app.js';
import $ from 'jquery';
import AjaxError from './../errors/base.js';

const DEFAULTS = {
    SELECTORS: {
        LIST: '.cart__list',
        ITEM: '.cart__item',
        QTY: '.cart__item-qty',
        REMOVE: '.cart__item-remove',
        ARTICLE: '.cart__item-article'
    },
    CLASSES: {
        ACTIVE_ITEM: 'block__item_state_active'
    }
};

class Cart {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $list: $root.find(DEFAULTS.SELECTORS.LIST)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.getCart();
    }

    getCart(data = {}, method = 'GET') {

        $.ajax({
            // NOTE: DELETE should be handled
            url: app.SERVICES.CART,
            dataType: 'json',
            data: data,
            method: method,
            success: data => {
                this.render(data);
            },
            error: (jqXhr, textStatus, errorThrown) => {
                new AjaxError(...arguments);
            }
        });
    }

    bindEvents() {
        this.elems.$root.on('change', DEFAULTS.SELECTORS.QTY, this.updateCart.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.REMOVE, this.removeFromCart.bind(this));
    }

    updateCart(event) {
        let $current = $(event.currentTarget).parents(DEFAULTS.SELECTORS.ITEM);
        let article = $current.find(DEFAULTS.SELECTORS.ARTICLE).val();
        let qty = $current.find(DEFAULTS.SELECTORS.QTY).val();

        this.getCart({
            article: article,
            qty: qty
        });
    }

    removeFromCart(event) {
        let $current = $(event.currentTarget).parents(DEFAULTS.SELECTORS.ITEM);
        let article = $current.find(DEFAULTS.SELECTORS.ARTICLE).val();

        this.getCart({
            article: article
        }, 'DELETE');
    }

    render(data = {title: 'Template'}) {
        let template = app.templates['cart'](data);

        this.elems.$list.html(template);
    }
}

export default Cart;