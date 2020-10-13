// jQuery(window).on('resize', function () {
//     detectDeviceWidth();
//     changeLayout();
// });

// jQuery(window).on('scroll', function () {
//     if (jQuery(window).scrollTop() >= 900) {
//         if (jQuery('.m-options__menu-btn')) {
//             jQuery('.m-options__menu-btn').addClass('m-options__menu-btn_active');
//         }
//     } else {
//         jQuery('.m-options__menu-btn').removeClass('m-options__menu-btn_active');
//     }
// });

// jQuery(document).on('click', '.course-list__test-item', function () {
    //     jQuery(jQuery(this).data('modal-id')).modal();
    // });
    // if (jQuery('select[name="test-course-date"]').length !== 0) {
    //     let selectedValue = jQuery('select[name="test-course-date"]').find('option').eq(0).val();
    //     jQuery('input[name="ums-date"]').val(selectedValue);
    // }

    // jQuery('.modal__checkbox input').on('click', function () {
    //     let selectedValue = jQuery(this).val();
    //     if (jQuery(this).is(':checked')) {
    //         courseTypeArray.push(selectedValue);
    //         resultStr = courseTypeArray.join(', ');
    //         jQuery('input[name="ums-choice"]').val(resultStr);
    //     } else {
    //         let currentElementArrayIndex = courseTypeArray.indexOf(selectedValue);
    //         courseTypeArray.splice(currentElementArrayIndex, 1);
    //         resultStr = courseTypeArray.join(', ');
    //         jQuery('input[name="ums-choice"]').val(resultStr);
    //     }
    // });

    // for (let item of paymentFormInputElements) {
    //     if (item.value) {
    //         item.parentElement.classList.add('form__input_filled');
    //         item.nextElementSibling.classList.add('form__label_active');
    //     }
    //     item.addEventListener('focus', () => {
    //         item.parentElement.classList.add('form__input_filled');
    //         item.parentElement.classList.add('form__input_focused');
    //         item.nextElementSibling.classList.add('form__label_active');
    //     });
    //     item.addEventListener('blur', () => {
    //         if (item.value) {
    //             item.parentElement.classList.remove('form__input_focused');
    //         } else {
    //             item.parentElement.classList.remove('form__input_filled');
    //             item.parentElement.classList.remove('form__input_focused');
    //             item.nextElementSibling.classList.remove('form__label_active');
    //         }
    //     });
    // }
        // if (playVideoBtnElement) {
    //     let videoModalElement = document.querySelector('.video-modal');
    //     for (let item of playVideoBtnElement) {
    //         item.addEventListener('click', (event) => {
    //             let dataVideoId = item.dataset.videoId;
    //             videoModalElement.firstElementChild.setAttribute('src', 'https://www.youtube.com/embed/' + dataVideoId);
    //         });
    //     }
    // }
        // window.intlTelInputGlobals.loadUtils(umsUtilsPath);

    // //Init functions
    // initSwiperInstance();
    // initSelectListener();
    // initInputListener();