'use strict';

function addErrorClass(inputElement, errorTextElement) {
    inputElement.classList.add('wpcf7-not-valid');
    errorTextElement.querySelector('.form__error-label').classList.add('form__error-label_active');
}
function removeErrorClass(inputElement, errorTextElement) {
    inputElement.classList.remove('wpcf7-not-valid');
    errorTextElement.querySelector('.form__error-label').classList.remove('form__error-label_active');
}
function detectDeviceWidth() {
    if (window.innerWidth < 992) {
        isMobile = true;
        return;
    }
    isMobile = false;
}
function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}
function changeLayout() {
    detectDeviceWidth();
    if (isMobile && !isCompleted) {
        jQuery('.about-course__title').after(jQuery('.about-course__author'));
        jQuery('.about-course__title').after(jQuery('.about-course__video'));
        jQuery('.lecturer-modal__grid').after(jQuery('.lecturer-modal__text'));
        jQuery('.lecturer-modal__img img').after(jQuery('.lecturer-modal__title'));
        jQuery('.footer-menu').after(jQuery('.google-testimonials'));
        isCompleted = true;
    } else if (!isMobile && isCompleted) {
        jQuery('.about-course .col-lg-7').append(jQuery('.about-course__video'));
        jQuery('.about-course .col-lg-7').append(jQuery('.about-course__author'));
        jQuery('.lecturer-modal__info').append(jQuery('.lecturer-modal__title'));
        jQuery('.lecturer-modal__info').append(jQuery('.lecturer-modal__text'));
        jQuery('.footer__logo').after(jQuery('.google-testimonials'));
        isCompleted = false;
    }
}
function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
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
            }, 25000);
        }
    }
}
function handleSelect(evt) {
    const target = evt.target;
    const targetName = target.name;
    const targetValue = target.value;

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
function initInputListener() {
    const inputs = document.querySelectorAll('.form__input input, .form__input textarea');

    for (const input of inputs) {
        const wrapper = input.closest('.form__input');
        const label = wrapper.querySelector('.form__label');

        if (input.value !== '') {
            wrapper.classList.add('form__input_filled');
            if (label) {
                label.classList.add('form__label_active');
            }
        }
        input.addEventListener('focus', () => {
            wrapper.classList.add('form__input_focused');
            wrapper.classList.add('form__input_filled');
            if (label) {
                label.classList.add('form__label_active');
            }
        });
        input.addEventListener('blur', () => {
            if (input.value !== '') {
                wrapper.classList.remove('form__input_focused');
                return;
            }
            wrapper.classList.remove('form__input_filled');
            wrapper.classList.remove('form__input_focused');
            if (label) {
                label.classList.remove('form__label_active');
            }
        });
    }
}
function videoModalCloseHandler(event) {
    const modal = event.target;
    modal.querySelector('iframe').setAttribute('src', '');
}
function lecturerHandlerFunction(evt) {
    const target = evt.target.closest('.lecturers-page__item');
    const id = target.dataset.lecturerPostId;
    const data = {
        action: 'team',
        id: id
    }
    const beforeSendHandler = function () {
        target.style.opacity = .3;
    }

    jQuery.when(window.utils.ajaxRequest(data, beforeSendHandler, target)).then((response) => {
        target.style.opacity = 1;
        document.querySelector('.ajax-lecturer-modal').innerHTML = '';
        document.querySelector('.ajax-lecturer-modal').insertAdjacentHTML('afterBegin', response);
        if (window.innerWidth < 992) {
            jQuery('.ajax-lecturer-modal .lecturer-modal__img img').after(jQuery('.ajax-lecturer-modal .modal__title'));
            jQuery('.ajax-lecturer-modal').append(jQuery('.ajax-lecturer-modal .lecturer-modal__text'));
        }
        jQuery('.ajax-lecturer-modal').modal();
    }, error => console.log(new Error(error)));
}
function addCustomEventHandler(event, collection, handlerFunction) {
    for (const el of collection) {
        el.addEventListener(event, handlerFunction);
    }
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
    let requestData, crmObject;
    let sendPulseData;

    switch (id) {
        case 131:
            // Yandex conversion
            ym(49171171, 'reachGoal', 'lead_form');
            //Send to CRM
            crmObject = new amoCRMInsance(131, inputs, 'lead');
            requestData = crmObject.getRequestObject();
            jQuery.when(window.utils.ajaxRequest(requestData)).then(() => {
                //Close modal
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-first').modal();
            }, error => console.log(new Error(error)));
            break;
        case 837:
            button.textContent = defaultSubmitButtonText;
            button.classList.remove('btn_is-loading');
            jQuery.modal.close();
            jQuery('#success-modal-first').modal();
            break;
        case 859:
            crmObject = new amoCRMInsance(859, inputs, 'intensive');
            requestData = crmObject.getRequestObject();
            jQuery.when(window.utils.ajaxRequest(requestData)).then(() => {
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-first').modal();
            }, error => console.log(new Error(error)));
            break;
        case 1447:
            crmObject = new amoCRMInsance(1447, inputs, 'free');
            requestData = crmObject.getRequestObject();
            sendPulseData = {
                action: 'add_to_book',
                id: 89064264,
                email: inputs[3].value
            }
            jQuery.when(window.utils.ajaxRequest(requestData)).then(data => {
                //Yandex conversion
                ym(49171171, 'reachGoal', 'freelessons');
                target.querySelector('.form__input').classList.remove('form__input_filled');
                target.querySelector('.form__label').classList.remove('form__label_active');
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-free-start').modal();
            }, error => console.log(new Error(error)));
            jQuery.when(window.utils.ajaxRequest(sendPulseData)).then(resp => {
                console.log(resp);
            }, error => console.log(new Error(error)));
            break;
        case 1655:
            sendPulseData = {
                action: 'add_to_book',
                id: 89064300,
                email: inputs[1].value
            }
            jQuery.when(window.utils.ajaxRequest(sendPulseData)).then((resp) => {
                target.querySelector('.form__input').classList.remove('form__input_filled');
                target.querySelector('.form__label').classList.remove('form__label_active');
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-test').modal();
            }, error => console.log(new Error(error)));
            break;
        case 1628:
            sendPulseData = {
                action: 'add_to_book',
                id: 89086955,
                email: inputs[0].value
            }
            jQuery.when(window.utils.ajaxRequest(sendPulseData)).then((resp) => {
                //Yandex conversion
                ym(49171171, 'reachGoal', 'emailsub');
                target.querySelector('.form__input').classList.remove('form__input_filled');
                target.querySelector('.form__label').classList.remove('form__label_active');
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery('#success-modal-third').modal();
            }, error => console.log(new Error(error)));
            break;
        case 779:
            crmObject = new amoCRMInsance(779, inputs, 'call');
            requestData = crmObject.getRequestObject();
            jQuery.when(window.utils.ajaxRequest(requestData)).then(() => {
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-second').modal();
            }, error => console.log(new Error(error)));
            break;
        case 1839:
            crmObject = new amoCRMInsance(1839, inputs, 'intensive');
            requestData = crmObject.getRequestObject();
            jQuery.when(window.utils.ajaxRequest(requestData)).then(() => {
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-first').modal();
            }, error => console.log(new Error(error)));
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

    window.utils.removeClass(navigationLinksCollection, activeClass);
    target.classList.add(activeClass);
}
function paymentInputsHandler(event) {
    const target = event.target;
    const targetName = target.name;

    if (targetName === 'total' || targetName === 'wsb_total') {
        const saleInput = target.closest('.form').querySelector('input[name="sale"]');
        if (saleInput) {
            saleInput.checked = false;
        }
        paymentInstance.setTotalPrice(target.value);
        paymentInstance.changeCurenciesPrice(paymentMethodInstance.getPaymentMethodIndex());
    }
}
function initItiPlugin() {
    const telInputs = document.querySelectorAll('input[type="tel"]');

    for (const input of telInputs) {
        if (!input.closest('.modal')) {
            itiInstance.init(input);
            input.addEventListener("countrychange", onItiCountyChangeHandler);
        }
    }
}
function initSwiperInstance(swiperInstance, swiperInstanceOptionsData) {
    if (typeof swiperInstance === `object`) {
        const swiperInstances = Array.from(swiperInstance);

            swiperInstances.forEach((swiperInstanceItem, index) => {
                const swiperInstanceContainer = swiperInstanceItem.closest('.inner-carousel');

                swiperInstanceContainer.classList.add(`inner-carousel-instance-${index}`);
                new Swiper(swiperInstanceContainer, swiperInstanceOptionsData);
            });

        return;
    }
    if (swiperInstance) {
        const swiperInstanceContainer = document.querySelector(swiperInstance);
    
        if (swiperInstanceContainer) {
            return new Swiper(swiperInstanceContainer, swiperInstanceOptionsData);
        }
    }
}

//Event handlers
function onPortfolioLoadMoreButtonClickHandler() {
    const portfolioLoadMoreButtonLocation = portfolioLoadMoreButton.dataset.location;
    const maxLoadPages = +portfolioLoadMoreButton.dataset.maxPages;
    const portfolioListContainer = portfolioLoadMoreButton.closest(`.portfolio`).querySelector(`.portfolio__list`);
    const portfolioLoadMoreRequestData = {
        action: 'portfolio',
        currentPage: currentPage
    };
    const portfolioLoadMorebeforeRequestHandler = function() {
        portfolioLoadMoreButton.closest(`.portfolio`).querySelector(`.portfolio__list`).classList.add('portfolio__list_state-is-loading');
        portfolioLoadMoreButton.classList.add('ajax-btn_state-is-loading');
    };

    if (portfolioLoadMoreButtonLocation === `post`) {
        const portfolioLoadMoreButtonPostTag = portfolioLoadMoreButton.dataset.postTag;
        portfolioLoadMoreRequestData.action = portfolioLoadMoreButtonLocation + '_portfolio';
        portfolioLoadMoreRequestData.tag = portfolioLoadMoreButtonPostTag;
    }

    jQuery.when(globalUtils.ajaxRequest(portfolioLoadMoreRequestData, portfolioLoadMorebeforeRequestHandler, portfolioLoadMoreButton)).then(
        resp => {
            setTimeout(() => {
                portfolioListContainer.insertAdjacentHTML('beforeEnd', resp);
                portfolioListContainer.classList.remove('portfolio__list_state-is-loading');
                portfolioLoadMoreButton.classList.remove('ajax-btn_state-is-loading');
                currentPage++;
                if (currentPage === maxLoadPages) {
                    portfolioLoadMoreButton.classList.add('portfolio__btn_disabled');
                }
            }, 250);
        },
        error => {
            console.log(new Error(error));
        }
    );
}
function onCoursesTabsButtonsClickHandler(evt) {
    const target = evt.target;
    dataCurrentPageValue = 1;
    const coursesCategoryId = target.dataset.id.split(`,`);
    const coursesListGrid = target.parentElement.nextElementSibling;
    const coursesListContainer = coursesListGrid.querySelector(`.course-list__wrapper`);
    const isShowFull = target.dataset.showFull;
    const showMoreCoursesButton = coursesListGrid.querySelector(`.course-list__more-btn`);
    const showMoreCoursesButtonContainer = showMoreCoursesButton ? showMoreCoursesButton.parentElement : null;
    const coursesRequestData = {
        action: `tabs`,
        id: coursesCategoryId,
        showTestPost: false
    }
    const beforeSendHandler = function () {
        const el = target.parentElement.nextElementSibling;
        el.classList.add(`course-list__grid_state-is-loading`);
    }

    if (isShowFull) {
        coursesRequestData.showFullPosts = true;
    }

    globalUtils.removeClass(coursesTabsButtons, `tabs__btn_active`);
    target.classList.add(`tabs__btn_active`);
    jQuery.when(globalUtils.ajaxRequest(coursesRequestData, beforeSendHandler, target)).then(resp => {
        setTimeout(function () {
            coursesListGrid.classList.remove(`course-list__grid_state-is-loading`);
            coursesListContainer.innerHTML = ``;
            coursesListContainer.insertAdjacentHTML(`afterBegin`, resp);
            if (!isShowFull) {
                dataMaxPagesValue = +coursesListContainer.querySelector(`.course-list__row_first`).dataset.maxNumPages;
                if (dataCurrentPageValue === dataMaxPagesValue) {
                    showMoreCoursesButton.classList.add(`course-list__more-btn_disabled`);
                    showMoreCoursesButtonContainer.classList.add(`course-list__footer_state-disabled`);
                } else {
                    showMoreCoursesButton.classList.remove(`course-list__more-btn_disabled`);
                    showMoreCoursesButtonContainer.classList.remove(`course-list__footer_state-disabled`);
                }
            }
        }, 250);
    }, error => console.log(new Error(error)));
}
function onMobileOptionsMenuOpenButtonClickHandler() {
    const mobileMenuEl = document.querySelector('.m-menu');
    const scrollBarWidth = getScrollbarWidth();
    mobileMenuEl.classList.add('m-menu_opened');
    document.body.style.paddingRight = scrollBarWidth;
    document.documentElement.classList.add('is-locked');
}
function onMobileOptionsMenuCloseButtonClickHandler() {
    const mobileMenuEl = document.querySelector('.m-menu');
    mobileMenuEl.classList.remove('m-menu_opened');
    document.body.style.paddingRight = 0;
    document.documentElement.classList.remove('is-locked');
}
function onItiCountyChangeHandler(evt) {
    const target = evt.target;
    const form = target.closest('.wpcf7-form') || target.closest('.form');
    const code = form.querySelector('.iti__selected-dial-code').textContent;
    const hiddenInput = form.querySelector('input[name="ums-country-code"]');
    hiddenInput.value = code;
}
function onTextareaElementClickHandler(evt) {
    const target = evt.target;

    target.classList.toggle(`form__textarea-btn_active`);
    target.nextElementSibling.lastElementChild.classList.toggle(`form__textarea_visibility-hide`);
}
function onModalOpenHandler(evt) {
    const modal = evt.target;
    const input = modal.querySelector('input[type="tel"]');

    if (input) {
        itiInstance.init(input);
        input.addEventListener("countrychange", onItiCountyChangeHandler);
    }

    if (modal.classList.contains(`order-modal`)) {
        const textareaElement = modal.querySelector(`.form__textarea-btn`);
        textareaElement.addEventListener(`click`, onTextareaElementClickHandler);
    }
}
function onModalCloseHandler(evt) {
    const target = evt.target;
    const input = target.querySelector('input[type="tel"]');

    if (input) {
        const instance = window.intlTelInputGlobals.getInstance(input);
        instance.destroy();
    }

    if (target.classList.contains(`order-modal`)) {
        const textareaElement = target.querySelector(`.form__textarea-btn`);
        textareaElement.removeEventListener(`click`, onTextareaElementClickHandler);
    }
}

// Подгружаем необходимые модули
const amoCRMInsance = window.amoCRM.init;
// const paymentMethodInstance = window.paymentMethod.instance;
// const paymentInstance = window.payment.instance;
const globalUtils = window.utils;
const itiInstance = window.iti.instance;

// Variables
let defaultSubmitButtonText;
let requiredInputsCollection;
let certificatePaymentObject;
let telInputValidation = false;
let emailInputValidation = false;
let textInputValidation = false;
let selectValidation = false;
let dataCurrentPageValue = 1;
let dataMaxPagesValue;
let currentPage = 1;
if (document.querySelector('.course-list__row_first')) {
    dataMaxPagesValue = +document.querySelector('.course-list__row_first').dataset.maxNumPages;
}
let deliveryElement = document.querySelector('select[name="delivery"]');
let isCompleted = false;
let isMobile = false;
const certificateForm = '#wpcf7-f1805-o1';
const lecturersCollection = document.querySelectorAll('.lecturers-page__item');
const wpcf7Collection = document.querySelectorAll('.wpcf7');
const contactPageItems = document.querySelectorAll('.contact-page__info-item');
const navigationLinksCollection = document.querySelectorAll('.page-navigation__link');
const inputs = document.querySelectorAll('input');
const selects = document.querySelectorAll('select');
const weCarouselOptions = {
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
}
const graduatesCarouselOptions = {
    slidesPerView: `auto`,
    spaceBetween: 25,
    loop: true,
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
            slidesPerView: `auto`
        }
    }
}
const testimonialsCarouselOptions = {
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
}
const portfolioLoadMoreButton = document.querySelector(`.portfolio__btn`);
const coursesTabsButtonsContainer = document.querySelector(`.tabs`);
const coursesTabsButtons = document.querySelectorAll(`.tabs__btn`);
const mobileOptionsMenuOpenButton = document.querySelector(`.m-options__menu-btn`);
const mobileOptionsMenuCloseButton = document.querySelector(`.m-menu__options-close-btn`);

