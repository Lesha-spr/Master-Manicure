import app from './app.js';
import $ from 'jquery';

export default ($root) => {
    let elements = $root.find('[data-module]');

    app.modules.submodules = app.modules.submodules || {};

    elements.each((index, element) => {
        let _modules = element.getAttribute('data-module');

        _modules = _modules.split(' ');

        for (let Module of _modules) {
            if (!app.modules.submodules[Module]) {
                app.modules.submodules[Module] = new Map();
            }

            if (!$.data(element, Module)) {
                try {
                    // NOTE: prevent empty strings as Module name
                    if (Module) {
                        app.modules.submodules[Module].set(element, new app[Module](element));
                        $.data(element, Module, true);
                    }
                } catch (error) {
                    let message = ['Attempt to initialize', Module, 'on', element, 'but there was an', error];

                    console.warn(...message);
                }
            }
        }
    });
};