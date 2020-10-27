'use strict';

//Написать методы для получения и назначения значений
(function() {
    let totalPrice;
    let price;
    let current;
    let dropdownType;
    let salePrice;
    class PaymentMethod {
        _index = 0;
        _data = [{
                id: 0,
                title: 'Оплатить картой',
                checked: true
            },
            {
                id: 1,
                title: 'ЕРИП',
                checked: false
            },
            {
                id: 2,
                title: 'Рассрочка 2 месяца от UX Mind School',
                checked: false
            },
            {
                id: 3,
                title: 'Рассрочка от 2 до 9 месяцев по карте Халва',
                checked: false
            },
            {
                id: 4,
                title: 'В отделении банка',
                checked: false
            }
        ];

        constructor() {
            const el = document.querySelector('.payment-methods');
            const forms = document.querySelectorAll('.payment-section');
            const template = document.querySelector('#payment-method');
            this.fragment = document.createDocumentFragment();
            if (template) {
                this.template = template.content;
            }
            if (el) {
                el.addEventListener('click', (event) => {
                    const target = event.target;

                    if (target.matches('input')) {
                        const index = +target.value;
                        this.setMethodIndex(index);
                        window.utils.removeClass(forms, 'payment-section_state-active');
                        forms[this.getMethodIndex()].classList.add('payment-section_state-active');
                        changeInputPrice(this.getMethodIndex());
                        jQuery('body, html').animate({
                            scrollTop: jQuery('#payment-anchor').offset().top
                        }, 800);
                    }
                });
            }
        }

        getMethodIndex() {
            return this._index;
        }

        setMethodIndex(value) {
            this._index = value;
        }

        render() {
            for (const item of this._data) {
                const el = this.template.cloneNode(true);

                el.querySelector('input').value = item.id;
                el.querySelector('.payment-item__name').textContent = item.title;
                item.checked ? el.querySelector('input').checked = true : null;
                this.fragment.appendChild(el);
            }
            return this.fragment;
        }
    }

    function changeInputPrice(index, sale, promocode) {
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
        window.payment.changeCurenciesPrice(index);
        if (window.payment.dropdownType === 'payment') {
            let totalInputElement = jQuery('.payment-section').eq(index).find('input[name="wsb_total"]');
            let totalInputElementName = totalInputElement.length ? 'input[name="wsb_total"]' : 'input[name="total"]';
            jQuery('.payment-section').eq(index).find(totalInputElementName).val(window.payment.totalPrice);
            jQuery('.payment-section').eq(index).find(totalInputElementName).next().addClass('form__label_active').parent().addClass('form__input_filled');
        } else if (dropdownType === 'certificate') {
            let totalInputElement = document.querySelector('input[name="total"]');
            totalInputElement.value = window.payment.totalPrice;
            totalInputElement.nextElementSibling.classList.add('form__label_active');
            totalInputElement.parentElement.classList.add('form__input_filled');
        }
    }

    function changeCurenciesPrice(index) {
        let totalPriceInUsd = (window.payment.totalPrice / rates.usd).toFixed(0);
        let totalPriceInRub = (window.payment.totalPrice / (rates.rub / 100)).toFixed(0);
        let currenciesPriceTemplate = `
                <p class="ums-currency__value ums-currency__symbol">BYN</p>
                <p class="ums-currency__value ums-currency__value_color-gray icon-currency icon-dollar_color-gray">&nbsp;≈&nbsp;${totalPriceInUsd}</p>
                <p class="ums-currency__value ums-currency__value_color-gray icon-currency icon-ruble_color-gray">&nbsp;≈&nbsp;${totalPriceInRub}</p>`;
        if (window.payment.dropdownType === 'payment') {
            document.querySelectorAll('.payment-section')[index].querySelector('.ums-currency').innerHTML = '';
            document.querySelectorAll('.payment-section')[index].querySelector('.ums-currency').insertAdjacentHTML('afterBegin', currenciesPriceTemplate);
        } else if (window.payment.dropdownType === 'certificate') {
            document.querySelector('.ums-currency').innerHTML = '';
            document.querySelector('.ums-currency').insertAdjacentHTML('afterBegin', currenciesPriceTemplate);
        }
    }

    const methods = new PaymentMethod();
    const paymentMethodsEl = document.querySelector('.payment-methods');

    if (paymentMethodsEl) {
        const content = methods.render();
        paymentMethodsEl.appendChild(content);
    }

    window.payment = {
        totalPrice,
        salePrice,
        price,
        current,
        dropdownType,
        methods,
        changeInputPrice: changeInputPrice,
        changeCurenciesPrice: changeCurenciesPrice
    }
})();