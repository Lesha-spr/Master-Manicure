import $ from 'jquery';

class PubSub {
    constructor(options = {}) {
        this.options = options;
        this.observers = {};
    }

    subscribe(event, handler) {
        if (!this.observers[event]) {
            this.observers[event] = $.Callbacks(this.options);
        }

        this.observers[event].add(handler);
    }

    publish(event, ...args) {
        if (this.observers[event]) {
            this.observers[event].fire.apply(event, ...args);
        }
    }

    unsubscribe(event, handler) {
        if (this.observers[event]) {
            this.observers[event].remove(handler);
        }
    }
}

export default PubSub;