document.addEventListener(`DOMContentLoaded`, () => {
    initInputListener();
    initItiPlugin();
    changeLayout();
    showPopup();
    initSwiperInstance(`.we__carousel`, weCarouselOptions);
    initSwiperInstance(`.graduates__carousel`, graduatesCarouselOptions);
    initSwiperInstance(`.testimonials__carousel`, testimonialsCarouselOptions);

    if (portfolioLoadMoreButton) {
        portfolioLoadMoreButton.addEventListener(`click`, onPortfolioLoadMoreButtonClickHandler);
    }
    if (coursesTabsButtonsContainer) {
        coursesTabsButtonsContainer.addEventListener(`click`, onCoursesTabsButtonsClickHandler);
    }
    if (mobileOptionsMenuOpenButton) {
        mobileOptionsMenuOpenButton.addEventListener(`click`, onMobileOptionsMenuOpenButtonClickHandler);
    }
    if (mobileOptionsMenuCloseButton) {
        mobileOptionsMenuCloseButton.addEventListener(`click`, onMobileOptionsMenuCloseButtonClickHandler);
    }
});

//Events
document.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.dataset.modal) {
        const modalId = target.dataset.modal;

        if (modalId === '#personal-data-modal') {
            const modalOptionsData = {
                action: 'personal_data'
            }
            jQuery.when(window.utils.ajaxRequest(modalOptionsData)).then(resp => {
                const modalElement = document.querySelector('.personal-data-modal');
                modalElement.insertAdjacentHTML('afterBegin', resp);
                jQuery(modalElement).modal({
                    closeExisting: false
                });
            }, error => console.log(new Error(error)));
        }
        jQuery(modalId).modal({
            closeExisting: false
        });
    }
    if (target.dataset.videoId) {
        const videoId = target.dataset.videoId;
        const videoLink = 'https://www.youtube.com/embed/' + videoId;
        const videoModalElement = document.querySelector('.video-modal');
        videoModalElement.querySelector('iframe').setAttribute('src', videoLink);
        jQuery('.video-modal').modal({
            closeExisting: false
        });
    }
    if (target.matches('.wpcf7 button[type="submit"]')) {
        defaultSubmitButtonText = target.textContent;
        target.classList.add(`btn_is-loading`);
        target.textContent = `Отправляем...`;
    } 
    if (target.matches('.dropdown-course-info__lecturer')) {
        const postId = target.dataset.postId;
        const text = target.textContent;
        const requestData = {
            action: 'lecturer',
            id: postId
        }
        const beforeSendHandler = function () {
            target.style.opacity = .3;
        }
        target.textContent = 'Загружаем...';
        jQuery.when(window.utils.ajaxRequest(requestData, beforeSendHandler, target)).then((response) => {
            target.style.opacity = 1;
            target.textContent = text;
            document.querySelector('.dropdown-lecturer-modal').innerHTML = '';
            document.querySelector('.dropdown-lecturer-modal').insertAdjacentHTML('afterBegin', response);
            jQuery('.dropdown-lecturer-modal').modal();
        });
    }
    if (target.matches(`.course-list__more-btn`)) {
        const gridElement = target.parentElement.previousElementSibling;
        const id = document.querySelector(`.tabs__btn_active`).dataset.id;
        const data = {
            action: `courses`,
            id: +id,
            current_page: dataCurrentPageValue
        }
        const beforeSendHandler = function () {
            const el = target.parentElement.previousElementSibling;
            el.classList.add('course-list__wrapper_state-is-loading');
            target.classList.add('ajax-btn_state-is-loading');
        }

        jQuery.when(window.utils.ajaxRequest(data, beforeSendHandler, target)).then(resp => {
            setTimeout(function () {
                document.querySelector('.course-list__wrapper').insertAdjacentHTML('beforeEnd', resp);
                gridElement.classList.remove('course-list__wrapper_state-is-loading');
                target.classList.remove('ajax-btn_state-is-loading');
            }, 250);
            dataCurrentPageValue += 1;
            if (dataCurrentPageValue === dataMaxPagesValue) {
                document.querySelector('.course-list__footer').classList.add('course-list__footer_state-disabled');
                document.querySelector('.course-list__more-btn').classList.add('course-list__more-btn_disabled');
            }
        }, error => console.log(new Error(error)));
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
                window.utils.removeClass(buttons, activeClass);
                window.utils.removeClass(dropdowns, openClass);
                target.classList.add(activeClass);
                target.nextElementSibling.classList.add(openClass);
            }
        })();
    }
});

