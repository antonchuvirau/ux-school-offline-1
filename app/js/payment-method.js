'use strict';

(function() {
    // Load modules
    const paymentModule = window.payment.instance;
    const utilsModule = window.utils;

    class PaymentMethod {
        _paymentMethodIndex = 0;

        constructor(paymentMethodsContainer) {
            this._el = document.querySelector(paymentMethodsContainer);
            if (this._el) {
                this.renderPaymentMethods(this._el, PAYMENT_METHODS_DATA);
                this._el.addEventListener(`click`, this.onPaymentMethodsClickHandler.bind(this));
            }
        }

        onPaymentMethodsClickHandler(evt) {
            const target = evt.target;
            const paymentSections = document.querySelectorAll(`.payment-section`);

            if (target.matches(`input`)) {
                const paymentMethodIndex = +target.value;
                this.setPaymentMethodIndex(paymentMethodIndex);
                utilsModule.removeClass(paymentSections, 'payment-section_state-active');
                paymentSections[this._paymentMethodIndex].classList.add('payment-section_state-active');
                // Update prices
                paymentModule.updatePrices(this._paymentMethodIndex);
                paymentModule.changeInputPrice(this._paymentMethodIndex);
                jQuery('body, html').animate({
                    scrollTop: jQuery('#payment-anchor').offset().top
                }, 800);
            }
        }

        getPaymentMethodIndex() {
            return this._paymentMethodIndex;
        }

        setPaymentMethodIndex(value) {
            this._paymentMethodIndex = value;
        }

        renderPaymentMethods(container, data) {
            const paymentMethodsFragment = document.createDocumentFragment();
            
            for (const paymentMethodData of data) {
                const paymentMethodElement = this.createPaymentMethodElement(paymentMethodData);
                paymentMethodsFragment.appendChild(paymentMethodElement);
            }
            container.appendChild(paymentMethodsFragment);
        }

        createPaymentMethodElement(data) {
            const paymentMethodTemplate = document.querySelector(`#payment-method`).content;
            const duplicatedPaymentMethodElement = paymentMethodTemplate.cloneNode(true);

            duplicatedPaymentMethodElement.querySelector(`input`).value = data.id;
            duplicatedPaymentMethodElement.querySelector(`.payment-item__name`).textContent = data.title;
            data.checked ? duplicatedPaymentMethodElement.querySelector(`input`).checked = true : null;

            return duplicatedPaymentMethodElement;
        }

        changePaymentMethod(paymentMethodIndex) {
            this._el.querySelector(`input[name="payment"][value="${paymentMethodIndex}"]`).checked = true;
        }
    }

    const paymentMethodInstance = new PaymentMethod(`.payment-methods`);
    window.paymentMethod = {
        instance: paymentMethodInstance
    }
})();