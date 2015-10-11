// Template
import app from './../app.js';
import $ from 'jquery';

let DEFAULTS = {
    SELECTORS: {
        ITEM: '.carousel__item',
        IMAGE: '.carousel__image'
    },
    CLASSES: {
        LOADING: 'carousel_state_loading'
    },
    SLICK_OPTIONS: {
        dots: true,
        respondTo: 'slider',
        prevArrow: app.templates['carousel-prev'](),
        nextArrow: app.templates['carousel-next']()
    }
};

class MainCarousel {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $item: $root.find(DEFAULTS.SELECTORS.ITEM)
        };

        this.carousel = null;

        this.initialize();
    }

    initialize() {
        for (let item of Array.from(this.elems.$item)) {
            let $item = $(item);
            let background = `url('${$item.find(DEFAULTS.SELECTORS.IMAGE).attr('src')}')`;

            $item.css({
                backgroundImage: background
            });
        }

        this.carousel = new app.Carousel(this.elems.$root.get(0));
    }
}

export default MainCarousel;