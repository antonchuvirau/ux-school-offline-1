'use strict';

(function() {
    const paymentInstance = window.payment.instance;

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

        constructor(paymentMethodscontainer) {
            this._el = document.querySelector(paymentMethodscontainer);
            if (this._el) {
                this.renderPaymentMethods(this._el, this._data);
                this._el.addEventListener('click', (event) => {
                    const target = event.target;
                    const paymentForms = document.querySelectorAll('.payment-section');

                    if (target.matches('input')) {
                        const index = +target.value;
                        this.setMethodIndex(index);
                        window.utils.removeClass(paymentForms, 'payment-section_state-active');
                        paymentForms[this.getMethodIndex()].classList.add('payment-section_state-active');
                        paymentInstance.update(this.getMethodIndex());
                        paymentInstance.changePrice(this.getMethodIndex());
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

        renderPaymentMethods(container, data) {
            const paymentMethodsFragment = document.createDocumentFragment();
            
            for (const paymentMethodData of data) {
                const paymentMethodElement = this.createPaymentMethodElement(paymentMethodData);
                paymentMethodsFragment.appendChild(paymentMethodElement);
            }
            container.appendChild(paymentMethodsFragment);
        }

        createPaymentMethodElement(data) {
            const paymentMethodTemplate = document.querySelector('#payment-method').content;
            const duplicatedPaymentMethodElement = paymentMethodTemplate.cloneNode(true);

            duplicatedPaymentMethodElement.querySelector('input').value = data.id;
            duplicatedPaymentMethodElement.querySelector('.payment-item__name').textContent = data.title;
            data.checked ? duplicatedPaymentMethodElement.querySelector('input').checked = true : null;

            return duplicatedPaymentMethodElement;
        }

        setCheckedInput(inputIndex) {
            this._el.querySelector(`input[name="payment"][value="${inputIndex}"]`).checked = true;
        }
    }

    const paymentMethod = new PaymentMethod('.payment-methods');

    window.paymentMethod = {
        instance: paymentMethod
    }
})();