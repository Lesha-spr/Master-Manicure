import app from './app.js';

export default (() => {
    let elements = [...document.querySelectorAll('[data-module]')];

    elements.forEach(element => {
        let _modules = element.dataset.module;

        _modules.split(' ').forEach(Module => {
            if (!app.modules[Module]) {
                app.modules[Module] = [];
            }

            app.modules[Module].push(new app[Module](element));
        });
    });
});