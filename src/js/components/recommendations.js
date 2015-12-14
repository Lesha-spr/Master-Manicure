import $ from 'jquery';
import _ from 'lodash';
import app from './../app.js';
import AjaxError from './../errors/base.js';

const DEFAULTS = {
    SELECTORS: {
        LIST: '.product-list',
        ITEM: '.product-list__item'
    }
};

class Recommendations {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $list: $root.find(DEFAULTS.SELECTORS.LIST)
        };

        this.initialize();
    }

    initialize() {
        this.getProducts();
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
            },
            beforeSend: () => {
                app.Spinner.show(this.elems.$root);
            },
            complete: () => {
                app.Spinner.hide(this.elems.$root);
            }
        });
    }

    render(data) {
        let template = app.templates['product-list'](data);

        this.elems.$list.html(template);
        app.submodules(this.elems.$list);
    }
}

export default Recommendations;