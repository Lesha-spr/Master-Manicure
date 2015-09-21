import $ from 'jquery';
import app from './../app.js';

const DEFAULTS = {
    ENTRIES: 0
};

class MiniCart {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.render({
            entries: DEFAULTS.ENTRIES
        });
    }

    bindEvents() {

    }

    render(data) {
        var template = app.templates['mini-cart'](data);

        this.elems.$root.html(template);
    }
}

app.MiniCart = MiniCart;

export default MiniCart;