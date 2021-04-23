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
        // return Math.random().toString(RAND_BASE).substring(START_RAND_SUBSTR_INDEX, END_RAND_SUBSTR_INDEX) + Math.random().toString(RAND_BASE).substring(START_RAND_SUBSTR_INDEX, END_RAND_SUBSTR_INDEX);
        return Math.floor(100000 + Math.random() * 900000);
    }

    function resetForm(formElement) {
        const formInputCollection = formElement.querySelectorAll(`input:not(input[type="radio"])`);
        for (const formInput of formInputCollection) {
            const formInputWrapper = formInput.closest(`.form__input`);
            formInput.value = ``;
            if (formInputWrapper) {
                const formInputLabel = formInputWrapper.querySelector(`.form__label`);
                formInputWrapper.classList.remove(`form__input_filled`);
                if (formInputLabel) {
                    formInputLabel.classList.remove(`form__label_active`);
                }
            }
        }
    }

    window.utils = {
        createDOMElement: createDOMElement,
        ajaxRequest: ajaxRequest,
        removeClass: removeClass,
        getRandId: getRandId,
        resetForm: resetForm
    }
})();