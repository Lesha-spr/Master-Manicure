import app from './../app.js';
import $ from 'jquery';

class Delivery {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        // Initialize logic
        // this.render(); Example
    }

    bindEvents() {
        this.elems.$root.on('click', this.openPopup.bind(this));
    }

    openPopup(event) {
        event.preventDefault();

        app.Popup.open('delivery');
    }
}

export default Delivery;