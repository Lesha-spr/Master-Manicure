import app from './../app.js';
import $ from 'jquery';
import _ from 'lodash';

const DEFAULTS = {
    CLASSES: {
        SHOWN: 'top-button_state_shown'
    },
    PADDING: 400,
    THROTTLE: 200,
    ANIMATION_SPEED: 500
};

class Template {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $window: $(window),
            $html: $('html, body')
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.toggleShow();
    }

    bindEvents() {
        this.elems.$root.on('click', this.goTop.bind(this));
        this.elems.$window.on('scroll', _.throttle(this.toggleShow.bind(this), DEFAULTS.THROTTLE));
    }

    goTop(event) {
        event.preventDefault();

        this.elems.$html.animate({
            scrollTop: 0
        }, DEFAULTS.ANIMATION_SPEED);
    }

    toggleShow() {
        this.elems.$root.toggleClass(DEFAULTS.CLASSES.SHOWN, this.elems.$window.scrollTop() > DEFAULTS.PADDING);
    }
}

export default Template;