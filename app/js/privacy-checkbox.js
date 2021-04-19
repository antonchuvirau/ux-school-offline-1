'use strict';

(function() {
    const inputs = document.querySelectorAll('.privacy-checkbox__input');
    
    if (inputs) {
        for (let input of inputs) {
            input.addEventListener('click', privacyInputHandler);
        }
    }

    function privacyInputHandler(evt) {
        const target = evt.target;
        const button = target.closest('.checkbox').previousElementSibling.querySelector('.btn');
        if (target.checked) {
            button.disabled = false;
            return;
        }
        button.disabled = true;
    }
})();