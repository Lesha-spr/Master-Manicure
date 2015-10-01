import $ from 'jquery';
import _ from 'lodash';
import app from './../app.js';
import AjaxError from './../errors/base.js';

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

    render(data) {
        let template = app.templates['product-list'](data);
        this.elems.$root.html(template);
    }
}

export default ProductList;