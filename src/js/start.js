var $ = require('jquery');

module.exports = (app = {}, elements = []) => {
    elements = Array.prototype.slice.call(elements);

    elements.forEach(element => {
        let $component = $(element);
        let _modules = $component.data('module');

        _modules.split(' ').forEach(Module => {
            if (!app.modules[Module]) {
                app.modules[Module] = [];
            }

            app.modules[Module].push(new app[Module]($component));
        });
    });
};