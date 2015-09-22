import $ from 'jquery';
import querystring from 'querystring';

let $window = $(window);

export default {
    getState: (search = window.location.search) => {
        let query = search.substring(1);

        return querystring.parse(query);
    },

    pushState: (state) => {
        history.pushState({}, '', '?' + $.param(state));

        $window.trigger('statechange', state);
    }
}