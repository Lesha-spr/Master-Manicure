import app from './app.js';
import $ from 'jquery';

export default ($root, submodules) => {
    let elements = $root.find('[data-module]');

    elements.each((index, element) => {
        let _modules = element.getAttribute('data-module');

        _modules = _modules.split(' ');

        for (let Module of _modules) {
            if (!submodules[Module]) {
                submodules[Module] = new Map();
            }

            if (!submodules[Module].has(element)) {
                try {
                    // NOTE: prevent empty strings as Module name
                    if (Module) {
                        submodules[Module].set(element, new app[Module](element));
                    }
                } catch (error) {
                    let message = ['Attempt to initialize', Module, 'on', element, 'but there was an', error];

                    console.warn(...message);
                }
            }
        }
    });
};