'use strict';

(function() {
    function createDOMElement(tagName, className, text = '', params = []) {
        const element = document.createElement(tagName);

        element.classList.add(className);
        if (text) {
            element.textContent = text;
        }
        if (params.length) {
            for (const param of params) {
                element.setAttribute(param.name, param.value);
            }
        }
        return element;
    }

    window.utils = {
        createDOMElement
    }
})();