'use strict';

(function() {
	// Load modules
	const paymentMethodModule = window.paymentMethod.instance;
	const paymentModule = window.payment.instance;
	const utilsModule = window.utils;

	class PaymentSelect {
		_courseData = {
			title: ``,
			installmentProductName: ``,
			fullPrice: 0,
			salePrice: 0
		};

		constructor(paymentSelectContainer) {
			this._el = document.querySelector(paymentSelectContainer);

			if (this._el) {
				this._paymentType = this._el.dataset.type;
				this._el.addEventListener(`click`, this.onPaymentSelectClickHandler.bind(this));
			}
		}

		onPaymentSelectClickHandler(evt) {
			const target = evt.target;
			const courseListElements = this._el.querySelectorAll(`.ums-select__list-item`);

			if (target.matches(`button`)) {
				this._el.querySelector(`.ums-select__btn`).classList.toggle(`ums-select__btn_state-active`);
				this._el.closest(`.form__select`).classList.toggle(`form__select_state-active`);
				this._el.querySelector(`.ums-select__list`).classList.toggle(`ums-select__list_visibility-open`);
			}
			if (target.matches(`li`)) {
				const paymentSections = document.querySelectorAll(`.payment-section`);
				// RESET PAYMENT'S OPTIONS
				const paymentMethodInputCollection = document.querySelectorAll(`.payment-item__input`);
				if (paymentMethodInputCollection.length) {
					for (const paymentMethodInput of paymentMethodInputCollection) {
						paymentMethodInput.checked = false;
					}
					utilsModule.removeClass(paymentSections, `payment-section_state-active`);
				}
				const paymentLevel = +target.dataset.paymentLevel;
				const partialPayment = target.dataset.partialPayment;
				const paymentButton = this._el.querySelector(`.ums-select__btn`);
				this.fillCourseData(target);
				utilsModule.removeClass(courseListElements, `ums-select__list-item_state-active`);
				target.classList.add(`ums-select__list-item_state-active`);

				if (paymentLevel === 2) {
					const paymentSections = document.querySelectorAll(`.payment-section`);
					paymentMethodModule.setPaymentMethodIndex(0);
					utilsModule.removeClass(paymentSections, `payment-section_state-active`);
					paymentSections[0].classList.add(`payment-section_state-active`);
					paymentMethodModule.changePaymentMethod(0);
					// Переписать JQuery
					jQuery(`.payment-item:not(:nth-child(1))`).hide();
					jQuery(`.webpay-form__sale-checkbox`).hide();
					jQuery(`.toggle-checkbox`).hide();
				} else {
					// Переписать JQuery
					jQuery(`.payment-item:not(:nth-child(1)), .payment-item:not(:nth-child(2))`).show();
					jQuery(`.webpay-form__sale-checkbox`).show();
					jQuery(`.toggle-checkbox`).show();
				}

				if (this._paymentType === `payment`) {
					paymentModule.setTotalPrice(this._courseData.salePrice);
					const saleInputs = document.querySelectorAll(`input[name="sale"]`);
					for (let input of saleInputs) {
						input.checked = false;
					}
				} else {
					paymentModule.setTotalPrice(this._courseData.fullPrice);
				}

				if (partialPayment === `no`) {
					jQuery(`.payment-item:nth-child(3)`).hide();
				} else {
					jQuery(`.payment-item:not(:nth-child(2))`).show();
				}

				paymentButton.dataset.price = this._courseData.fullPrice;
				paymentButton.dataset.salePrice = this._courseData.salePrice;
				paymentButton.innerHTML = ``;
				const targetChildNodes = target.childNodes;
				for (const targetChildNode of Array.from(targetChildNodes)) {
					console.log(targetChildNode);
					if (targetChildNode.nodeType === 3) {
						paymentButton.textContent = targetChildNode.textContent;
					} else {
						paymentButton.appendChild(targetChildNode.cloneNode(true));
					}
				}
				paymentButton.classList.remove(`ums-select__btn_state-active`);
				this._el.closest(`.form__select`).classList.toggle(`form__select_state-active`);
				this._el.querySelector(`.ums-select__list`).classList.remove(`ums-select__list_visibility-open`);

				paymentModule.setCurrent(this._courseData.title);
				paymentModule.setPrice(this._courseData.fullPrice);
				paymentModule.setSalePrice(this._courseData.salePrice);
				paymentModule.changeInputPrice(paymentMethodModule.getPaymentMethodIndex());
			}
		}

		getPaymentType() {
			return this._paymentType;
		}

		getCourseData() {
			return this._courseData;
		}

		fillCourseData(courseListElement) {
			this._courseData.installmentProductName = courseListElement.dataset.courseName;
			this._courseData.title = courseListElement.textContent;
			this._courseData.fullPrice = +courseListElement.dataset.price;
			this._courseData.salePrice = +courseListElement.dataset.salePrice;
		}
	}

	const paymentSelectInstance = new PaymentSelect(`.ums-select`);
	window.paymentSelect = {
		instance: paymentSelectInstance
	};
})();
