import $ from 'jquery';
import app from './../app.js';

class Sorting {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $window: $(window),
            $body: $(document.body)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {

    }

    bindEvents() {

    }
}

export default Sorting;