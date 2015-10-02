import $ from 'jquery';
import _ from 'lodash';
import app from './../app.js';
import AjaxError from './../errors/base.js';

const DEFAULTS = {
    SELECTORS: {
        LIST: '.product-list',
        ITEM: '.product-list__item',
        IMAGE: '.product-list__item__img'
    },
    CLASSES: {
        ITEM_LOADING: 'product-list__item_state_loading'
    }
};

class ProductList {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $list: $root.find(DEFAULTS.SELECTORS.LIST),
            $window: $(window)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.category = $.bbq.getState().category;
        this.getProducts();
    }

    bindEvents() {
        this.elems.$window.on('hashchange', this.getProducts.bind(this));
    }

    getProducts() {
        let data = $.bbq.getState();
        let shouldAppend = this.category === data.category;

        this.category = data.category;

        $.ajax({
            url: app.SERVICES.PRODUCTS,
            dataType: 'json',
            data: data,
            success: data => {
                this.render(data, shouldAppend);
            },
            error: (jqXhr, textStatus, errorThrown) => {
                new AjaxError(...arguments);
            }
        });
    }

    rotateItem(event) {
        let $current = $(event.currentTarget);

        $current.parents(DEFAULTS.SELECTORS.ITEM).removeClass(DEFAULTS.CLASSES.ITEM_LOADING);
    }

    render(data, shouldAppend) {
        let template = app.templates['product-list'](data);

        this.elems.$list[shouldAppend ? 'append' : 'html'](template);

        this.elems.$root.find(DEFAULTS.SELECTORS.IMAGE).one('load', this.rotateItem.bind(this));
    }
}

export default ProductList;