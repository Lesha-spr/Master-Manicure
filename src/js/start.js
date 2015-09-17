import app from './app.js';

export default (() => {
    let elements = [...document.querySelectorAll('[data-module]')];

    elements.forEach(element => {
        let _modules = element.dataset.module;

        _modules.split(' ').forEach(Module => {
            if (!app.modules[Module]) {
                app.modules[Module] = new Map();
            }

            if (!app.modules[Module].has(element)) {
                try {
                    app.modules[Module].set(element, new app[Module](element));
                } catch (error) {
                    let message = ['Attempt to initialize', Module, 'on', element, 'but there was an', error];

                    console.warn(...message);
                }
            } else {
                let message = ['Attempt to initialize', Module, 'twice on', element];

                console.warn(...message);
            }
        });
    });
});