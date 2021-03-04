'use strict';

(function () {
    class Payment {
        _totalPrice;
        _price;
        _current;
        _dropdownType;
        _salePrice;
        _saleType;
        _saleValue;

        constructor() {
            this.setTotalPrice(0);
            this.setPrice(0);
            this.setSalePrice(0);
            this.setSaleValue(0);
            this.setSaleType(`Без скидки`);
        }

        getTotalPrice() {
            return this._totalPrice;
        }
        setTotalPrice(value) {
            this._totalPrice = value;
        }
        getPrice() {
            return this._price;
        }
        setPrice(value) {
            this._price = value;
        }
        getCurrent() {
            return this._current;
        }
        setCurrent(value) {
            this._current = value;
        }
        getDropdownType() {
            return this._dropdownType;
        }
        setDropdownType(value) {
            this._dropdownType = value;
        }
        getSalePrice() {
            return this._salePrice;
        }
        setSalePrice(value) {
            this._salePrice = value;
        }
        getSaleType() {
            return this._saleType;
        }
        setSaleType(value) {
            this._saleType = value;
        }
        getSaleValue() {
            return this._saleValue;
        }
        setSaleValue(value) {
            this._saleValue = value;
        }
        updatePrices(index) {
            const data = window.paymentSelect.instance.getCourseData();
            // if (index === 3) {
            //     this.setTotalPrice(data.fullPrice);
            //     return;
            // }
            this.setTotalPrice(data.salePrice);
        }
        changeInputPrice(index, isSale = false, promocode = false) {
            switch (index) {
                case 0:
                    if (isSale) {
                        this.setTotalPrice(this.getSalePrice() - (this.getSalePrice() * .1));
                        this.setSaleType(`Я студент-очник / я раньше уже учился у вас`);
                        this.setSaleValue(10);
                    } else if (promocode) {
                        if (window.paymentSelect.instance.getPaymentType() === 'payment') {
                            this.setTotalPrice(+this.getSalePrice() - 50);
                            this.setSaleType(`Промокод: MirParfuma`);
                            this.setSaleValue(`100 BYN`);
                        } else if (window.paymentSelect.instance.getPaymentType() === 'certificate') {
                            this.setTotalPrice(+this.getPrice() - 50);
                            this.setSaleType(`Промокод: MirParfuma`);
                            this.setSaleValue(`100 BYN`);
                        }
                    } else {
                        if (window.paymentSelect.instance.getPaymentType() === 'payment') {
                            this.setTotalPrice(this.getSalePrice());
                            this.setSaleType(`Нет скидки`);
                            this.setSaleValue(0);
                        } else if (window.paymentSelect.instance.getPaymentType() === 'certificate') {
                            this.setTotalPrice(this.getPrice());
                            this.setSaleType(`Нет скидки`);
                            this.setSaleValue(0);
                        }
                    }
                    break;
                case 2:
                    if (isSale) {
                        this.setTotalPrice(Math.round(this.getSalePrice() / 2 - this.getSalePrice() / 2 * .1));
                        this.setSaleType(`Я студент-очник / я раньше уже учился у вас`);
                        this.setSaleValue(10);
                    } else {
                        this.setTotalPrice(this.getSalePrice() / 2);
                        this.setSaleType(`Нет скидки`);
                        this.setSaleValue(0);
                    }
                    break;
                case 3:
                    this.setTotalPrice(this.getSalePrice());
                    break;
            }
            this.changeCurenciesPrice(index);
            if (window.paymentSelect.instance.getPaymentType() === 'payment') {
                let totalInputElement = jQuery('.payment-section').eq(index).find('input[name="wsb_total"]');
                let totalInputElementName = totalInputElement.length ? 'input[name="wsb_total"]' : 'input[name="total"]';
                jQuery('.payment-section').eq(index).find(totalInputElementName).val(this.getTotalPrice());
                jQuery('.payment-section').eq(index).find(totalInputElementName).next().addClass('form__label_active').parent().addClass('form__input_filled');
            } else if (window.paymentSelect.instance.getPaymentType() === 'certificate') {
                let totalInputElement = document.querySelector('input[name="total"]');
                totalInputElement.value = this.getTotalPrice();
                totalInputElement.nextElementSibling.classList.add('form__label_active');
                totalInputElement.parentElement.classList.add('form__input_filled');
            }
        }
        changeCurenciesPrice(index) {
            let totalPriceInUsd = (this.getTotalPrice() / parseFloat(rates['usd'])).toFixed(0);
            let totalPriceInRub = (this.getTotalPrice() / (parseFloat(rates['rub']) / 100)).toFixed(0);
            let currenciesPriceTemplate = `
                    <p class="ums-currency__value ums-currency__symbol">BYN</p>
                    <p class="ums-currency__value ums-currency__value_color-gray icon-currency icon-dollar_color-gray">&nbsp;≈&nbsp;${totalPriceInUsd}</p>
                    <p class="ums-currency__value ums-currency__value_color-gray icon-currency icon-ruble_color-gray">&nbsp;≈&nbsp;${totalPriceInRub}</p>`;
            if (window.paymentSelect.instance.getPaymentType() === 'payment') {
                const container = document.querySelectorAll('.payment-section');
                const input = container[index].querySelector('.ums-currency');
                if (input) {
                    input.innerHTML = '';
                    input.insertAdjacentHTML('afterBegin', currenciesPriceTemplate);
                }
            } else if (window.paymentSelect.instance.getPaymentType() === 'certificate') {
                const input = document.querySelector('.ums-currency');
                if (input) {
                    input.innerHTML = '';
                    input.insertAdjacentHTML('afterBegin', currenciesPriceTemplate);
                }
            }
        }
    }

    const paymentInstance = new Payment();
    window.payment = {
        instance: paymentInstance
    }
})();