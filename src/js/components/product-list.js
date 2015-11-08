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

        this.page = 1;
        this.isLoading = false;
        this.shouldAppend = false;
        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.getProducts();
    }

    bindEvents() {
        this.elems.$window.on('hashchange', this.getProducts.bind(this));
        this.elems.$window.on('scroll', _.throttle(this.lazyLoad.bind(this), 200));
    }

    getProducts() {
        let data = $.bbq.getState();
        let shouldAppend = this.shouldAppend === true;

        $.ajax({
            url: app.SERVICES.PRODUCTS,
            dataType: 'json',
            data: data,
            success: data => {
                this.render(data, shouldAppend);
            },
            error: (jqXhr, textStatus, errorThrown) => {
                new AjaxError(...arguments);
            },
            beforeSend: () => {
                this.shouldAppend = false;
                this.isLoading = true;
                app.Spinner.show(this.elems.$root);
            },
            complete: () => {
                this.isLoading = false;
                app.Spinner.hide(this.elems.$root);
            }
        });
    }

    lazyLoad() {
        let page = $.bbq.getState().page || 1;
        let scrollTop = this.elems.$window.scrollTop() + this.elems.$window.height();
        let bottomEdge = this.elems.$list.find(DEFAULTS.SELECTORS.ITEM).last().offset().top;

        this.shouldAppend = true;

        if (scrollTop >= bottomEdge && !this.isLoading) {
            $.bbq.pushState({
                page: ++page
            });
        }
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