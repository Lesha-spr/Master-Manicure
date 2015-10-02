import $ from 'jquery';
import _ from 'lodash';
import app from './../app.js';
import AjaxError from './../errors/base.js';

const DEFAULTS = {
    SELECTORS: {
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
            $root: $root
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.getProducts();
    }

    bindEvents() {

    }

    getProducts() {
        $.ajax({
            url: app.SERVICES.PRODUCTS,
            dataType: 'json',
            success: data => {
                this.render(data);
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

    render(data) {
        let template = app.templates['product-list'](data);
        this.elems.$root.html(template);

        this.elems.$root.find(DEFAULTS.SELECTORS.IMAGE).one('load', this.rotateItem.bind(this));
    }
}

export default ProductList;