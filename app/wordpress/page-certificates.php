<?php
/**
 * The template for displaying certificates page
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
$queried_object = get_queried_object();
$page_id = $queried_object->ID;
$courses_list_array = array(
    'post_type'=>'post',
    'post_status'=>'publish',
    'cat'=>'15,1,2,4,5',
    'posts_per_page'=>-1,
    'meta_key'=>'ums_course_info_start',
    'orderby'=>'meta_value',
    'order'=>'ASC',
);
?>
<div class="pages-template__grid certificates-page__grid">
    <div class="row">
        <div class="col-12 col-xl-8">
            <h1 class="title title_style-dark pages-template__title"><?php echo the_title(); ?></h1>
            <div class="certificates-page__desc"><?php while (have_posts()): the_post(); echo the_content(); endwhile; ?></div>
            <img class="certificates-page__img" src="<?php echo get_template_directory_uri(); ?>/img/ums-page-certificate.svg" alt="<?php echo get_bloginfo('name'); ?>">
            <?php $courses_list_query = new WP_Query($courses_list_array); if ($courses_list_query->have_posts()): ?>
            <div class="calculation form certificates-page__calculation">
                <h2 class="title title_style-dark title_size-m calculation__title">Купить сертификат</h2>
                <div class="calculation__section">
                    <p class="calculation__section-title">1. Выберите тип курса</p>
                    <div class="calculation__section-grid">
                        <div class="form__select calculation__select">
                            <div data-type="certificate" class="ums-select">
                                <?php
                                    $counter = 0;
                                    while ($courses_list_query->have_posts()):
                                        $courses_list_query->the_post();
                                            $ums_course_date = get_field('ums_course_info_start', $post->ID);
											$ums_course_data_object = DateTime::createFromFormat('d/m/Y', $ums_course_date);
                                            $ums_course_date_string = $ums_course_data_object->getTimestamp();
                                            $ums_course_price = get_field('ums_course_info_price', $post->ID);
                                            $ums_course_sale_price = get_field('ums_course_info_price_sale', $post->ID);
                                                if ($counter == 0):
                                ?>
                                <button data-price="0" data-sale-price="0" type="button" class="ums-select__btn">Нажмите, чтобы выбрать курс</button>
                                    <ul class="ums-select__list">
                                    <?php endif; ?>
                                        <li data-price="<?php if ($ums_course_sale_price): echo $ums_course_sale_price; else: echo $ums_course_price; endif; ?>" class="ums-select__list-item<?php if ($counter == 0): ?> ums-select__list-item_state-active<?php endif; ?>"><?php echo date_i18n('j F', $ums_course_date_string); ?> – <?php esc_html(the_title()); ?></li>
                                    <?php if ($counter == $courses_list_query->post_count): ?>
                                    </ul>
                                <?php endif; $counter++; endwhile; wp_reset_postdata(); ?>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="calculation__section">
                    <p class="calculation__section-title">2. Выберите способ оплаты</p>
                    <div class="calculation__section-grid">
                        <label class="payment-item payment-form__method">
                            <input type="radio" checked name="payment" value="0" class="payment-item__input">
                            <p class="payment-item__name">Оплатить картой</p>
                        </label>
                    </div>
                </div>
                <div class="calculation__section">
                    <p class="calculation__section-title">3. Введите контактные данные</p>
                    <div class="calculation__section-grid">
                        <div class="form__input js-form__input calculation__input calculation__row">
                            <input type="text" inputmode="text" required name="name">
                            <span class="form__label">Ваше имя и фамилия</span>
                            <span role="alert" class="form__error-label">Поле обязательно для заполнения</span>
                        </div>
                        <div class="form__input js-form__input calculation__input calculation__row">
                            <input type="tel" inputmode="tel" required name="tel">
                            <span class="form__label"></span>
                            <span role="alert" class="form__error-label">Поле обязательно для заполнения</span>
                        </div>
                        <div class="form__input js-form__input calculation__input calculation__row">
                            <input type="email" inputmode="email" required name="email">
                            <span class="form__label">Ваш email</span>
                            <span role="alert" class="form__error-label">Поле обязательно для заполнения</span>
                        </div>
                        <div class="form__select js-form__select calculation__select calculation__row">
                            <select name="delivery">
                                <option value="0"></option>
                                <option value="1">Почтой</option>
                                <option value="2">Доставить лично</option>
                                <option value="3">Заберу сертификат лично в школе</option>
                            </select>
                            <span class="form__label">Способ доставки</span>
                            <span role="alert" class="form__error-label">Поле обязательно для заполнения</span>
                        </div>
                        <div class="form__input js-form__input delivery-input calculation__row">
                            <input type="text" inputmode="text" name="delivery-address">
                            <span class="form__label">Введите почтовый адрес получателя</span>
                            <span role="alert" class="form__error-label">Поле обязательно для заполнения</span>
                        </div>
                        <div class="promocode">
                            <label class="toggle-checkbox">
                                <input type="checkbox" name="promocode-toggle" class="toggle-checkbox__input">
                                <div class="toggle-checkbox__element"></div>
                                <p class="toggle-checkbox__name">У меня есть промо-код</p>
                            </label>
                            <div class="form__input js-form__input promocode-input calculation__row">
                                <input type="text" inputmode="text" name="promocode">
                                <span class="form__label">Промо-код</span>
                                <span role="alert" class="form__error-label">Недействительный промокод</span>
                                <button type="button" class="promocode-input__btn">Применить</button>
                            </div>
                        </div>
                        <div class="form__input js-form__input calculation__input form__input_filled currency-input-wrapper calculation__row">
                            <input type="text" name="total" value="<?php echo $courses_array[0]['price']; ?>">
                            <span class="form__label form__label_active">Сумма для оплаты</span>
                            <div class="ums-currency form__ums-currency"></div>
                        </div>
                    </div>
                </div>
                <p class="calculation__note">После оплаты, отправьте пожалуйста копию квитанции на ящик <a href="#">hello@ux-school.by</a></p>
                <button type="button" class="btn calculation__btn">Перейти к оплате</button>
                <?php echo do_shortcode('[contact-form-7 id="1805" title="Покупка сертификата"]'); ?>
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>