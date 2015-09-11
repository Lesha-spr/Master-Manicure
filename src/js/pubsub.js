var $ = require('jquery');

class PubSub {
    constructor(options) {
        this.options = options || {};
        this.observers = {};
    }

    subscribe(event, handler) {
        if (!this.observers[event]) {
            this.observers[event] = $.Callbacks(this.options);
        }

        this.observers[event].add(handler);
    }

    publish(event) {
        if (this.observers[event]) {
            this.observers[event].fire.apply(event, Array.prototype.slice.call(arguments, 1));
        }
    }

    unsubscribe(event, handler) {
        if (this.observers[event]) {
            this.observers[event].remove(handler);
        }
    }
}

module.exports = PubSub;