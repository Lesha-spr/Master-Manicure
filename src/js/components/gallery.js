// Gallery
import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        POP: '.pop-gallery',
        GALLERY: '.product__gallery'
    },
    SLICK_OPTIONS: {}
};

class Gallery {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $gallery: $root.find(DEFAULTS.SELECTORS.GALLERY)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {
        this.carousel = new app.Carousel(this.elems.$gallery.get(0));
    }

    bindEvents() {
        this.elems.$root.on('click', DEFAULTS.SELECTORS.POP, this.openPopup.bind(this));
    }

    openPopup(event) {
        event.preventDefault();

        app.Popup.open('#gallery');
    }
}

export default Gallery;