(function() {
    const button = document.querySelector('.calculation__btn');
    const form = document.querySelector('#wpcf7-f1805-o1');
    const processMessage = 'Обрабатываем данные...';
    const transferMessage = 'Перенаправляем на оплату...';
    if (button) {
        console.log(button);
        const defaultText = button.textContent;
        requiredInputsCollection = button.closest('.form').querySelectorAll('input:required');
        button.addEventListener('click', function () {
            button.textContent = 'Отправляем...';
            button.classList.add('btn_is-loading');
            for (let input of requiredInputsCollection) {
                let inputType = input.getAttribute('type');
                if (inputType === 'tel') {
                    //Get input value and remove all non-digit symbols
                    let inputValue = input.value.replace(/\D/g, '');
                    if (input.value == '' || inputValue.length < 9) {
                        addErrorClass(input, input.closest('.form__input'));
                        // validation = false;
                        telInputValidation = false;
                    } else {
                        removeErrorClass(input, input.closest('.form__input'));
                        // validation = true;
                        telInputValidation = true;
                    }
                }
                if (inputType === 'email') {
                    if (input.value == '' || (input.value.indexOf('@') == -1)) {
                        addErrorClass(input, input.closest('.form__input'));
                        // validation = false;
                        emailInputValidation = false;
                    } else {
                        removeErrorClass(input, input.closest('.form__input'));
                        // validation = true;
                        emailInputValidation = true;
                    }
                }
                if (inputType === 'text') {
                    if (input.value == '') {
                        addErrorClass(input, input.parentElement);
                        // validation = false;
                        textInputValidation = false;
                    } else {
                        removeErrorClass(input, input.parentElement);
                        // validation = true;
                        textInputValidation = true;
                    }
                }
            }
            //Get select data
            let deliveryValue = +deliveryElement.value;
            if (deliveryValue === 0) {
                addErrorClass(deliveryElement, deliveryElement.parentElement);
                selectValidation = false;
                // validation = false
            } else if (deliveryValue === 1) {
                deliveryElement.classList.remove('wpcf7-not-valid');
                deliveryElement.parentElement.querySelector('.form__error-label').classList.remove('form__error-label_active');
                let deliveryAddressElement = deliveryElement.parentElement.nextElementSibling.querySelector('input');
                let deliveryAddress = deliveryAddressElement.value;
                if (deliveryAddress === '') {
                    addErrorClass(deliveryAddressElement, deliveryAddressElement.parentElement);
                    // validation = false;
                    selectValidation = false;
                } else {
                    removeErrorClass(deliveryAddressElement, deliveryAddressElement.parentElement);
                    // validation = true;
                    selectValidation = true;
                }
            } else {
                removeErrorClass(deliveryElement, deliveryElement.parentElement);
                // validation = true;
                selectValidation = true;
            }
            //Send form
            if (telInputValidation && emailInputValidation && textInputValidation && selectValidation) {
                //Create payment object
                certificatePaymentObject = {
                    action: 'payment_alfa',
                    orderAmount: +jQuery('input[name="total"]').val() * 100,
                    orderTitle: jQuery('.ums-select__btn').text(),
                    customerName: jQuery('input[name="name"]').val(),
                    customerSaleType: 'Без скидки',
                    customerSaleValue: 0
                }
                if (document.querySelector('.promocode-input').classList.contains('promocode-input_state-success')) {
                    certificatePaymentObject.customerSaleType = 'Промокод';
                    certificatePaymentObject.customerSaleValue = 10;
                }
                //Fill hidden fields with data
                jQuery(certificateForm).find('input[name="ums-course"]').val(jQuery('.ums-select__btn').text());
                jQuery(certificateForm).find('input[name="ums-price"]').val(jQuery('input[name="total"]').val());
                jQuery(certificateForm).find('input[name="ums-name"]').val(jQuery('input[name="name"]').val());
                jQuery(certificateForm).find('input[name="ums-email"]').val(jQuery('input[name="email"]').val());
                jQuery(certificateForm).find('input[name="ums-tel"]').val(jQuery('input[name="tel"]').val());
                jQuery(certificateForm).find('input[name="ums-delivery"]').val(jQuery('select[name="delivery"] option:selected').text() + ', ' + jQuery('input[name="delivery-address"]').val());
                jQuery(certificateForm).find('form').trigger('submit');
            } else {
                setTimeout(function () {
                    button.classList.remove('btn_is-loading');
                    button.textContent = defaultText;
                }, 300);
            }
        });

        form.addEventListener('wpcf7mailsent', () => {
            button.textContent = processMessage;
            jQuery.ajax({
                url: ajax.url,
                method: 'POST',
                data: certificatePaymentObject,
                success: function (resp) {
                    button.textContent = transferMessage;
                    setTimeout(function () {
                        document.location.replace(JSON.parse(resp).formUrl);
                    }, 300);
                }
            });
        });
        form.addEventListener('wpcf7invalid', () => {
            button.classList.remove('btn_is-loading');
            button.textContent = defaultText;
        });
    }
})();