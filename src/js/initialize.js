// Such file can be used to create js bundle with needed components for page
import $ from 'jquery';
import app from './app.js';
import start from './start.js';

// Components
import Spinner from './components/spinner.js'; app.Spinner = new Spinner();
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

// Template
import Template from './components/template.js'; app.Template = Template;

app.start = start;

$(app.start);