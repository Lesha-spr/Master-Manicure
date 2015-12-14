import Handlebars from 'handlebars';
import PubSub from './pubsub.js';
import {EVENTS} from './defaults.js';
import {SERVICES} from './defaults.js'
import HandlebarsIntl from 'handlebars-intl';
import paginate from 'handlebars-paginate';

// Global objects
window.Handlebars = window.Handlebars || Handlebars;
window.MM = window.MM || {};

require('./helpers/bbq.js')(require('jquery'), window);

Handlebars.registerHelper('paginate', paginate);
HandlebarsIntl.registerWith(Handlebars);

MM.templates = MM.templates || require('./templates.js');
MM.partials = MM.partials || require('./partials.js');
MM.modules = MM.modules || new Set();
MM.pubsub = MM.pubsub || new PubSub();
MM.EVENTS = EVENTS;
MM.SERVICES = SERVICES;

export default MM;