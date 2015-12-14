import app from './../app.js';
import $ from 'jquery';
import slick from 'slick-carousel';

let DEFAULTS = {
    SELECTORS: {
        ITEM: '.carousel__item'
    },
    CLASSES: {
        LOADING: 'carousel_state_loading'
    },
    SLICK_OPTIONS: {
        dots: true,
        respondTo: 'slider',
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: app.templates['carousel-prev'](),
        nextArrow: app.templates['carousel-next']()
    }
};

class Carousel {
    constructor(element) {
        let $root = $(element);

        this.slickOptions = $.extend({}, DEFAULTS.SLICK_OPTIONS, $root.data('slickOptions') || {});

        this.elems = {
            $root: $root,
            $window: $(window)
        };

        app.Spinner.show(this.elems.$root);
        this.bindEvents();
    }

    initialize() {
        app.Spinner.hide(this.elems.$root);
        this.elems.$root.slick(this.slickOptions);

        this.elems.$root.removeClass(DEFAULTS.CLASSES.LOADING);
    }

    bindEvents() {
        this.elems.$window.on('load', this.initialize.bind(this));
    }


    destroy() {
        this.elems.$root.slick('unslick');
    }
}

export default Carousel;