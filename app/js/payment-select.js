'use strict';

(function() {
    class PaymentSelect {
        _courseData = {
            title: '',
            fullPrice: 0,
            salePrice: 0
        }

        constructor(rootElement) {
            this._el = document.querySelector(rootElement);
            if (this._el) {
                this._type = this._el.dataset.type;
                this._el.addEventListener('click', (evt) => {
                    const target = evt.target;
                    const items = document.querySelectorAll('.ums-select__list-item');

                    if (target.matches('button')) {
                        target.classList.toggle('ums-select__btn_state-active');
                        target.closest('.form__select').classList.toggle('form__select_state-active');
                        target.nextElementSibling.classList.toggle('ums-select__list_visibility-open');
                    }
                    if (target.matches('li')) {
                        this.fillCourseData(target);
                        window.utils.removeClass(items, 'ums-select__list-item_state-active');
                        target.classList.add('ums-select__list-item_state-active');
                        if (target.textContent === 'Оплата второго этапа действующего курса') {
                            window.paymentMethod.instance.setMethodIndex(0);
                            const paymentForms = document.querySelectorAll('.payment-section');
                            window.utils.removeClass(paymentForms, 'payment-section_state-active');
                            paymentForms[0].classList.add('payment-section_state-active');
                            jQuery('.payment-item').css('display', 'none');
                            jQuery('.payment-item:nth-child(1)').css('display', 'block');
                            jQuery('.payment-item:nth-child(1) input').prop('checked', true);
                            jQuery('.webpay-form__sale-checkbox').css('display', 'none');
                        } else {
                            jQuery('.payment-item').css('display', 'block');
                            jQuery('.webpay-form__sale-checkbox').css('display', 'inline-block');
                        }
    
                        if (this.getPaymentType() === 'payment') {
                            window.payment.totalPrice = this._courseData.salePrice;
                            const saleInputs = document.querySelectorAll('input[name="sale"]');
                            for (let input of saleInputs) {
                                input.checked = false;
                            }
                        } else {
                            window.payment.totalPrice = this._courseData.fullPrice;
                        }
                        target.closest('.form__select').classList.toggle('form__select_state-active');
                        target.closest('.ums-select__list').previousElementSibling.dataset.price = this._courseData.fullPrice;
                        target.closest('.ums-select__list').previousElementSibling.dataset.salePrice = this._courseData.salePrice;
                        target.closest('.ums-select__list').previousElementSibling.textContent = this._courseData.title;
                        target.closest('.ums-select__list').previousElementSibling.classList.remove('ums-select__btn_state-active');
                        target.closest('.ums-select__list').classList.remove('ums-select__list_visibility-open');
                        window.payment.current = this._courseData.title;
                        window.payment.price = this._courseData.fullPrice;
                        window.payment.salePrice = this._courseData.salePrice;
                        window.payment.changePrice(window.paymentMethod.instance.getMethodIndex());
                    }
                });
            }
        }
        getPaymentType() {
            return this._type;
        }
        getCourseData() {
            return this._courseData;
        }
        fillCourseData(element) {
            this._courseData.title = element.textContent;
            this._courseData.fullPrice = +element.dataset.price;
            this._courseData.salePrice = +element.dataset.salePrice;
        }
    }
    const instance = new PaymentSelect('.ums-select');

    window.paymentSelect = {
        instance
    }
})();