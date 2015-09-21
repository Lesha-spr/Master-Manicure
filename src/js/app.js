import polyfill from 'babelify/polyfill';
import Handlebars from 'handlebars';
import PubSub from './pubsub.js';

// Global objects
window.Handlebars = window.Handlebars || Handlebars;
window.MM = window.MM || {};

MM.templates = MM.templates || require('./templates.js');
MM.modules = MM.modules || new Set();
MM.pubsub = MM.pubsub || new PubSub();

export default MM;