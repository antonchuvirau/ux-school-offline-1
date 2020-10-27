'use strict';

(function() {
    class PaymentSelect {
        _paymentData = {
            courseName: null,
            courseFullPrice: null,
            courseSalePrice: null
        }

        constructor(rootElement) {
            this._el = document.querySelector(rootElement);
            if (this._el) {
                this._type = this._el.dataset.type;
                this._el.addEventListener('click', (evt) => {
                    const target = evt.target;

                    if (target.matches('li') && !target.classList.contains('.ums-select__list-item_state-active')) {
                        this._paymentData.courseName = target.textContent;
                        this._paymentData.courseFullPrice = +target.dataset.price;
                        this._paymentData.courseSalePrice = +target.dataset.salePrice;
                    }
                });
            }
        }
        getPaymentType() {
            return this._type;
        }
        getPaymentData() {
            return this._paymentData;
        }
    }
    const instance = new PaymentSelect('.ums-select');

    window.paymentSelect = {
        instance
    }
})();