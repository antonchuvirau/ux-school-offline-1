<?php
/**
 * Template part for displaying about section
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
?>
<section class="section about">
    <picture>
        <source media="(max-width: 575px)" srcset="<?php echo get_field('ums_about_img_mobile', 60); ?>">
        <img src="<?php echo get_field('ums_about_img', 60); ?>" alt="<?php echo get_bloginfo('name'); ?>">
    </picture>
    <div class="about__wrapper">
        <svg class="about__icon" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 20C40 31.0456 31.0456 40 20 40C8.95556 40 0 31.0456 0 20C0 8.95556 8.95556 0 20 0C31.0456 0 40 8.95556 40 20Z" fill="#FFCC4D" />
            <path d="M12.7778 22.2221C14.3119 22.2221 15.5556 20.481 15.5556 18.3332C15.5556 16.1855 14.3119 14.4443 12.7778 14.4443C11.2437 14.4443 10 16.1855 10 18.3332C10 20.481 11.2437 22.2221 12.7778 22.2221Z" fill="#664500" />
            <path d="M31.6189 19.7747C31.5523 19.6247 29.9534 16.1113 26.6667 16.1113C23.3812 16.1113 21.7812 19.6247 21.7145 19.7747C21.6123 20.0047 21.6789 20.2736 21.8756 20.4313C22.0701 20.5891 22.3489 20.5947 22.5534 20.4469C22.5667 20.4369 23.9556 19.4447 26.6667 19.4447C29.3623 19.4447 30.7489 20.4236 30.7801 20.4458C30.8778 20.5191 30.9956 20.5558 31.1112 20.5558C31.2334 20.5558 31.3567 20.5147 31.4578 20.4347C31.6545 20.2769 31.7223 20.0058 31.6189 19.7747ZM6.66561 13.8424C6.4345 13.8424 6.20005 13.7702 6.00005 13.6202C5.50894 13.2524 5.41005 12.5558 5.77783 12.0647C9.40228 7.23134 14.2401 7.17578 14.4445 7.17578C15.0578 7.17578 15.5556 7.67356 15.5556 8.28689C15.5556 8.89911 15.0612 9.39578 14.4489 9.398C14.2756 9.40023 10.4834 9.49356 7.5545 13.398C7.33783 13.6891 7.00339 13.8424 6.66561 13.8424ZM32.2234 16.2036C31.8845 16.2036 31.5523 16.0502 31.3334 15.7591C28.4534 11.918 23.5989 12.8402 23.5512 12.848C22.9434 12.968 22.3645 12.578 22.2434 11.9769C22.1234 11.3747 22.5134 10.7902 23.1145 10.6691C23.3712 10.6169 29.4001 9.478 33.1101 14.4247C33.4789 14.9158 33.3789 15.6124 32.8878 15.9802C32.6889 16.1324 32.4556 16.2036 32.2234 16.2036ZM25.8378 26.1969C25.6289 26.0747 25.3578 26.1002 25.1745 26.2636C25.1634 26.2724 24.0489 27.2224 20.0001 27.2224C15.9545 27.2224 14.8378 26.2736 14.8378 26.2736C14.6612 26.0958 14.3889 26.0624 14.1712 26.1824C13.9545 26.3058 13.8456 26.5591 13.9067 26.8013C13.9178 26.8502 15.1778 31.6669 20.0001 31.6669C24.8223 31.6669 26.0823 26.8502 26.0945 26.8013C26.1534 26.5647 26.0456 26.3224 25.8378 26.1969Z" fill="#664500" />
        </svg>
        <p class="about__name">Приходите к нам<span>Дизайн меняет жизнь!</span></p>
        <?php if ($term_id != 3): ?>
            <button <?php if ($is_course_full): ?>disabled<?php endif; ?> type="button" data-modal="#order-modal" class="btn about__btn"><?php if ($is_course_full): ?>Группа набрана<?php else: ?>Оставить заявку<?php endif; ?></button>
        <?php if (!$is_course_test): ?>
            <button type="button" data-modal="#test-course-modal" class="link about__wrapper-link">Бесплатное пробное занятие</button>
        <?php endif; ?>
        <?php elseif ($is_course_free): ?>
            <button <?php if ($is_course_full): ?>disabled<?php endif; ?> type="button" data-modal="#order-modal" class="btn about__btn"><?php if ($is_course_full): ?>Группа набрана<?php else: ?>Оставить заявку<?php endif; ?></button>
        <?php else: ?>
            <button <?php if ($is_course_full): ?>disabled<?php endif; ?> type="button" data-modal="#payment-modal" class="btn about__btn"><?php if ($is_course_full): ?>Группа набрана<?php else: ?>Хочу участвовать<?php endif; ?></button>
        <?php endif; ?>
    </div>
</section>