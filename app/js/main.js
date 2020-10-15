'use strict';

document.addEventListener('DOMContentLoaded', () => {
    //Privacy checkbox
    (function () {
        const inputs = document.querySelectorAll('.privacy-checkbox__input');

        if (inputs) {
            for (let input of inputs) {
                input.addEventListener('click', privacyInputHandler);
            }
        }

        function privacyInputHandler(event) {
            const target = event.target;
            const button = target.closest('.checkbox').previousElementSibling.querySelector('button[type="submit"]');

            if (target.checked) {
                button.disabled = false
            } else {
                button.disabled = true;
            }
        }
    })();

    //Inner carousel
    (function () {
        const innerCarouselsCollection = Array.from(document.querySelectorAll('.inner-carousel__grid'));
        const defaultCarouselClass = 'inner-carousel-instance-';

        if (innerCarouselsCollection.length) {
            innerCarouselsCollection.forEach((item, index) => {
                const carousel = item.closest('.inner-carousel');

                item.classList.add(defaultCarouselClass + index);
                new Swiper(item, {
                    pagination: {
                        el: carousel.querySelector('.swiper-pagination'),
                        type: 'bullets'
                    },
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    navigation: {
                        prevEl: carousel.querySelector('.inner-carousel__btn-prev'),
                        nextEl: carousel.querySelector('.inner-carousel__btn-next')
                    }
                });
            });
        }
    })();

    let headerElement = document.querySelector('.header');
    let formInputs = document.querySelectorAll('.js-form__input input, .js-form__input textarea');

    let textareaBtnElement = document.querySelector('.form__textarea-btn');
    let playVideoBtnElement = document.querySelectorAll('.modal-video-button');

    let paymentFormInputElements = document.querySelectorAll('.payment-form__input input');
    let pageNavigationLinksCollection = document.querySelectorAll('.page-navigation__link');
    let weCarousel;
    let inputMaskFromPlaceholder;
    let isCompleted = false;
    let customSwiper;
    let isCustomSwiperInit = false;
    let isMobile = false;
    let isTablet = false;
    let paymentMethodIndex = 0;
    let totalInputElementName;
    let saleType = 'Без скидки';
    let saleValue = 0;
    let paymentLevel;
    // let current;
    // let price;
    // let salePrice;

    let calculationButtonText;
    let requiredInputsCollection;
    let certificateForm = '#wpcf7-f1805-o1';
    let certificatePaymentObject;
    let telInputValidation = false;
    let emailInputValidation = false;
    let textInputValidation = false;
    let selectValidation = false;
    let innerCarouselCollection = jQuery('.inner-carousel__grid');
    let dataCurrentPageValue = 1;
    let wpcf7Elm = document.querySelectorAll('.wpcf7');
    let dataMaxPagesValue;
    if (document.querySelector('.course-list__row_first')) {
        dataMaxPagesValue = document.querySelector('.course-list__row_first').dataset.maxNumPages;
    }
    let portfolioCurrentPageNum = 1;
    let btnElementActiveTemplate = 'Загружаем...';
    let btnElementDefaultTemplate = 'Показать ещё<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z" fill="#211130"></path> </svg>';
    let postPortfolioPageNum = 1;
    let resultStr;
    let courseTypeArray = [];
    let clickedBool = false;
    let elementTextContent;

    let deliveryElement = document.querySelector('select[name="delivery"]');

    let umsTestimonialsCarousel, umsGraduatesCarousel;
    let umsSelectCollection, umsInputCollection;

    //Variables
    let defaultSubmitButtonText;
    const lecturersCollection = document.querySelectorAll('.lecturers-page__item');
    const wpcf7Collection = document.querySelectorAll('.wpcf7');
    const contactPageItems = document.querySelectorAll('.contact-page__info-item');
    const navigationLinksCollection = document.querySelectorAll('.page-navigation__link');
    const inputs = document.querySelectorAll('input');
    let dropdownType;
    let totalPrice;
    let salePrice;
    let price;
    let current;
    let currentPage = 1;

    initWeCarousel();
    initCourseGallery();
    detectDeviceWidth();
    changeLayout();
    showPopup();
    initSwiperInstance();
    initSelectListener();
    initInputListener();

    document.addEventListener('click', (event) => {
        //Get target element
        const target = event.target;
        //Find current element
        if (target.matches('.m-options__menu-btn')) {
            let scrollBarWidth = getScrollbarWidth();
            target.closest('header').nextElementSibling.classList.add('m-menu_opened');
            document.body.style.paddingRight = scrollBarWidth;
            document.documentElement.classList.add('is-locked');
        }
        if (target.matches('.m-menu__options-close-btn')) {
            target.closest('.m-menu').classList.remove('m-menu_opened');
            document.body.style.paddingRight = 0;
            document.documentElement.classList.remove('is-locked');
        }
        if (target.dataset.modal) {
            const modalId = target.dataset.modal;
            jQuery(modalId).modal({
                closeExisting: false
            });
        }
        if (target.dataset.videoId) {
            const videoId = target.dataset.videoId;
            const videoLink = 'https://www.youtube.com/embed/' + videoId;
            const videoModal = document.querySelector('.video-modal');
            videoModal.querySelector('iframe').setAttribute('src', videoLink);
            jQuery('.video-modal').modal({
                closeExisting: false
            });
        }
        if (target.matches('.content-list__title')) {
            target.classList.toggle('content-list__title_active');
            //Need to add animation with JS
            target.nextElementSibling.classList.toggle('content-list__text_state-actived');
        }
        if (target.matches('.contact-page__info-item')) {
            //Need to add animation with JS
            jQuery('body, html').animate({
                scrollTop: jQuery('#map-anchor').offset().top
            }, 800);
        }
        if (target.matches('.sort-navigation__button')) {
            const sortValue = target.dataset.sort;
            const buttons = document.querySelectorAll('.sort-navigation__button');
            const sortElements = document.querySelector('.sort-list').children;
            removeClass(buttons, 'sort-navigation__button_state-active');
            removeClass(sortElements, 'd-none');
            target.classList.add('sort-navigation__button_state-active');

            if (sortValue !== 'all') {
                for (let item of sortElements) {
                    let tagValues = item.dataset.tag;
                    if (!tagValues.split(', ').includes(sortValue)) {
                        item.classList.add('d-none');
                    }
                }
            }
        }
        if (target.matches('.dropdown-course-info__lecturer')) {
            const id = target.dataset.lecturerPostId;
            const text = target.textContent;
            target.textContent = 'Загружаем...';
            jQuery.when(getLecturerInfo(id, target)).then((response) => {
                target.style.opacity = 1;
                target.textContent = text;
                document.querySelector('.dropdown-lecturer-modal').innerHTML = response;
                jQuery('.dropdown-lecturer-modal').modal();
            });
        }
        if (target.matches('.js-tabs__btn')) {
            const tabsHeader = target.closest('.course-list__header');
            const tabsGrid = tabsHeader.nextElementSibling;
            const id = target.dataset.termId;
            const isShowFull = target.dataset.showFull;
            dataCurrentPageValue = 1;
            const buttons = document.querySelectorAll('.js-tabs__btn');
            let data = {};

            if (!Array.isArray(id)) {
                if (isShowFull) {
                    data = {
                        action: 'tabs',
                        showTestPost: false,
                        id: id,
                        showFullPosts: true
                    }
                } else {
                    data = {
                        action: 'tabs',
                        showTestPost: false,
                        id: id
                    }
                }
            } else {
                if (isShowFull) {
                    data = {
                        action: 'tabs',
                        id: id,
                        showFullPosts: true
                    }
                } else {
                    data = {
                        action: 'tabs',
                        id: id
                    }
                }
            }
            removeClass(buttons, 'tabs__btn_active');
            target.classList.add('tabs__btn_active');
            jQuery.ajax({
                url: ajax.url,
                type: 'POST',
                data: data,
                beforeSend: function () {
                    tabsGrid.style.opacity = .6;
                },
                success: function (response) {
                    setTimeout(function () {
                        tabsGrid.style.opacity = 1;
                    }, 600);
                    document.querySelector('.course-list__wrapper').innerHTML = response;
                    dataMaxPagesValue = +document.querySelector('.course-list__row_first').dataset.maxNumPages;
                    if (dataCurrentPageValue === dataMaxPagesValue) {
                        document.querySelector('.course-list__more-btn').classList.add('course-list__more-btn_disabled');
                        document.querySelector('.course-list__footer').classList.add('course-list__footer_state-disabled');
                    } else {
                        document.querySelector('.course-list__more-btn').classList.remove('course-list__more-btn_disabled');
                        document.querySelector('.course-list__footer').classList.remove('course-list__footer_state-disabled');
                    }
                }
            });
        }
        if (target.matches('.course-list__more-btn')) {
            const gridElement = target.closest('.course-list__grid');
            const btnElementActiveTemplate = 'Загружаем...';
            const btnElementDefaultTemplate = 'Показать ещё<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z" fill="#fff"></path> </svg>';
            jQuery.ajax({
                url: ajax.url,
                type: 'POST',
                data: {
                    action: 'courses',
                    id: +document.querySelector('.tabs__btn_active').dataset.termId,
                    current_page: dataCurrentPageValue
                },
                beforeSend: function () {
                    gridElement.style.opacity = .6;
                    target.innerHTML = btnElementActiveTemplate;
                },
                success: function (response) {
                    setTimeout(function () {
                        gridElement.style.opacity = 1;
                    }, 600);
                    document.querySelector('.course-list__wrapper').insertAdjacentHTML('beforeEnd', response);
                    target.innerHTML = btnElementDefaultTemplate;
                    dataCurrentPageValue += 1;
                    if (dataCurrentPageValue === dataMaxPagesValue) {
                        document.querySelector('.course-list__footer').classList.add('course-list__footer_state-disabled');
                        document.querySelector('.course-list__more-btn').classList.add('course-list__more-btn_disabled');
                    }
                }
            });
        }
        if (target.matches('.course-list-item__select-name')) {
            (function () {
                const buttons = document.querySelectorAll('.course-list-item__select-name');
                const dropdowns = document.querySelectorAll('.dropdown');
                const activeClass = 'course-list-item__select-name_active';
                const openClass = 'dropdown_opened';

                if (target.classList.contains(activeClass)) {
                    target.classList.remove(activeClass)
                    target.nextElementSibling.classList.remove(openClass);
                } else {
                    removeClass(buttons, activeClass);
                    removeClass(dropdowns, openClass);
                    target.classList.add(activeClass);
                    target.nextElementSibling.classList.add(openClass);
                }
            })();
        }
        if (target.matches('.wpcf7 button[type="submit"]')) {
            (function () {
                defaultSubmitButtonText = target.textContent;
                const activeText = 'Отправляем...';
                const activeClass = 'btn_is-loading';
                target.classList.add(activeClass);
                target.textContent = activeText;
            })();
        }
        if (target.matches('.contact-page__info-item')) {
            const activeClass = 'contact-page__info-item_active';
            removeClass(contactPageItems, activeClass);
            target.classList.add(activeClass);
        }
        if (target.matches('.form__textarea-btn')) {
            (function () {
                const activeClass = 'form__textarea-btn_active';
                const disableClass = 'form__textarea_visibility-hide';

                target.classList.toggle(activeClass);
                target.nextElementSibling.lastElementChild.classList.toggle(disableClass);
            })();
        }
        if (target.matches('input[name="sale"]')) {
            if (target.checked) {
                changeInputPrice(paymentMethodIndex, true);
                return;
            }
            changeInputPrice(paymentMethodIndex);
        }
        if (target.matches('.payment-item__input')) {
            const index = +target.value;
            const paymentSections = document.querySelectorAll('.payment-section');

            paymentMethodIndex = index;

            for (let section of paymentSections) {
                section.style.display = 'none';
            }
            paymentSections[index].style.display = 'block';
            changeInputPrice(paymentMethodIndex);
            jQuery('body, html').animate({
                scrollTop: jQuery('#payment-anchor').offset().top
            }, 800);
        }
        if (target.matches('.content-list__more-btn')) {
            const icon = `
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z" fill="#211130" />
                </svg>`;
            const items = document.querySelectorAll('.faq__item:nth-child(n+7)');
            if (target.classList.contains('content-list__more-btn_opened')) {
                jQuery('html, body').animate({
                    scrollTop: jQuery('.faq__title').offset().top - 50
                }, 150);
                target.innerHTML = `Показать ещё ${icon}`;
                target.classList.remove('content-list__more-btn_opened');
                for (let item of items) {
                    item.style.display = 'none';
                }
                return;
            }
            target.innerHTML = `Скрыть ${icon}`;
            target.classList.add('content-list__more-btn_opened');
            for (let item of items) {
                item.style.display = 'block';
            }
        }
        if (target.matches('.portfolio__btn')) {
            const data = target.dataset.location;
            const pages = +target.dataset.maxPages;
            const icon = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z" fill="#211130"></path></svg>`;
            const activeTemplate = 'Загружаем...';
            const template = `Показать ещё${icon}`;
            const requestData = {
                url: ajax.url,
                type: 'POST',
                data: {
                    action: 'portfolio',
                    currentPage: currentPage,
                },
                beforeSend: function () {
                    document.querySelector('.portfolio').style.opacity = .7;
                    target.textContent = activeTemplate;
                },
                success: function (response) {
                    document.querySelector('.portfolio__list').insertAdjacentHTML('beforeEnd', response);
                    currentPage++;
                    if (currentPage === pages) {
                        target.classList.add('portfolio__btn_disabled');
                    }
                    document.querySelector('.portfolio').style.opacity = 1;
                    target.innerHTML = template;
                }
            }

            if (data === 'post') {
                const tag = target.dataset.postTag;
                requestData.data.action = data + '_portfolio';
                requestData.data.tag = tag;
            }
            jQuery.ajax(requestData);
            return;
        }
        if (target.matches('.webpay-form__btn')) {
            event.preventDefault();

            const buttonText = target.textContent;
            target.textContent = 'Проверяем...';
            target.style.opacity = .5;
            const form = target.closest('.form');
            const method = target.dataset.paymentMethod;
            const inputs = form.querySelectorAll('input[required]');
            const customer = (method === 'alfa') ? form.querySelector('input[name="name"]').value : form.querySelector('input[name="wsb_customer_name"]').value;
            let isValid;
            let ajaxData = {
                action: 'payment_' + method,
                totalPrice: totalPrice * 100,
                productName: current,
                customerName: customer
            }

            for (let input of inputs) {
                const value = input.value;
                const label = input.nextElementSibling.nextElementSibling;

                if (!value) {
                    input.classList.add('wpcf7-not-valid');
                    label.classList.add('form__error-label_active');
                    isValid = false;
                    setTimeout(() => {
                        target.textContent = buttonText;
                        target.style.opacity = 1;
                    }, 300);
                    return;
                } else {
                    input.classList.remove('wpcf7-not-valid');
                    label.classList.remove('form__error-label_active');
                    isValid = true;
                }
            }

            if (isValid) {
                inputs.forEach(item => {
                    const label = item.nextElementSibling.nextElementSibling;

                    item.classList.remove('wpcf7-not-valid');
                    label.classList.remove('form__error-label_active');
                });
                if (paymentMethodIndex !== 3) {
                    ajaxData.customerSaleType = saleType;
                    ajaxData.customerSaleValue = saleValue;
                }
                jQuery.ajax({
                    url: ajax.url,
                    type: 'POST',
                    dataType: 'json',
                    data: ajaxData,
                    beforeSend: function () {
                        target.style.opacity = .5;
                        target.textContent = 'Обрабатываем данные...';
                    },
                    success: function (response) {
                        //VK conversion
                        VK.Goal('purchase');
                        //Yandex conversion
                        ym(49171171, 'reachGoal', 'payment');
                        //Google conversion
                        gtag('event', 'conversion', {
                            'send_to': 'AW-795851636/iE7ACKPm0tMBEPT2vvsC'
                        });
                        gtag('event', 'success', {
                            'send_to': 'analytics',
                            'event_category': 'payment'
                        });

                        target.textContent = 'Перенаправляем на оплату...';
                        if (paymentMethodIndex === 3) {
                            setTimeout(function () {
                                document.location.replace(response.checkout.redirect_url);
                            }, 200);
                            return;
                        }
                        setTimeout(function () {
                            document.location.replace(response.formUrl);
                        }, 200);
                        return;
                    }
                });
            }
        }
    });

    //Events
    jQuery('.modal').on('modal:open', modalOpenHandler);
    jQuery('.video-modal').on('modal:after-close', videoModalCloseHandler);
    addCustomEventHandler('click', lecturersCollection, lecturerHandlerFunction);
    addCustomEventHandler('wpcf7invalid', wpcf7Collection, wpcf7InvalidHandler);
    addCustomEventHandler('wpcf7mailsent', wpcf7Collection, wpcf7SentHandler);
    addCustomEventHandler('click', navigationLinksCollection, pageNavigationLinkHandler);
    addCustomEventHandler('input', inputs, paymentInputsHandler);

    window.addEventListener('resize', () => {
        detectDeviceWidth();
        changeLayout();
    });
    window.addEventListener('scroll', () => {
        //Mobile menu button
        (function () {
            const button = document.querySelector('.m-options__menu-btn');
            const activeClass = 'm-options__menu-btn_active';

            if (button) {
                if (pageYOffset >= 900) {
                    button.classList.add(activeClass);
                    return;
                }
                button.classList.remove(activeClass);
            }
            return;
        })();
    });

    document.body.addEventListener('mouseover', (event) => {
        const target = event.target;
        if (target.closest('svg') && target.closest('svg').classList.contains('info__icon') && window.innerWidth > 991) {
            target.closest('svg').nextElementSibling.classList.add('info__content_opened');
        }
    });
    document.body.addEventListener('mouseout', (event) => {
        const target = event.target;
        if (target.closest('svg') && target.closest('svg').classList.contains('info__icon') && !event.relatedTarget.closest('svg') && window.innerWidth > 991) {
            target.closest('svg').nextElementSibling.classList.remove('info__content_opened');
        }
    });

    //Certificate
    (function () {
        const button = document.querySelector('.calculation__btn');
        const form = document.querySelector('#wpcf7-f1805-o1');
        const processMessage = 'Обрабатываем данные...';
        const transferMessage = 'Перенаправляем на оплату...';

        if (button) {
            const defaultText = button.textContent;
            requiredInputsCollection = button.closest('.form').querySelectorAll('input:required');
            button.addEventListener('click', function (event) {
                button.textContent = 'Отправляем...';
                button.classList.add('btn_is-loading');
                for (let input of requiredInputsCollection) {
                    let inputType = input.getAttribute('type');
                    if (inputType === 'tel') {
                        //Get input value and remove all non-digit symbols
                        let inputValue = input.value.replace(/\D/g, '');
                        if (input.value == '' || inputValue.length < 9) {
                            addErrorClass(input, input.closest('.form__input'));
                            // validation = false;
                            telInputValidation = false;
                        } else {
                            removeErrorClass(input, input.closest('.form__input'));
                            // validation = true;
                            telInputValidation = true;
                        }
                    }
                    if (inputType === 'email') {
                        if (input.value == '' || (input.value.indexOf('@') == -1)) {
                            addErrorClass(input, input.closest('.form__input'));
                            // validation = false;
                            emailInputValidation = false;
                        } else {
                            removeErrorClass(input, input.closest('.form__input'));
                            // validation = true;
                            emailInputValidation = true;
                        }
                    }
                    if (inputType === 'text') {
                        if (input.value == '') {
                            addErrorClass(input, input.parentElement);
                            // validation = false;
                            textInputValidation = false;
                        } else {
                            removeErrorClass(input, input.parentElement);
                            // validation = true;
                            textInputValidation = true;
                        }
                    }
                }
                //Get select data
                let deliveryValue = +deliveryElement.value;
                if (deliveryValue === 0) {
                    addErrorClass(deliveryElement, deliveryElement.parentElement);
                    selectValidation = false;
                    // validation = false
                } else if (deliveryValue === 1) {
                    deliveryElement.classList.remove('wpcf7-not-valid');
                    deliveryElement.parentElement.querySelector('.form__error-label').classList.remove('form__error-label_active');
                    let deliveryAddressElement = deliveryElement.parentElement.nextElementSibling.querySelector('input');
                    let deliveryAddress = deliveryAddressElement.value;
                    if (deliveryAddress === '') {
                        addErrorClass(deliveryAddressElement, deliveryAddressElement.parentElement);
                        // validation = false;
                        selectValidation = false;
                    } else {
                        removeErrorClass(deliveryAddressElement, deliveryAddressElement.parentElement);
                        // validation = true;
                        selectValidation = true;
                    }
                } else {
                    removeErrorClass(deliveryElement, deliveryElement.parentElement);
                    // validation = true;
                    selectValidation = true;
                }
                //Send form
                if (telInputValidation && emailInputValidation && textInputValidation && selectValidation) {
                    //Create payment object
                    certificatePaymentObject = {
                        action: 'payment_alfa',
                        orderAmount: +jQuery('input[name="total"]').val() * 100,
                        orderTitle: jQuery('.ums-select__btn').text(),
                        customerName: jQuery('input[name="name"]').val(),
                        customerSaleType: 'Без скидки',
                        customerSaleValue: 0
                    }
                    if (document.querySelector('.promocode-input').classList.contains('promocode-input_state-success')) {
                        certificatePaymentObject.customerSaleType = 'Промокод';
                        certificatePaymentObject.customerSaleValue = 10;
                    }
                    //Fill hidden fields with data
                    jQuery(certificateForm).find('input[name="ums-course"]').val(jQuery('.ums-select__btn').text());
                    jQuery(certificateForm).find('input[name="ums-price"]').val(jQuery('input[name="total"]').val());
                    jQuery(certificateForm).find('input[name="ums-name"]').val(jQuery('input[name="name"]').val());
                    jQuery(certificateForm).find('input[name="ums-email"]').val(jQuery('input[name="email"]').val());
                    jQuery(certificateForm).find('input[name="ums-tel"]').val(jQuery('input[name="tel"]').val());
                    jQuery(certificateForm).find('input[name="ums-delivery"]').val(jQuery('select[name="delivery"] option:selected').text() + ', ' + jQuery('input[name="delivery-address"]').val());
                    jQuery(certificateForm).find('form').trigger('submit');
                } else {
                    setTimeout(function () {
                        button.classList.remove('btn_is-loading');
                        button.textContent = defaultText;
                    }, 300);
                }
            });

            form.addEventListener('wpcf7mailsent', () => {
                button.textContent = processMessage;
                jQuery.ajax({
                    url: ajax.url,
                    method: 'POST',
                    data: certificatePaymentObject,
                    success: function (resp) {
                        button.textContent = transferMessage;
                        setTimeout(function () {
                            document.location.replace(JSON.parse(resp).formUrl);
                        }, 300);
                    }
                });
            });
            form.addEventListener('wpcf7invalid', () => {
                button.classList.remove('btn_is-loading');
                button.textContent = defaultText;
            });
        }
    })();

    //Promocode
    (function () {
        //Promocode
        const toggleInput = document.querySelector('.toggle-checkbox__input');
        const processMessage = 'Проверяем...';
        const classes = {
            active: 'promocode-input_state-active',
            progress: 'promocode-input_state-progress',
            success: 'promocode-input_state-success',
            error: 'promocode-input_state-error'
        };
        const data = {
            action: 'promocode'
        };

        if (toggleInput) {
            const el = document.querySelector('.promocode-input');
            const button = el.querySelector('.promocode-input__btn');
            const input = el.querySelector('input');

            toggleInput.addEventListener('click', () => {
                input.value = '';
                el.classList.remove(classes.success);
                el.classList.remove(classes.error);
                el.classList.toggle(classes.active);
                el.classList.remove('form__input_filled');
                el.querySelector('.form__error-label').classList.remove('form__error-label_active');
                el.querySelector('.form__label').classList.remove('form__label_active');
                if (dropdownType === 'payment') {
                    el.closest('.payment-form__section-grid').querySelector('.webpay-form__sale-checkbox').querySelector('input').checked = false;
                    el.closest('.payment-form__section-grid').querySelector('.webpay-form__sale-checkbox').classList.toggle('webpay-form__sale-checkbox_state-disabled');
                }
                changeInputPrice(paymentMethodIndex, false, false);
            });

            button.addEventListener('click', () => {
                const defaultButtonText = button.textContent;
                const value = input.value;
                button.textContent = processMessage;
                el.classList.add(classes.progress);
                fetch(ajax.url, {
                        method: 'POST',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        body: new URLSearchParams(data)
                    })
                    .then((resp) => resp.json())
                    .then((data) => {
                        button.textContent = defaultButtonText;
                        el.classList.remove(classes.progress);
                        if (data.length) {
                            const result = data.find((item) => item.name.toUpperCase() === value.toUpperCase());
                            if (result) {
                                changeInputPrice(paymentMethodIndex, false, true);
                                showPromocodeMessage(el, 'success');
                            } else {
                                showPromocodeMessage(el, 'error');
                                changeInputPrice(paymentMethodIndex, false, false);
                            }
                        } else {
                            showPromocodeMessage(el, 'error');
                            changeInputPrice(paymentMethodIndex, false, false);
                        }
                    });
            });
        }
    })();

    //Custom select
    (function () {
        const el = document.querySelector('.ums-select');

        if (el) {
            const items = el.querySelectorAll('.ums-select__list-item');
            current = el.querySelector('button').textContent;
            price = el.querySelector('button').dataset.price;
            dropdownType = el.dataset.type;

            if (dropdownType === 'payment') {
                salePrice = el.querySelector('button').dataset.salePrice;
                totalPrice = salePrice;
            } else {
                totalPrice = price;
            }

            el.addEventListener('click', (event) => {
                const target = event.target;
                let targetSalePrice, targetPrice;

                if (target.matches('button')) {
                    target.classList.toggle('ums-select__btn_state-active');
                    target.closest('.form__select').classList.toggle('form__select_state-active');
                    target.nextElementSibling.classList.toggle('ums-select__list_visibility-open');
                }
                if (target.matches('li') && !target.classList.contains('ums-select__list-item_state-active')) {
                    removeClass(items, 'ums-select__list-item_state-active');
                    target.classList.add('ums-select__list-item_state-active');

                    if (target.textContent === 'Оплата второго этапа действующего курса') {
                        paymentMethodIndex = 0;
                        jQuery('.payment-item').css('display', 'none');
                        jQuery('.payment-item:nth-child(1)').css('display', 'block');
                        jQuery('.payment-section').css('display', 'none');
                        jQuery('.payment-section:nth-child(1)').css('display', 'block');
                        jQuery('.payment-item:nth-child(1) input').prop('checked', true);
                        jQuery('.webpay-form').prev().css('display', 'block');
                        jQuery('.webpay-form__sale-checkbox').css('display', 'none');
                    } else {
                        jQuery('.payment-item').css('display', 'block');
                        jQuery('.webpay-form__sale-checkbox').css('display', 'inline-block');
                    }

                    if (dropdownType === 'payment') {
                        targetSalePrice = target.dataset.salePrice;
                        targetPrice = target.dataset.price;
                        const saleInputs = document.querySelectorAll('input[name="sale"]');
                        target.closest('.ums-select__list').previousElementSibling.dataset.salePrice = targetSalePrice;
                        for (let input of saleInputs) {
                            input.checked = false;
                        }
                    } else {
                        targetPrice = target.dataset.price;
                    }

                    target.closest('.form__select').classList.toggle('form__select_state-active');
                    target.closest('.ums-select__list').previousElementSibling.dataset.price = targetPrice;
                    target.closest('.ums-select__list').previousElementSibling.textContent = target.textContent;
                    target.closest('.ums-select__list').previousElementSibling.classList.remove('ums-select__btn_state-active');
                    target.closest('.ums-select__list').classList.remove('ums-select__list_visibility-open');
                    current = target.textContent;
                    price = targetPrice;
                    salePrice = targetSalePrice;
                    //Update the price
                    changeInputPrice(paymentMethodIndex);
                }
            });
        }
    })();

    //International telephone input
    (function () {
        const utilsPath = 'https://ux-school.by/wp-content/themes/ux-mind-school/js/utils.js';
        const inputs = document.querySelectorAll("input[type='tel']");

        if (inputs) {
            for (let input of inputs) {
                window.intlTelInput(input, {
                    nationalMode: true,
                    autoHideDialCode: false,
                    autoPlaceholder: 'aggressive',
                    separateDialCode: true,
                    preferredCountries: ['by', 'ru', 'ua'],
                    initialCountry: 'auto',
                    geoIpLookup: function (success, failure) {
                        const date = new Date();
                        const dateString = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                        const localStorageData = JSON.parse(localStorage.getItem('ums-country-code'));
                        if (localStorageData) {
                            if (localStorageData.date != dateString) {
                                jQuery.when(getCustomerIpInfo()).then((resp) => {
                                    if (resp) {
                                        success(resp.country);
                                        localStorage.setItem('ums-country-code', JSON.stringify({
                                            date: dateString,
                                            value: resp.country
                                        }));
                                    } else {
                                        failure(resp.country);
                                    }
                                });
                            } else {
                                success(localStorageData.value);
                            }
                        } else {
                            jQuery.when(getCustomerIpInfo()).then((resp) => {
                                if (resp) {
                                    success(resp.country);
                                    localStorage.setItem('ums-country-code', JSON.stringify({
                                        date: dateString,
                                        value: resp.country
                                    }));
                                } else {
                                    failure(resp.country);
                                }
                            });
                        }
                    },
                    utilsScript: utilsPath,
                    customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
                        const customPlaceholder = selectedCountryPlaceholder.replace(/[0-9]/g, '_');
                        const customMask = selectedCountryPlaceholder.replace(/[0-9]/g, 9);
                        const customMaskObject = new Inputmask(customMask, {
                            showMaskOnHover: false,
                            greedy: false
                        });
                        customMaskObject.mask(input);
                        return customPlaceholder;
                    }
                });
                input.addEventListener("countrychange", (event) => {
                    const target = event.target;
                    const el = target.closest('form') ? 'form' : '.form';
                    const instance = window.intlTelInputGlobals.getInstance(target);
                    const codeInput = target.closest(el).querySelector('input[name="ums-country-code"]');
                    codeInput.value = '+' + instance.s.dialCode;
                });
            }
        }
    })();

    function addErrorClass(inputElement, errorTextElement) {
        inputElement.classList.add('wpcf7-not-valid');
        errorTextElement.querySelector('.form__error-label').classList.add('form__error-label_active');
    }

    function removeErrorClass(inputElement, errorTextElement) {
        inputElement.classList.remove('wpcf7-not-valid');
        errorTextElement.querySelector('.form__error-label').classList.remove('form__error-label_active');
    }

    function changeInputPrice(index, sale, promocode) {
        switch (index) {
            case 0:
                if (sale) {
                    totalPrice = salePrice - (salePrice * .1);
                    saleType = 'Я студент-очник / я раньше уже учился у вас';
                    saleValue = 10;
                } else if (promocode) {
                    if (dropdownType === 'payment') {
                        totalPrice = salePrice - 50;
                        //                      totalPrice = salePrice - (salePrice * (+promocode.value / 100));
                        saleType = 'Промокод ' + promocode.name;
                        saleValue = promocode.value
                    } else if (dropdownType === 'certificate') {
                        totalPrice = price - 50;
                        //                      totalPrice = price - (price * (+promocode.value / 100));
                        saleType = 'Промокод ' + promocode.name;
                        saleValue = promocode.value
                    }
                } else {
                    if (dropdownType === 'payment') {
                        totalPrice = salePrice;
                        saleType = 'Без скидки';
                        saleValue = 0;
                    } else if (dropdownType === 'certificate') {
                        totalPrice = price;
                        saleType = 'Без скидки';
                        saleValue = 0;
                    }
                }
                break;
            case 2:
                if (sale) {
                    totalPrice = Math.round(salePrice / 2 - salePrice / 2 * .1);
                    saleType = 'Я студент-очник / я раньше уже учился у вас';
                    saleValue = 10;
                } else {
                    totalPrice = salePrice / 2;
                    saleType = 'Без скидки';
                    saleValue = 0;
                }
                break;
            case 3:
                totalPrice = salePrice;
                break;
        }
        changeCurenciesPrice(paymentMethodIndex);
        if (dropdownType === 'payment') {
            let totalInputElement = jQuery('.payment-section').eq(index).find('input[name="wsb_total"]');
            totalInputElementName = totalInputElement.length ? 'input[name="wsb_total"]' : 'input[name="total"]';
            jQuery('.payment-section').eq(index).find(totalInputElementName).val(totalPrice);
            jQuery('.payment-section').eq(index).find(totalInputElementName).next().addClass('form__label_active').parent().addClass('form__input_filled');
        } else if (dropdownType === 'certificate') {
            let totalInputElement = document.querySelector('input[name="total"]');
            totalInputElement.value = totalPrice;
            totalInputElement.nextElementSibling.classList.add('form__label_active');
            totalInputElement.parentElement.classList.add('form__input_filled');
        }
    }

    function changeCurenciesPrice(index) {
        let totalPriceInUsd = (totalPrice / rates.usd).toFixed(0);
        let totalPriceInRub = (totalPrice / (rates.rub / 100)).toFixed(0);
        let currenciesPriceTemplate = `
                <p class="ums-currency__value ums-currency__symbol">BYN</p>
                <p class="ums-currency__value ums-currency__value_color-gray icon-currency icon-dollar_color-gray">&nbsp;≈&nbsp;${totalPriceInUsd}</p>
                <p class="ums-currency__value ums-currency__value_color-gray icon-currency icon-ruble_color-gray">&nbsp;≈&nbsp;${totalPriceInRub}</p>`;
        if (dropdownType === 'payment') {
            jQuery('.payment-section').eq(index).find('.ums-currency').html(currenciesPriceTemplate);
        } else if (dropdownType === 'certificate') {
            document.querySelector('.ums-currency').innerHTML = currenciesPriceTemplate;
        }
    }

    function showPromocodeMessage(el, state) {
        if (state == 'success') {
            el.classList.remove('promocode-input_state-error');
            el.querySelector('.form__error-label').textContent = 'Промокод успешно применен';
        } else {
            el.classList.remove('promocode-input_state-success');
            el.querySelector('.form__error-label').textContent = 'Недействительный промокод';
        }
        el.classList.add('promocode-input_state-' + state);
        el.querySelector('.form__error-label').classList.add('form__error-label_active');
    }

    function initSwiperSlider(element) {
        if (jQuery(element).length !== 0) {
            jQuery(element).addClass('swiper-container');
            jQuery(element).children().addClass('swiper-slide').wrapAll('<div class="swiper-wrapper"/>');
            customSwiper = new Swiper(element, {
                slidesPerView: 'auto',
                freeMode: true,
                freeModeMomentum: false
            });
        }
    }

    function destroySwiperSlider(element) {
        if (customSwiper) {
            customSwiper.destroy();
            jQuery(element).removeClass('swiper-container');
            jQuery(element).children().children().removeClass('swiper-slide').unwrap();
        }
    }

    function detectDeviceWidth() {
        if (window.innerWidth < 992) {
            isMobile = true;
            isTablet = false;
        } else if (window.innerWidth > 991 && window.innerWidth < 1229) {
            isTablet = true;
            isMobile = false;
        } else if (window.innerWidth > 1229) {
            isTablet = false;
            isMobile = false
        }
    }

    function destroyMobileMenu() {
        jQuery('.header__info').append(jQuery('.header__menu'));
        jQuery('.header__info').append(jQuery('.header__phone-number'));
        jQuery('.header .col-3').append(jQuery('.header__select'));
    }

    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    function changeElementText(element, text) {
        const el = document.querySelector(element);
        if (el) {
            el.textContent = text;
        }
        return;
    }

    function changeLayout() {
        if (isMobile && !isCompleted) {
            // jQuery('.m-menu__grid').append(jQuery('.header__select'));
            // jQuery('.m-menu__grid').append(jQuery('.header__menu'));
            // jQuery('.m-menu__footer').prepend(jQuery('.header__phone-number'));
            changeElementText('.about-video__text', 'О школе');
            changeElementText('.portfolio__title', 'Работы учеников');
            changeElementText('.social-testimonials__name', 'Больше отзывов:');
            changeElementText('.play-button__name-js', 'О курсе');
            changeElementText('.form__textarea-btn-name', 'Комментарий');
            jQuery('.about-course__title').after(jQuery('.about-course__author'));
            jQuery('.about-course__title').after(jQuery('.about-course__video'));
            jQuery('.lecturer-modal__grid').after(jQuery('.lecturer-modal__text'));
            jQuery('.lecturer-modal__img img').after(jQuery('.lecturer-modal__title'));
            jQuery('.footer-menu').after(jQuery('.google-testimonials'));
            if (!isCustomSwiperInit) {
                initSwiperSlider('.tabs');
                isCustomSwiperInit = true;
            }
            // destroyWeCarousel();
            isCompleted = true;
        } else if (!isMobile && isCompleted) {
            destroyMobileMenu();
            changeElementText('.about-video__text', 'Видео о школе');
            changeElementText('.portfolio__title', 'Работы выпускников');
            changeElementText('.social-testimonials__name', 'А еще о нас много отзывов на:');
            changeElementText('.form__textarea-btn-name', 'Добавить комментарий');
            jQuery('.about-course .col-lg-7').append(jQuery('.about-course__video'));
            jQuery('.about-course .col-lg-7').append(jQuery('.about-course__author'));
            jQuery('.lecturer-modal__info').append(jQuery('.lecturer-modal__title'));
            jQuery('.lecturer-modal__info').append(jQuery('.lecturer-modal__text'));
            jQuery('.footer__logo').after(jQuery('.google-testimonials'));
            changeElementText('.play-button__name-js', 'Видео о курсе');
            if (isCustomSwiperInit) {
                destroySwiperSlider('.tabs');
                isCustomSwiperInit = false;
            }
            // initWeCarousel();
            isCompleted = false;
        } else if (isTablet && !isCustomSwiperInit) {
            initSwiperSlider('.tabs');
            isCustomSwiperInit = true;
        } else if (!isTablet && !isMobile && isCustomSwiperInit) {
            destroySwiperSlider('.tabs');
            isCustomSwiperInit = false;
        }
    }

    function getTeamLecturerInfo(lecturerIdValue, clickedElement) {
        return jQuery.ajax({
            url: ajax.url,
            type: 'POST',
            data: {
                action: 'team',
                id: lecturerIdValue
            },
            beforeSend: function () {
                clickedElement.style.opacity = .3;
            }
        });
    }

    function getLecturerInfo(lecturerIdValue, clickedElement) {
        return jQuery.ajax({
            url: ajax.url,
            type: 'POST',
            data: {
                action: 'lecturer',
                id: lecturerIdValue
            },
            beforeSend: function () {
                clickedElement.style.opacity = .3;
            }
        });
    }

    function sendCustomerToSendPulse(customerEmail, addressBookId) {
        return jQuery.ajax({
            url: ajax.url,
            method: 'POST',
            data: {
                action: 'add_to_book',
                id: addressBookId,
                email: customerEmail
            }
        });
    }

    function getPriceInCurrency(element, currency, value) {
        return jQuery.ajax({
            url: ajax.url,
            method: 'POST',
            data: {
                action: 'currency',
                currency: currency,
                price: value
            },
            beforeSend: function () {
                element.textContent = 'Загрузка...';
            }
        });
    }

    function sendGoogleConversion(baseURI) {
        if (baseURI.indexOf('motion')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/jzVICKfr8tMBEPT2vvsC'
            });
        }
        if (baseURI.indexOf('mobile')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/7JsCCNPR0tMBEPT2vvsC'
            });
        }
        if (baseURI.indexOf('web')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/k3eACIr30tMBEPT2vvsC'
            });
        }
        if (baseURI.indexOf('start')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/nx6iCJry0tMBEPT2vvsC'
            });
        }
        if (baseURI.indexOf('interior')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/sJ7ECMrM5NMBEPT2vvsC'
            });
        }
        if (baseURI.indexOf('oplatit-kurs')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/iE7ACKPm0tMBEPT2vvsC'
            });
        }
        return;
    }

    function getCustomerIpInfo() {
        return jQuery.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
            (resp && resp.country) ? resp.country: "";
        });
    }

    function initWeCarousel() {
        const carousel = document.querySelector('.we__carousel');
        if (carousel) {
            weCarousel = new Swiper(carousel, {
                slidesPerView: 4,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000
                },
                navigation: {
                    nextEl: '.we__btn-next',
                    prevEl: '.we__btn-prev',
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        pagination: {
                            el: '.we__pagination',
                            type: 'bullets'
                        }
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                        pagination: {
                            el: null
                        }
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1230: {
                        slidesPerView: 4
                    }
                }
            });
        }
        return;
    }

    function destroyWeCarousel() {
        const carousel = document.querySelector('.we__carousel');
        if (carousel) {
            weCarousel.destroy();
        }
        return;
    }

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options = {}) {
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }

    function showPopup() {
        const modal = jQuery('#event-modal');
        const cookieData = {
            path: '/',
            secure: true,
            'max-age': 3600
        };
        if (modal) {
            const cookie = getCookie('event');
            if (!cookie) {
                setCookie('event', 'true', cookieData);
                setTimeout(function () {
                    modal.modal({
                        fadeDuration: 300
                    });
                }, 8000);
            }
        }
        return;
    }

    function initSwiperInstance() {
        umsTestimonialsCarousel = new Swiper('.testimonials__carousel', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            autoplay: {
                delay: 5000
            },
            navigation: {
                nextEl: '.testimonials__btn-next',
                prevEl: '.testimonials__btn-prev',
            },
            pagination: {
                el: '.testimonials__pagination',
                type: 'bullets',
                clickable: true
            }
        });
        umsGraduatesCarousel = new Swiper('.graduates__carousel', {
            slidesPerView: 8,
            spaceBetween: 25,
            loop: true,
            centeredSlides: true,
            autoplay: {
                delay: 3000
            },
            breakpoints: {
                360: {
                    slidesPerView: 2
                },
                480: {
                    slidesPerView: 3
                },
                576: {
                    slidesPerView: 4
                },
                768: {
                    slidesPerView: 5
                },
                992: {
                    slidesPerView: 6
                },
                1200: {
                    slidesPerView: 8
                }
            }
        });
    }

    function handleSelect(e) {
        let target = e.target;
        let targetName = target.name;
        let targetValue = target.value;
        switch (targetName) {
            case 'test-course-date':
                document.querySelector('input[name="ums-date"]').value = targetValue;
                break;
            case 'timetable':
                document.location.replace(targetValue);
                break;
            case 'delivery':
                if (+targetValue === 1) {
                    target.parentElement.nextElementSibling.classList.add('delivery-input_state-active');
                }
                if (+targetValue === 0) {
                    target.parentElement.classList.remove('form__select_state-active');
                    target.nextElementSibling.classList.remove('form__label_active');
                } else {
                    target.parentElement.nextElementSibling.classList.remove('delivery-input_state-active');
                    target.parentElement.classList.add('form__select_state-active');
                    target.nextElementSibling.classList.add('form__label_active');
                }
                break;
        }
    }

    function initSelectListener() {
        umsSelectCollection = document.querySelectorAll('select');
        for (let select of umsSelectCollection) {
            select.addEventListener('change', handleSelect, false);
        }
    }

    function initInputListener() {
        const inputs = document.querySelectorAll('.form__input input, .form__input textarea');

        for (let input of inputs) {
            const wrapper = input.closest('.form__input');

            if (input.name !== 'ums-tel') {
                if (input.value !== '') {
                    wrapper.classList.add('form__input_filled');
                    wrapper.querySelector('.form__label').classList.add('form__label_active');
                }
                input.addEventListener('focus', () => {
                    wrapper.classList.add('form__input_focused');
                    wrapper.classList.add('form__input_filled');
                    wrapper.querySelector('.form__label').classList.add('form__label_active');
                });
                input.addEventListener('blur', () => {
                    if (input.value !== '') {
                        wrapper.classList.remove('form__input_focused');
                        return;
                    }
                    wrapper.classList.remove('form__input_filled');
                    wrapper.classList.remove('form__input_focused');
                    wrapper.querySelector('.form__label').classList.remove('form__label_active');
                });
            }
        }
    }

    function sendDataToCRM(crmData, action) {
        return jQuery.ajax({
            url: ajax.url,
            type: 'POST',
            data: {
                action: `amo_crm_${action}`,
                data: crmData
            }
        });
    }

    function removeClass(htmlCollection, className) {
        for (let item of htmlCollection) {
            item.classList.remove(className);
        }
        return;
    }

    function modalOpenHandler(event) {
        const modal = event.target;
        const input = modal.querySelector('input[type="tel"]');
        if (input) {
            const code = modal.querySelector('.iti__selected-dial-code').textContent;
            const hiddenInput = modal.querySelector('input[name="ums-country-code"]');
            if (hiddenInput) {
                hiddenInput.value = code;
            }
        }
    }

    function videoModalCloseHandler(event) {
        const modal = event.target;
        modal.querySelector('iframe').setAttribute('src', '');
        return;
    }

    function lecturerHandlerFunction(e) {
        const target = e.target.closest('.lecturers-page__item');
        const id = target.dataset.lecturerPostId;
        jQuery.when(getTeamLecturerInfo(id, target)).then((response) => {
            target.style.opacity = 1;
            document.querySelector('.ajax-lecturer-modal').innerHTML = response;
            if (window.innerWidth < 992) {
                jQuery('.ajax-lecturer-modal .lecturer-modal__img img').after(jQuery('.ajax-lecturer-modal .modal__title'));
                jQuery('.ajax-lecturer-modal').append(jQuery('.ajax-lecturer-modal .lecturer-modal__text'));
            }
            jQuery('.ajax-lecturer-modal').modal();
        });
    }

    function addCustomEventHandler(event, collection, handlerFunction) {
        for (let el of collection) {
            el.addEventListener(event, handlerFunction);
        }
        return;
    }

    function wpcf7InvalidHandler(event) {
        const target = event.target;
        const button = target.querySelector('button[type="submit"]');

        button.textContent = defaultSubmitButtonText;
        button.classList.remove('btn_is-loading');
    }

    function wpcf7SentHandler(event) {
        const target = event.target;
        const id = +event.detail.contactFormId;
        const uri = event.target.baseURI;
        const inputs = event.detail.inputs;
        const button = target.querySelector('button[type="submit"]');
        let crmData;

        switch (id) {
            case 131:
                //VK Conversion
                VK.Goal('lead');
                //Google conversion
                sendGoogleConversion(uri);
                gtag('event', 'click', {
                    'send_to': 'analytics',
                    'event_category': 'button'
                });
                //Yandex conversion
                ym(49171171, 'reachGoal', 'lead_form');
                //Send to CRM
                crmData = {
                    title: inputs[4].value + ', ' + inputs[13].value,
                    price: +inputs[5].value,
                    name: inputs[0].value,
                    type: inputs[6].value,
                    time: inputs[7].value,
                    date: +inputs[8].value,
                    address: inputs[9].value,
                    lecturer: inputs[10].value,
                    statusId: +inputs[11].value,
                    customer: {
                        name: inputs[13].value,
                        email: inputs[15].value,
                        telephone: (inputs[3].value + inputs[14].value).replace(/[^0-9.]/g, "")
                    },
                    tag: {
                        value: inputs[12].value
                    }
                };
                jQuery.when(sendDataToCRM(crmData, 'lead')).then(function (data) {
                    console.log(JSON.parse(data));
                });
                //Close modal
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-first').modal();
                break;
            case 837:
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-first').modal();
                break;
            case 859:
                crmData = {
                    name: inputs[14].value,
                    customer: {
                        email: inputs[16].value,
                        telephone: (inputs[4].value + inputs[15].value).replace(/[^0-9.]/g, "")
                    },
                    intensive: {
                        name: inputs[5].value,
                        timestamp: +inputs[9].value
                    },
                    tag: {
                        name: 'Интенсив',
                        value: inputs[12].value
                    }
                };
                jQuery.when(sendDataToCRM(crmData, 'intensive')).then(function (data) {
                    console.log(JSON.parse(data));
                });
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-first').modal();
                break;
            case 1447:
                crmData = {
                    customer: {
                        name: inputs[1].value,
                        email: inputs[3].value,
                        telephone: (inputs[0].value + ' ' + inputs[2].value).replace(/[^0-9.]/g, "")
                    },
                    tag: {
                        name: 'Начни учиться бесплатно'
                    }
                }
                jQuery.when(sendDataToCRM(crmData, 'free')).then(function (data) {
                    console.log(JSON.parse(data));
                });
                jQuery.when(sendCustomerToSendPulse(inputs[3].value, 89064264)).then((resp) => {
                    let respObject = JSON.parse(resp);
                    if (respObject.result) {
                        //VK Conversion
                        VK.Goal('conversion');
                        //Yandex conversion
                        ym(49171171, 'reachGoal', 'freelessons');
                        //Google conversion
                        gtag('event', 'click', {
                            'send_to': 'analytics',
                            'event_category': 'freelessons'
                        });
                        target.querySelector('.form__input').classList.remove('form__input_filled');
                        target.querySelector('.form__label').classList.remove('form__label_active');
                        button.textContent = defaultSubmitButtonText;
                        button.classList.remove('btn_is-loading');
                        jQuery.modal.close();
                        jQuery('#success-modal-free-start').modal();
                    }
                });
                break;
            case 1655:
                jQuery.when(sendCustomerToSendPulse(inputs[1].value, 89064300)).then((resp) => {
                    let respObject = JSON.parse(resp);
                    if (respObject.result) {
                        target.querySelector('.form__input').classList.remove('form__input_filled');
                        target.querySelector('.form__label').classList.remove('form__label_active');
                        button.textContent = defaultSubmitButtonText;
                        button.classList.remove('btn_is-loading');
                        jQuery.modal.close();
                        jQuery('#success-modal-test').modal();
                    }
                });
                break;
            case 1628:
                jQuery.when(sendCustomerToSendPulse(inputs[0].value, 89086955)).then((resp) => {
                    let respObject = JSON.parse(resp);
                    if (respObject.result) {
                        //VK Conversion
                        VK.Goal('subscribe');
                        //Google conversion
                        gtag('event', 'click', {
                            'send_to': 'analytics',
                            'event_category': 'emailbutton'
                        });
                        //Yandex conversion
                        ym(49171171, 'reachGoal', 'emailsub');
                        target.querySelector('.form__input').classList.remove('form__input_filled');
                        target.querySelector('.form__label').classList.remove('form__label_active');
                        button.textContent = defaultSubmitButtonText;
                        button.classList.remove('btn_is-loading');
                        jQuery('#success-modal-third').modal();
                    }
                });
                break;
            case 779:
                //VK conversion
                VK.Goal('contact');
                crmData = {
                    customer: {
                        name: inputs[1].value,
                        telephone: (inputs[0].value + ' ' + inputs[2].value).replace(/[^0-9.]/g, ""),
                        email: inputs[3].value,
                        message: inputs[4].value
                    },
                    tag: {
                        name: 'Обратный звонок'
                    }
                }
                jQuery.when(sendDataToCRM(crmData, 'call')).then(function (data) {
                    console.log(JSON.parse(data));
                });
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-second').modal();
                break;
            case 1839:
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-first').modal();
                break;
            case 1805:
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-second').modal();
                break;
        }
    }

    function pageNavigationLinkHandler(event) {
        const target = event.target;
        const activeClass = 'page-navigation__link_state-active';

        removeClass(pageNavigationLinksCollection, activeClass);
        target.classList.add(activeClass);
        return;
    }

    function initCourseGallery() {
        const el = document.querySelector('.course-gallery__grid');

        if (el) {
            new Swiper(el, {
                slidesPerView: 5,
                loop: true,
                autoplay: {
                    delay: 3000
                },
                navigation: {
                    prevEl: '.course-gallery__btn-prev',
                    nextEl: '.course-gallery__btn-next'
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    576: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 3
                    },
                    992: {
                        slidesPerView: 5
                    }
                }
            });
        }
        return;
    }

    function paymentInputsHandler(event) {
        const target = event.target;
        const targetName = target.name;

        if (targetName === 'total' || targetName === 'wsb_total') {
            const saleInput = target.closest('.form').querySelector('input[name="sale"]');
            if (saleInput) {
                saleInput.checked = false;
            }
            totalPrice = target.value;
            changeCurenciesPrice(paymentMethodIndex);
        }

        return;
    }
});