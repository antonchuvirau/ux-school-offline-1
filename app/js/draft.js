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

    jQuery('.payment-modal__btn').on('click', function (e) {
        e.preventDefault();
        let paymentForm = jQuery(this).closest('.form');
        let totalPrice = paymentForm.find('input[name="total"]').val();
        let courseNameValue = paymentForm.find('input[name="title"]').val();
        let valid;
        paymentForm.find('input[required]').each(function () {
            if (!jQuery(this).val()) {
                jQuery(this).addClass('wpcf7-not-valid').next().next().addClass('form__error-label_active');
                valid = false;
                return false;
            } else {
                jQuery(this).removeClass('wpcf7-not-valid').next().next().removeClass('form__error-label_active');
                valid = true;
            }
        });
        if (valid) {
            paymentForm.find('input[required]').removeClass('wpcf7-not-valid').next().next().removeClass('form__error-label_active');
            jQuery.ajax({
                url: ajax.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'payment_alfa',
                    orderAmount: totalPrice * 100,
                    orderTitle: courseNameValue,
                    customerSaleType: 'Без скидки',
                    customerSaleValue: 0,
                    customerName: paymentForm.find('input[name="name"]').val()
                },
                beforeSend: function () {
                    paymentForm.find('button').css('opacity', '.5');
                    paymentForm.find('button').text('Обрабатываем данные...');
                },
                success: function (response) {
                    setTimeout(function () {
                        paymentForm.find('button').text('Перенаправляем на оплату...');
                        //Get params and open link
                        setTimeout(function () {
                            location.href = response.formUrl;
                            paymentForm.find('button').css('opacity', 1);
                        }, 200);
                    }, 500);
                }
            });
        }
    });