'use strict';

(function() {
    const paymentMethodInstance = window.paymentMethod.instance;
    const utils = window.utils;
    
    class PaymentSelect {

        _courseData = {
            title: '',
            fullPrice: 0,
            salePrice: 0
        }

        constructor(paymentSelectContainer) {
            this._el = document.querySelector(paymentSelectContainer);

            if (this._el) {
                this._type = this._el.dataset.type;
                this._el.addEventListener('click', (evt) => {
                    const target = evt.target;
                    const courseListElements = document.querySelectorAll('.ums-select__list-item');

                    if (target.matches('button')) {
                        this._el.querySelector('.ums-select__btn').classList.toggle('ums-select__btn_state-active');
                        this._el.closest('.form__select').classList.toggle('form__select_state-active')
                        this._el.querySelector('.ums-select__list').classList.toggle('ums-select__list_visibility-open');
                    }
                    if (target.matches('li')) {
                        const paymentLevel = +target.dataset.paymentLevel;
                        const paymentButton = this._el.querySelector('.ums-select__btn');
                        this.fillCourseData(target);
                        utils.removeClass(courseListElements, 'ums-select__list-item_state-active');
                        this._el.querySelector('.ums-select__list-item').classList.add('ums-select__list-item_state-active');

                        if (paymentLevel === 2) {
                            const paymentForms = document.querySelectorAll('.payment-section');
                            paymentMethodInstance.setMethodIndex(0);
                            utils.removeClass(paymentForms, 'payment-section_state-active');
                            paymentForms[0].classList.add('payment-section_state-active');
                            paymentMethodInstance.setCheckedInput(0);
                            //Переписать JQuery
                            jQuery('.payment-item:not(:nth-child(1))').hide();
                            jQuery('.webpay-form__sale-checkbox').hide();
                            jQuery('.toggle-checkbox').hide();
                        } else {
                            //Переписать JQuery
                            jQuery('.payment-item:not(:nth-child(1))').show();
                            jQuery('.webpay-form__sale-checkbox').show();
                            jQuery('.toggle-checkbox').show();
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

                        paymentButton.dataset.price = this._courseData.fullPrice;
                        paymentButton.dataset.salePrice = this._courseData.salePrice;
                        paymentButton.textContent = this._courseData.title;
                        paymentButton.classList.remove('ums-select__btn_state-active');
                        this._el.closest('.form__select').classList.toggle('form__select_state-active')
                        this._el.querySelector('.ums-select__list').classList.remove('ums-select__list_visibility-open');

                        window.payment.current = this._courseData.title;
                        window.payment.price = this._courseData.fullPrice;
                        window.payment.salePrice = this._courseData.salePrice;
                        window.payment.changePrice(paymentMethodInstance.getMethodIndex());
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

        fillCourseData(courseListElement) {
            this._courseData.title = courseListElement.textContent;
            this._courseData.fullPrice = +courseListElement.dataset.price;
            this._courseData.salePrice = +courseListElement.dataset.salePrice;
        }
    }

    const paymentSelect = new PaymentSelect('.ums-select');

    window.paymentSelect = {
        instance: paymentSelect
    }
})();