jQuery('.modal').on('modal:open', onModalOpenHandler);
jQuery('.modal').on('modal:close', onModalCloseHandler);
jQuery('.video-modal').on('modal:after-close', videoModalCloseHandler);
addCustomEventHandler('click', lecturersCollection, lecturerHandlerFunction);
addCustomEventHandler('wpcf7invalid', wpcf7Collection, wpcf7InvalidHandler);
addCustomEventHandler('wpcf7mailsent', wpcf7Collection, wpcf7SentHandler);
addCustomEventHandler('click', navigationLinksCollection, pageNavigationLinkHandler);
addCustomEventHandler('input', inputs, paymentInputsHandler);
addCustomEventHandler('change', selects, handleSelect);
window.addEventListener('resize', () => {
    changeLayout();
});
window.addEventListener('scroll', () => {
    if (mobileOptionsMenuOpenButton) {
        if (pageYOffset >= 900) {
            mobileOptionsMenuOpenButton.classList.add(`m-options__menu-btn_active`);
            return;
        }
        mobileOptionsMenuOpenButton.classList.remove(`m-options__menu-btn_active`);
    }
});
document.body.addEventListener('mouseover', (evt) => {
    const target = evt.target;
    if (target.closest('svg') && target.closest('svg').classList.contains('info__icon') && window.innerWidth > 991) {
        target.closest('svg').nextElementSibling.classList.add('info__content_opened');
    }
});
document.body.addEventListener('mouseout', (evt) => {
    const target = evt.target;
    if (target.closest('svg') && target.closest('svg').classList.contains('info__icon') && !event.relatedTarget.closest('svg') && window.innerWidth > 991) {
        target.closest('svg').nextElementSibling.classList.remove('info__content_opened');
    }
});