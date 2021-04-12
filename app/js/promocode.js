'use strict';

(function() {
    const paymentSelect = window.paymentSelect.instance;
    const paymentMethod = window.paymentMethod.instance;
    const paymentInstance = window.payment.instance;

    class Promocode {

        _processMessage = 'Проверяем...';
        _promocodeRequestSettings = {
            action: 'promocode'
        }
        _promocodeClasses = {
            active: 'promocode-input_state-active',
            progress: 'promocode-input_state-progress',
            success: 'promocode-input_state-success',
            error: 'promocode-input_state-error'
        }

        constructor(promocodeContainer) {
            this._el = document.querySelector(promocodeContainer);

            if (this._el) {
                this._el.addEventListener('click', evt => {
                    const target = evt.target;
                    const paymentType = target.closest(`.promocode`).querySelector(`input[name="promocode"]`).dataset.payment;

                    if (target.matches('input[name="promocode-toggle"]')) {
                        const promocodeInputElement = this._el.querySelector('.promocode-input');
                        target.closest(`.promocode`).querySelector(`input[name="promocode"]`).value = '';
                        promocodeInputElement.classList.remove(this._promocodeClasses.success);
                        promocodeInputElement.classList.remove(this._promocodeClasses.error);
                        promocodeInputElement.classList.toggle(this._promocodeClasses.active);

                        promocodeInputElement.classList.remove('form__input_filled');
                        this._el.querySelector('.form__error-label').classList.remove('form__error-label_active');
                        this._el.querySelector('.form__label').classList.remove('form__label_active');

                        if (paymentSelect.getPaymentType() === 'payment') {
                            if (promocodeInputElement.closest('.payment-form__section-grid')) {
                                promocodeInputElement.closest('.payment-form__section-grid').querySelector('.webpay-form__sale-checkbox').querySelector('input').checked = false;
                                promocodeInputElement.closest('.payment-form__section-grid').querySelector('.webpay-form__sale-checkbox').classList.toggle('webpay-form__sale-checkbox_state-disabled');
                            }
                            paymentInstance.changeInputPrice(paymentMethod.getPaymentMethodIndex(), false, false);
                        }
                        if (paymentType && paymentType === `erip`) {
                            const eripPaymentSaleField = document.querySelector(`input[name="sale-school"]`).parentElement;
                            const eripPaymentInstallmentField = document.querySelector(`input[name="installment-school"]`);
                            document.querySelector(`.erip-payment__message`).classList.toggle(`payment-message_active`);
                            eripPaymentSaleField.classList.toggle(`checkbox_disabled`);
                            if (eripPaymentInstallmentField.checked) {
                                paymentInstance.updateEripPrice(false, false, true);
                            }
                            else {
                                paymentInstance.updateEripPrice();
                            }
                        }
                    }
                    if (target.matches('button')) {
                        const defaultButtonText = target.textContent;
                        const inputValue = this.getInputValue();
                        target.textContent = this._processMessage;
                        this._el.querySelector('.promocode-input').classList.add(this._promocodeClasses.progress);
                        
                        const promocodesData = this.getPromocodesData(this._promocodeRequestSettings);
                        promocodesData.then((resp) => resp.json()).then((data) => {
                            target.textContent = defaultButtonText;
                            this._el.querySelector('.promocode-input').classList.remove(this._promocodeClasses.progress);
                            if (data.length) {
                                const modifiedData = inputValue.replace(/\s+/gi, '').toUpperCase();
                                const result = data.find((item) => item.name.toUpperCase() === modifiedData);
                                if (result) {
                                    if (paymentType && paymentType === `erip`) {
                                        const eripPaymentInstallmentField = document.querySelector(`input[name="installment-school"]`);
                                        if (eripPaymentInstallmentField.checked) {
                                            paymentInstance.updateEripPrice(true, false, true);
                                        }
                                        else {
                                            paymentInstance.updateEripPrice(true);
                                        }
                                    }
                                    else {
                                        paymentInstance.changeInputPrice(paymentMethod.getPaymentMethodIndex(), false, true);
                                    }
                                    this.showMessage(this._el.querySelector('.promocode-input'), 'success');
                                } else {
                                    this.showMessage(this._el.querySelector('.promocode-input'), 'error');
                                    // if (paymentType && paymentType === `erip`) {
                                    //     paymentInstance.updateEripPrice();
                                    // }
                                    // else {
                                    //     paymentInstance.changeInputPrice(paymentMethod.getPaymentMethodIndex(), false, false);
                                    // }
                                    paymentInstance.changeInputPrice(paymentMethod.getPaymentMethodIndex(), false, false);
                                }
                            } else {
                                this.showMessage(this._el.querySelector('.promocode-input'), 'error');
                                // if (paymentType && paymentType === `erip`) {
                                //     paymentInstance.updateEripPrice();
                                // }
                                // else {
                                //     paymentInstance.changeInputPrice(paymentMethod.getPaymentMethodIndex(), false, false);
                                // }
                                paymentInstance.changeInputPrice(paymentMethod.getPaymentMethodIndex(), false, false);
                            }
                        });
                    }
                });
            }
        }

        showMessage(element, state) {
            if (state == 'success') {
                element.classList.remove('promocode-input_state-error');
                element.querySelector('.form__error-label').textContent = 'Промокод успешно применен';
            } else {
                element.classList.remove('promocode-input_state-success');
                element.querySelector('.form__error-label').textContent = 'Недействительный промокод';
            }
            element.classList.add('promocode-input_state-' + state);
            element.querySelector('.form__error-label').classList.add('form__error-label_active');
        }

        getInputValue() {
            return this._el.querySelector('input[name="promocode"]').value;
        }

        getPromocodesData(data) {
            return fetch(ajax.url, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: new URLSearchParams(data)
            });
        }

    }

    const promocode = new Promocode('.promocode');

    window.promocode = {
        instance: promocode
    }
})();