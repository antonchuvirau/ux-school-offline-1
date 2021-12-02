'use strict';

// Скидка 10%
const SCHOOL_SALE_VALUE = 0.1;
// Промокод
const PROMOCODE_SALE_VALUE = 50;

(function() {
	const utilsModule = window.utils;

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
		updatePrices(index, isSale = false) {
			const data = window.paymentSelect.instance.getCourseData();
			// if (index === 3) {
			//     this.setTotalPrice(data.fullPrice);
			//     return;
			// }
			if (isSale) {
				this.setTotalPrice((this.getSalePrice() / 3 - this.getSalePrice() / 3 * SCHOOL_SALE_VALUE).toFixed(2));
				this.setSaleType(`Я студент-очник / я раньше уже учился у вас`);
				this.setSaleValue(10);
			} else {
				this.setTotalPrice(data.salePrice);
			}
		}
		changeInputPrice(index, isSale = false, promocode = {}) {
			switch (index) {
				case 5:
				case 4:
				case 0:
					if (isSale) {
						const selectCourseElement = document.querySelector(`.ums-select`);
						if (selectCourseElement.dataset.installment === `true`) {
							this.setTotalPrice(
								(this.getSalePrice() / 3 - this.getSalePrice() / 3 * SCHOOL_SALE_VALUE).toFixed(2)
							);
						} else {
							this.setTotalPrice(this.getSalePrice() - this.getSalePrice() * SCHOOL_SALE_VALUE);
						}
						this.setSaleType(`Я студент-очник / я раньше уже учился у вас`);
						this.setSaleValue(10);
					} else if (Object.values(promocode).length) {
						if (window.paymentSelect.instance.getPaymentType() === 'payment') {
							this.setTotalPrice(+this.getSalePrice() - +promocode.value);
							this.setSaleType(`${promocode.name}`);
							this.setSaleValue(`${promocode.value}`);
						} else if (window.paymentSelect.instance.getPaymentType() === 'certificate') {
							this.setTotalPrice(+this.getPrice() - +promocode.value);
							this.setSaleType(`${promocode.name}`);
							this.setSaleValue(`${promocode.value}`);
						}
					} else {
						const selectCourseElement = document.querySelector(`.ums-select`);
						if (selectCourseElement.dataset.installment === `true`) {
							if (isSale) {
								this.setTotalPrice(
									(this.getSalePrice() / 3 - this.getSalePrice() / 3 * SCHOOL_SALE_VALUE).toFixed(2)
								);
								this.setSaleType(`Я студент-очник / я раньше уже учился у вас`);
								this.setSaleValue(10);
							} else {
								this.setTotalPrice((this.getSalePrice() / 3).toFixed(2));
								this.setSaleType(`Нет скидки`);
								this.setSaleValue(0);
							}
						} else if (window.paymentSelect.instance.getPaymentType() === 'payment') {
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
				// case 1:
				//     if (isSale) {
				//         this.setTotalPrice(Math.round(this.getSalePrice() / 2 - this.getSalePrice() / 2 * .1));
				//         this.setSaleType(`Я студент-очник / я раньше уже учился у вас`);
				//         this.setSaleValue(10);
				//     } else {
				//         this.setTotalPrice(this.getSalePrice() / 2);
				//         this.setSaleType(`Нет скидки`);
				//         this.setSaleValue(0);
				//     }
				//     break;
				case 3:
				case 1:
					this.setTotalPrice(this.getSalePrice());
					break;
			}
			this.changeCurenciesPrice(index);
			if (window.paymentSelect.instance.getPaymentType() === 'payment') {
				const paymentSectionCollection = document.querySelectorAll(`.payment-section`);
				if (paymentSectionCollection.length > 1) {
					let totalInputElementName = 'input[name="wsb_total"]';
					jQuery('.payment-section').eq(index).find(totalInputElementName).val(this.getTotalPrice());
					jQuery('.payment-section')
						.eq(index)
						.find(totalInputElementName)
						.next()
						.addClass('form__label_active')
						.parent()
						.addClass('form__input_filled');
					}
				else {
					const htmlTotalPriceElement = document.querySelector(`.erip-payment__price-value`);
					let totalInputElementName = 'input[name="total"]';
					document.querySelector(totalInputElementName).value = this.getTotalPrice();
					htmlTotalPriceElement.textContent = `${this.getTotalPrice()} BYN`;
					jQuery('.payment-section')
						.find(totalInputElementName)
						.next()
						.addClass('form__label_active')
						.parent()
						.addClass('form__input_filled');
				}
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
		updateEripPrice(isPromocode = {}, isSale = false, isInstallment = false) {
			let eripPaymentPriceElement = document.querySelector(`.erip-payment__price-value`);

			if (eripPaymentPriceElement) {
				const eripPaymentTotalInputElement = eripPaymentPriceElement.closest(`.erip-payment`).querySelector(`input[name="total"]`);
				let eripPaymentPriceValue = `${this.getSalePrice()} BYN`;
				if (eripPaymentTotalInputElement) {
					eripPaymentTotalInputElement.value = +this.getSalePrice();
					this.setTotalPrice(+this.getSalePrice());
				}
				if (Object.values(isPromocode).length && isInstallment) {
					eripPaymentPriceValue = `${((+this.getSalePrice() - +window.promocodeData.value) / 3).toFixed(
						2
					)} BYN x 3 месяца<span class="erip-payment__price-note">Следующий платёж производится через месяц после&nbsp;осуществления&nbsp;предыдущего&nbsp;платежа.</span>`;
					if (eripPaymentTotalInputElement) {
						eripPaymentTotalInputElement.value = ((+this.getSalePrice() - +window.promocodeData.value) / 3).toFixed(2);
						this.setTotalPrice(((+this.getSalePrice() - +window.promocodeData.value) / 3).toFixed(2));
					}
				} else if (isSale && isInstallment) {
					eripPaymentPriceValue = `${((this.getSalePrice() - this.getSalePrice() * SCHOOL_SALE_VALUE) /3).toFixed(2)} BYN x 3 месяца<span class="erip-payment__price-note">Следующий платёж производится через месяц после&nbsp;осуществления&nbsp;предыдущего&nbsp;платежа.</span>`;
					if (eripPaymentTotalInputElement) {
						eripPaymentTotalInputElement.value = ((+this.getSalePrice() - this.getSalePrice() * SCHOOL_SALE_VALUE) / 3).toFixed(2);
						this.setTotalPrice(((+this.getSalePrice() - this.getSalePrice() * SCHOOL_SALE_VALUE) / 3).toFixed(2));
					}
				} else if (isInstallment) {
					eripPaymentPriceValue = `${(this.getSalePrice() / 3).toFixed(2)} BYN x 3 месяца<span class="erip-payment__price-note">Следующий платёж производится через месяц после&nbsp;осуществления&nbsp;предыдущего&nbsp;платежа.</span>`;
					if (eripPaymentTotalInputElement) {
						eripPaymentTotalInputElement.value = (+this.getSalePrice() / 3).toFixed(2);
						this.setTotalPrice((+this.getSalePrice() / 3).toFixed(2));
					}
				} else if (isSale) {
					eripPaymentPriceValue = `<span class="erip-payment__price-value-old">${+this.getSalePrice()}</span> ${+this.getSalePrice() -
						+this.getSalePrice() * SCHOOL_SALE_VALUE} BYN`;
						if (eripPaymentTotalInputElement) {
							eripPaymentTotalInputElement.value = +this.getSalePrice() - +this.getSalePrice() * SCHOOL_SALE_VALUE;
							this.setTotalPrice(+this.getSalePrice() - +this.getSalePrice() * SCHOOL_SALE_VALUE);
						}
				} else if (Object.values(isPromocode).length) {
					eripPaymentPriceValue = `<span class="erip-payment__price-value-old">${+this.getSalePrice()}</span> ${+this.getSalePrice() - +window.promocodeData.value} BYN`;
					if (eripPaymentTotalInputElement) {
						eripPaymentTotalInputElement.value = +this.getSalePrice() - +window.promocodeData.value;
						this.setTotalPrice(+this.getSalePrice() - +window.promocodeData.value);
					}
				}
				eripPaymentPriceElement.innerHTML = eripPaymentPriceValue;
			}
			else {
				eripPaymentPriceElement = document.querySelector(`input[name="total"]`);
				let eripPaymentPriceValue = +`${this.getSalePrice()}`;
				if (Object.values(isPromocode).length && isInstallment) {
					eripPaymentPriceValue = +`${((this.getSalePrice() - +window.promocodeData.value) / 3).toFixed(
						0
					)}`;
				} else if (isSale && isInstallment) {
					eripPaymentPriceValue = +`${((this.getSalePrice() - this.getSalePrice() * SCHOOL_SALE_VALUE) /
						3).toFixed(
						0
					)}`;
				} else if (isInstallment) {
					eripPaymentPriceValue = +`${(this.getSalePrice() / 3).toFixed(
						0
					)}`;
				} else if (isSale) {
					eripPaymentPriceValue = +`${this.getSalePrice() -
						this.getSalePrice() * SCHOOL_SALE_VALUE}`;
				} else if (Object.values(isPromocode).length) {
					eripPaymentPriceValue = +`${this.getSalePrice() -
						+window.promocodeData.value}`;
				}
				eripPaymentPriceElement.value = eripPaymentPriceValue;
				this.setTotalPrice(eripPaymentPriceValue);
			}
		}
		// INSTALLMENT
		updateInstallmentPrice() {
			const courseData = window.paymentSelect.instance.getCourseData();
			const installmentPaymentPriceElement = document.querySelector(`.installment-payment__price-value`);
			const installmentPaymentIdInput = document.querySelector(`input[name="installment-id"]`);
			const installmentPaymentPriceInput = document.querySelector(`input[name="installment-price"]`);
			const installmentPaymentCourseName = document.querySelector(`input[name="installment-course-name"]`);
			installmentPaymentIdInput.value = utilsModule.getRandId() + INSTALLMENT_SHOP_ID;
			installmentPaymentPriceInput.value = this.getSalePrice();
			installmentPaymentCourseName.value = courseData.installmentProductName;
			const installmentDebtPayment = this.getInstallmentDebt(this.getSalePrice(), INSTALLMENT_TERM);
			installmentPaymentPriceElement.textContent = `${((this.getSalePrice() + installmentDebtPayment) /
				INSTALLMENT_TERM).toFixed(2)} BYN x ${INSTALLMENT_TERM} месяцев ≈ ${(this.getSalePrice() +
				installmentDebtPayment).toFixed(2)} BYN`;
		}
		recalculateInstallmentPrice(installmentTerm) {
			const installmentPaymentPriceElement = document.querySelector(`.installment-payment__price-value`);
			const installmentDebtPayment = this.getInstallmentDebt(this.getSalePrice(), installmentTerm);
			installmentPaymentPriceElement.textContent = `${((this.getSalePrice() + installmentDebtPayment) /
				installmentTerm).toFixed(2)} BYN x ${installmentTerm} месяцев ≈ ${(this.getSalePrice() +
				installmentDebtPayment).toFixed(2)} BYN`;
		}
		getInstallmentDebt(coursePrice, installmentTerm = 12) {
			const installmentMonthPayment = coursePrice / installmentTerm;
			const installmentMonthPercentageDebt = INSTALLMENT_RATE / installmentTerm;
			// Only for the first payment
			let installmentDebtPayment = coursePrice * (installmentMonthPercentageDebt / 100);
			while (installmentTerm) {
				installmentDebtPayment +=
					(coursePrice - installmentMonthPayment) * (installmentMonthPercentageDebt / 100);
				installmentTerm--;
				coursePrice = coursePrice - installmentMonthPayment;
			}
			return installmentDebtPayment;
		}
	}

	const paymentInstance = new Payment();
	window.payment = {
		instance: paymentInstance
	};
})();
