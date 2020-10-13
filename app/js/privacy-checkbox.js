export const privacyCheckbox = function() {
    const inputs = document.querySelectorAll('.privacy-checkbox__input');
    
    if (inputs) {
        for (let input of inputs) {
            input.addEventListener('click', privacyInputHandler);
        }
    }

    function privacyInputHandler(event) {
        const target = event.target;
        const button = target.closest('.checkbox').previousElementSibling.querySelector('button');
        if (target.checked) {
            button.disabled = false
        } else {
            button.disabled = true;
        }
    }
}