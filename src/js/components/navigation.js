import $ from 'jquery';
import _ from 'lodash';
import app from './../app.js';

class Navigation {
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

export default Navigation;