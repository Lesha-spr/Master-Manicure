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

    }

    bindEvents() {
        this.elems.$root.on('change', DEFAULTS.SELECTORS.QTY, this.changeCart.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.REMOVE, this.removeFromCart.bind(this));
    }

    changeCart(event) {
        let $current = $(event.currentTarget).parents(DEFAULTS.SELECTORS.ITEM);
        let id = $current.find(DEFAULTS.SELECTORS.ARTICLE).val();
        let count = $current.find(DEFAULTS.SELECTORS.QTY).val();
        let data = $.extend({
            action: app.ACTIONS.CHANGE_CART_COUNT,
            count: count,
            id: id
        }, app.SERVICES.BASE);

        $.ajax({
            url: '/?' + $.param(data),
            method: 'GET',
            error: (jqXhr, textStatus, errorThrown) => {
                new AjaxError(...arguments);
            },
            beforeSend: () => {
                app.Spinner.show(this.elems.$root);
            },
            complete: () => {
                app.pubsub.publish(app.EVENTS.UPDATE_CART, {isOpen: true});
                app.Spinner.hide(this.elems.$root);
            }
        });
    }

    removeFromCart(event) {
        let $current = $(event.currentTarget).parents(DEFAULTS.SELECTORS.ITEM);
        let id = $current.find(DEFAULTS.SELECTORS.ARTICLE).val();
        let data = $.extend({
            action: app.ACTIONS.DELETE_FROM_CART,
            id: id
        }, app.SERVICES.BASE);

        $.ajax({
            url: '/?' + $.param(data),
            method: 'GET',
            error: (jqXhr, textStatus, errorThrown) => {
                new AjaxError(...arguments);
            },
            beforeSend: () => {
                app.Spinner.show(this.elems.$root);
            },
            complete: () => {
                app.pubsub.publish(app.EVENTS.UPDATE_CART);
                app.Spinner.hide(this.elems.$root);
            }
        });
    }
}

export default Cart;