import app from './../app.js';
import $ from 'jquery';

const DEFAULTS = {
    SELECTORS: {
        ITEM: '.reviews__list-item',
        REPLY: '.review__reply',
        REPLIES: '.reviews__replies',
        FORM_HOLDER: '.review__reply-form',
        FORM: '.reply-form',
        CANCEL: '.reply-form__cancel'
    }
};

class ReviewItem {
    constructor(element) {
        let $root = $(element);

        this.elems = {
            $root: $root,
            $reply: $root.find(DEFAULTS.SELECTORS.REPLY),
            $replies: $root.find(DEFAULTS.SELECTORS.REPLIES),
            $formHolder: $root.find(DEFAULTS.SELECTORS.FORM_HOLDER)
        };

        this.initialize();
        this.bindEvents();
    }

    initialize() {

    }

    bindEvents() {
        this.elems.$root.on('click', DEFAULTS.SELECTORS.REPLY, this.render.bind(this));
        this.elems.$root.on('click', DEFAULTS.SELECTORS.CANCEL, this.cancel.bind(this));
        this.elems.$root.on('submit', DEFAULTS.SELECTORS.FORM, this.onSubmit.bind(this));
    }

    cancel(event) {
        if (event) {
            event.preventDefault();
        }

        this.elems.$reply.show();
        this.elems.$formHolder.html('');
    }

    onSubmit(event) {
        event.preventDefault();

        let data = $.extend({
            action: app.ACTIONS.POST_REVIEW
        }, app.SERVICES.REVIEWS);

        let formData = $.deparam($(event.target).serialize());
        formData.cid = 1;
        formData.mid = 1;

        event.stopPropagation();
        event.preventDefault();

        $.ajax({
            url: '/?' + $.param(data) + '&data=' + JSON.stringify(formData),
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: (response) => {
                response = JSON.parse(response);

                if (response.status && response.status === 'success') {
                    this.renderReply(response.data);
                }
            },
            beforeSend: () => {
                app.Spinner.show(this.elems.$root);
            },
            complete: () => {
                app.Spinner.hide(this.elems.$root);
            }
        });
    }

    renderReply(data) {
        let template = app.templates['reviews']([data]);

        this.elems.$root.after(template);
        this.cancel();
    }

    render() {
        let data = {};

        data.id = this.elems.$reply.data('id');
        data.mark = this.elems.$reply.data('mark') || 5;

        this.elems.$reply.hide();

        let template = app.templates['review-form'](data);
        this.elems.$formHolder.html(template);
    }
}

export default ReviewItem;