'use strict';

//Написать методы для получения и назначения значений
(function() {
    let totalPrice = 0;
    let price = 0;
    let current = '';
    let dropdownType = '';
    let salePrice = 0;

    function updatePrices(index) {
        const data = window.paymentSelect.instance.getCourseData();
        if (index === 3) {
            window.payment.totalPrice = data.fullPrice;
            return;
        }
        else {
            window.payment.totalPrice = data.salePrice;
        }
    }

    function changeInputPrice(index, sale = false, promocode) {
        switch (index) {
            case 0:
                if (sale) {
                    window.payment.totalPrice = window.payment.salePrice - (window.payment.salePrice * .1);
                    saleType = 'Я студент-очник / я раньше уже учился у вас';
                    saleValue = 10;
                } else if (promocode) {
                    if (window.payment.dropdownType === 'payment') {
                        window.payment.totalPrice = window.payment.salePrice - 50;
                        //totalPrice = salePrice - (salePrice * (+promocode.value / 100));
                        saleType = 'Промокод ' + promocode.name;
                        saleValue = promocode.value
                    } else if (window.payment.dropdownType === 'certificate') {
                        window.payment.totalPrice = window.payment.price - 50;
                        //totalPrice = price - (price * (+promocode.value / 100));
                        saleType = 'Промокод ' + promocode.name;
                        saleValue = promocode.value
                    }
                } else {
                    if (window.payment.dropdownType === 'payment') {
                        window.payment.totalPrice = window.payment.salePrice;
                        saleType = 'Без скидки';
                        saleValue = 0;
                    } else if (window.payment.dropdownType === 'certificate') {
                        window.payment.totalPrice = window.payment.price;
                        saleType = 'Без скидки';
                        saleValue = 0;
                    }
                }
                break;
            case 2:
                if (sale) {
                    window.payment.totalPrice = Math.round(window.payment.salePrice / 2 - window.payment.salePrice / 2 * .1);
                    saleType = 'Я студент-очник / я раньше уже учился у вас';
                    saleValue = 10;
                } else {
                    window.payment.totalPrice = window.payment.salePrice / 2;
                    saleType = 'Без скидки';
                    saleValue = 0;
                }
                break;
            case 3:
                window.payment.totalPrice = window.payment.price;
                break;
        }
        changeCurenciesPrice(index);
        if (window.paymentSelect.instance.getPaymentType() === 'payment') {
            let totalInputElement = jQuery('.payment-section').eq(index).find('input[name="wsb_total"]');
            let totalInputElementName = totalInputElement.length ? 'input[name="wsb_total"]' : 'input[name="total"]';
            jQuery('.payment-section').eq(index).find(totalInputElementName).val(window.payment.totalPrice);
            jQuery('.payment-section').eq(index).find(totalInputElementName).next().addClass('form__label_active').parent().addClass('form__input_filled');
        } else if (window.paymentSelect.instance.getPaymentType() === 'certificate') {
            let totalInputElement = document.querySelector('input[name="total"]');
            totalInputElement.value = window.payment.totalPrice;
            totalInputElement.nextElementSibling.classList.add('form__label_active');
            totalInputElement.parentElement.classList.add('form__input_filled');
        }
    }

    function changeCurenciesPrice(index) {
        const container = document.querySelectorAll('.payment-section');
        const input = container[index].querySelector('.ums-currency');
        let totalPriceInUsd = (window.payment.totalPrice / rates.usd).toFixed(0);
        let totalPriceInRub = (window.payment.totalPrice / (rates.rub / 100)).toFixed(0);
        let currenciesPriceTemplate = `
                <p class="ums-currency__value ums-currency__symbol">BYN</p>
                <p class="ums-currency__value ums-currency__value_color-gray icon-currency icon-dollar_color-gray">&nbsp;≈&nbsp;${totalPriceInUsd}</p>
                <p class="ums-currency__value ums-currency__value_color-gray icon-currency icon-ruble_color-gray">&nbsp;≈&nbsp;${totalPriceInRub}</p>`;
        if (window.paymentSelect.instance.getPaymentType() === 'payment' && input) {
            input.innerHTML = '';
            input.insertAdjacentHTML('afterBegin', currenciesPriceTemplate);
        } else if (window.paymentSelect.instance.getPaymentType() === 'certificate' && input) {
            input.innerHTML = '';
            input.insertAdjacentHTML('afterBegin', currenciesPriceTemplate);
        }
    }

    window.payment = {
        totalPrice,
        salePrice,
        price,
        current,
        dropdownType,
        update: updatePrices,
        changePrice: changeInputPrice,
        changeCurenciesPrice: changeCurenciesPrice
    }
})();