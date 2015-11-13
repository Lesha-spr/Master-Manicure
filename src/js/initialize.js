// Such file can be used to create js bundle with needed components for page
import $ from 'jquery';
import app from './app.js';
import start from './start.js';
import submodules from './submodules.js';

// Components
import Spinner from './components/spinner.js'; app.Spinner = new Spinner();
import Popup from './components/popup.js'; app.Popup = new Popup();
import Navigation from './components/navigation.js'; app.Navigation = Navigation;
import MiniCart from './components/mini-cart.js'; app.MiniCart = MiniCart;
import Filters from './components/filters.js'; app.Filters = Filters;
import Carousel from './components/carousel.js'; app.Carousel = Carousel;
import MainCarousel from './components/main-carousel.js'; app.MainCarousel = MainCarousel;
import Sorting from './components/sorting.js'; app.Sorting = Sorting;
import ProductList from './components/product-list.js'; app.ProductList = ProductList;
import Reviews from './components/reviews.js'; app.Reviews = Reviews;
import ReviewItem from './components/review-item.js'; app.ReviewItem = ReviewItem;
import Certificates from './components/certificates.js'; app.Certificates = Certificates;
import Articles from './components/articles.js'; app.Articles = Articles;
import Pagination from './components/pagination.js'; app.Pagination = Pagination;
import Cart from './components/cart.js'; app.Cart = Cart;
import AddToCart from './components/add-to-cart.js'; app.AddToCart = AddToCart;
import Checkout from './components/checkout.js'; app.Checkout = Checkout;
import Recommendations from './components/recommendations.js'; app.Recommendations = Recommendations;
import Delivery from './components/delivery.js'; app.Delivery = Delivery;
import ProductMenu from './components/product-menu.js'; app.ProductMenu = ProductMenu;

// Template
import Template from './components/template.js'; app.Template = Template;

app.submodules = submodules;
app.start = start;

$(app.start);