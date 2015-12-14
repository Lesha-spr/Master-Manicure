import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        ITEM: '.one-click',
        CLOSE: '.one-click__form-close'
    },
    CLASSES: {
        ACTIVE: 'one-click-show'
    }
};

class OneClickBuy {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $item: $root.find(DEFAULTS.SELECTORS.ITEM)
        };

        this.isRendered = false;

        this.initialize();
        this.bindEvents();
    }

    initialize() {

    }

    bindEvents() {
        this.elems.$root.on('click', this.toggle.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.ITEM, event => {
            event.stopPropagation();
        })
    }

    toggle(event) {
        event.stopPropagation();

        let data = {
            productId: $(event.currentTarget).data('product-id')
        };

        if (!this.isRendered && data) {
            this.isRendered = true;
            this.render(data);
        }

        this.elems.$root.toggleClass(DEFAULTS.CLASSES.ACTIVE);
    }

    render(data = {title: 'OneClickBuy'}) {
        let template = app.templates['one-click'](data);

        this.elems.$item.html(template);
    }
}

export default OneClickBuy;