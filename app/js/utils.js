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

    function ajaxRequest(data, beforeSendHandler, target) {
        const requestData = {
            method: 'POST',
            url: ajax.url,
            data: data
        }

        if (beforeSendHandler) {
            requestData.beforeSend = beforeSendHandler;
        }

        return jQuery.ajax(requestData);
    }

    window.utils = {
        createDOMElement: createDOMElement,
        ajaxRequest: ajaxRequest
    }
})();