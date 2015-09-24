// Such file can be used to create js bundle with needed components for page
import $ from 'jquery';
import app from './app.js';
import start from './start.js';

// Components
import Navigation from './components/navigation.js'; app.Navigation = Navigation;
import MiniCart from './components/mini-cart.js'; app.MiniCart = MiniCart;
import Filters from './components/filters.js'; app.Filters = Filters;
import Carousel from './components/carousel.js'; app.Carousel = Carousel;
import Sorting from './components/sorting.js'; app.Sorting = Sorting;

$(start);