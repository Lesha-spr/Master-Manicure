import Handlebars from 'handlebars';
import PubSub from './pubsub.js';

// Global objects
window.Handlebars = window.Handlebars || Handlebars;
window.MM = window.MM || {};

MM.modules = MM.modules || {};
MM.templates = MM.templates || {};
MM.pubsub = MM.pubsub || new PubSub();

export default MM;