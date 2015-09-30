import $ from 'jquery';
import _ from 'lodash';
import app from './../app.js';
import AjaxError from './../errors/base.js';

const DEFAULTS = {
    SELECTORS: {
        IMG_WRAPPER: '.product-list__item__table',
        IMG: '.product-list__item__img'
    }
};

class ProductList {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $window: $(window)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.getProducts();
    }

    bindEvents() {
        this.elems.$window.on('resize', _.throttle(this.equalizeHeight.bind(this), 200));
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

    equalizeHeight() {
        this.elems.$imagesWrapper = this.elems.$imagesWrapper || this.elems.$root.find(DEFAULTS.SELECTORS.IMG_WRAPPER);
        let height;

        this.elems.$imagesWrapper.css({
            height: 'auto'
        });

        height = Math.max(...this.elems.$imagesWrapper.map((index, element) => {
            return $(element).height();
        }).get());

        this.elems.$imagesWrapper.height(height);
    }

    handleImages() {
        this.elems.$images = this.elems.$images || this.elems.$root.find(DEFAULTS.SELECTORS.IMG);
        let loaded = 0;

        this.elems.$images.each((index, element) => {
            $(element).on('load', () => {
                if (++loaded === this.elems.$images.length) {
                    this.equalizeHeight();
                }
            });
        });
    }

    render(data) {
        let template = app.templates['product-list'](data);
        this.elems.$root.html(template);

        this.elems.$images = null;
        this.elems.$imagesWrapper = null;

        this.handleImages();
    }
}

export default ProductList;