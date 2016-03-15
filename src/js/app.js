require("babel-polyfill");

import Handlebars from 'handlebars';
import PubSub from './pubsub.js';
import {EVENTS, SERVICES, ACTIONS} from './defaults.js';
import HandlebarsIntl from 'handlebars-intl';
import paginate from 'handlebars-paginate';
import math from './helpers/math.js';

// Global objects
window.Handlebars = window.Handlebars || Handlebars;
window.MM = window.MM || {};

require('./helpers/bbq.js')(require('jquery'), window);

Handlebars.registerHelper('paginate', paginate);
Handlebars.registerHelper('math', math);

HandlebarsIntl.registerWith(Handlebars);

MM.templates = MM.templates || require('./templates.js');
MM.partials = MM.partials || require('./partials.js');
MM.modules = MM.modules || new Set();
MM.pubsub = MM.pubsub || new PubSub();
MM.EVENTS = EVENTS;
MM.SERVICES = SERVICES;
MM.ACTIONS = ACTIONS;

export default MM;