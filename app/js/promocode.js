'use strict';

(function(){
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

                    if (target.matches('input[name="promocode-toggle"]')) {
                        const promocodeInputElement = this._el.querySelector('.promocode-input');
                        target.value = '';
                        promocodeInputElement.classList.remove(this._promocodeClasses.success);
                        promocodeInputElement.classList.remove(this._promocodeClasses.error);
                        promocodeInputElement.classList.toggle(this._promocodeClasses.active);

                        promocodeInputElement.classList.remove('form__input_filled');
                        this._el.querySelector('.form__error-label').classList.remove('form__error-label_active');
                        this._el.querySelector('.form__label').classList.remove('form__label_active');

                        if (paymentSelect.getPaymentType() === 'payment') {
                            promocodeInputElement.closest('.payment-form__section-grid').querySelector('.webpay-form__sale-checkbox').querySelector('input').checked = false;
                            promocodeInputElement.closest('.payment-form__section-grid').querySelector('.webpay-form__sale-checkbox').classList.toggle('webpay-form__sale-checkbox_state-disabled');
                        }
                        paymentInstance.changePrice(paymentMethod.getMethodIndex(), false, false);
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
                                const result = data.find((item) => item.name.toUpperCase() === inputValue.toUpperCase());
                                if (result) {
                                    paymentInstance.changePrice(paymentMethod.getMethodIndex(), false, true);
                                    this.showMessage(this._el.querySelector('.promocode-input'), 'success');
                                } else {
                                    this.showMessage(this._el.querySelector('.promocode-input'), 'error');
                                    paymentInstance.changePrice(paymentMethod.getMethodIndex(), false, false);
                                }
                            } else {
                                this.showMessage(this._el.querySelector('.promocode-input'), 'error');
                                paymentInstance.changePrice(paymentMethod.getMethodIndex(), false, false);
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
            return this._el.querySelector('input').value;
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