export const EVENTS  = {
    UPDATE_CART: 'updateCart'
};

export const SERVICES = {
    BASE: {
        module: 'shop',
        media: 'ajax'
    },
    REVIEWS: {
        module: 'comments',
        media: 'ajax'
    },
    CART: '/Master-Manicure/fakebackend/cart.json',
    FILTERS: '/Master-Manicure/fakebackend/filters/default.json',
    PRODUCTS: '/Master-Manicure/fakebackend/products.json',
    ARTICLES: '/Master-Manicure/fakebackend/articles.json',
    PAGINATION: '/Master-Manicure/fakebackend/pagination.json'
};

export const ACTIONS = {
    ADD_TO_CART: 'ajax_basket_add',
    UPDATE_CART: 'ajax_basket_update',
    DELETE_FROM_CART: 'ajax_basket_delete',
    CHANGE_CART_COUNT: 'ajax_basket_change',
    GET_REVIEWS: 'load_comments',
    POST_REVIEW: 'save_comment'
};

export default EVENTS;