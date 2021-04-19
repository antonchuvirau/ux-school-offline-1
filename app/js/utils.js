'use strict';

(function() {
    
    function createDOMElement(tagName, className = '', text = '', params = []) {
        const element = document.createElement(tagName);

        if (className) {
            element.classList.add(className);
        }
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

    function removeClass(htmlCollection, className) {
        for (const item of htmlCollection) {
            item.classList.remove(className);
        }
    }

    function getRandId() {
        return Math.random().toString(RAND_BASE).substring(START_RAND_SUBSTR_INDEX, END_RAND_SUBSTR_INDEX) + Math.random().toString(RAND_BASE).substring(START_RAND_SUBSTR_INDEX, END_RAND_SUBSTR_INDEX);
    }

    window.utils = {
        createDOMElement: createDOMElement,
        ajaxRequest: ajaxRequest,
        removeClass: removeClass,
        getRandId: getRandId
    }
})();