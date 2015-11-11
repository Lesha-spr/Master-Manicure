import app from './../app.js';
import $ from 'jquery';
import magnificPopup from 'magnific-popup';

const DEFAULTS = {
    SELECTORS: {
        ITEM: '.block__item'
    },
    CLASSES: {
        ACTIVE_ITEM: 'block__item_state_active'
    }
};

class Popup {
    constructor() {

    }

    open(template, data = {}) {
        let html = app.templates[template](data);

        $.magnificPopup.open({
            items: {
                src: html
            },
            type: 'inline'
        });
    }

    close() {
        $.magnificPopup.instance.close();
    }
}

export default Popup;