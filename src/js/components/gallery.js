// Gallery
import app from './../app.js';
import $ from 'jquery';
import slick from 'slick-carousel';

const DEFAULTS = {
    SELECTORS: {
        POP: '.pop-gallery',
        GALLERY: '.product__gallery',
        GALLERY_NAV: '.product__gallery-nav'
    },
    SLICK_OPTIONS: {}
};

class Gallery {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {

    }

    bindEvents() {
        this.elems.$root.on('click', DEFAULTS.SELECTORS.POP, this.openPopup.bind(this));
    }

    openPopup(event) {
        var _this = this;
        event.preventDefault();

        app.Popup.open('#gallery', {
            open: function() {
                var gallery = '.modal_gallery .product__gallery';
                var galleryNav = '.modal_gallery .product__gallery-nav';

                _this.carousel = $(gallery).slick({
                    prevArrow: app.templates['carousel-prev'](),
                    nextArrow: app.templates['carousel-next'](),
                    asNavFor: galleryNav
                });

                _this.carouselNav = $(galleryNav).slick({
                    arrows: false,
                    vertical: true,
                    slidesToShow: 3,
                    centerMode: true,
                    centerPadding: 0,
                    slidesToScroll: 1,
                    asNavFor: gallery,
                    focusOnSelect: true
                });

                app.submodules(this.container);
            },

            close: function() {
                _this.carousel.slick('unslick');
                _this.carouselNav.slick('unslick');
            }
        });
    }
}

export default Gallery;