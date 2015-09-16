import $ from 'jquery';
import Handlebars from 'handlebars';
import PubSub from './pubsub.js';
import start from './start.js';

// Global objects
window.Handlebars = Handlebars;
window.MM = {};

MM.modules = MM.modules || {};
MM.templates = MM.templates || {};
MM.pubsub = new PubSub();

export default MM;

// Components
import Navigation from './components/navigation.js'; MM.Navigation = Navigation;

start();