<?php
/**
 * Template part for displaying "for whom" section
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
?>
<div class="for-whom">
    <div class="row">
        <div class="col-12 col-lg-4">
            <h3 class="section__title title title_style-dark title_size-m for-whom__title">
                <?php if ($term_id == 3): ?>Для кого?<?php else: ?>Кому подойдет этот курс?<?php endif; ?>
            </h3>
        </div>
        <div class="col-12 col-md-6 col-lg-2">
            <div class="for-whom__item">
                <div class="for-whom__icon for-whom__icon_position-1">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/whom-1.svg" alt="<?php echo get_bloginfo('name'); ?>">
                </div>
								<div>
									<p class="for-whom__name">Тем, кому интересен дизайн</p>
								</div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-2">
            <div class="for-whom__item">
                <div class="for-whom__icon for-whom__icon_position-2">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/whom-2.svg" alt="<?php echo get_bloginfo('name'); ?>">
                </div>
								<div>
									<p class="for-whom__name">Начинающим дизайнерам</p>
								</div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-2">
            <div class="for-whom__item">
                <div class="for-whom__icon for-whom__icon_position-3">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/whom-3.svg" alt="<?php echo get_bloginfo('name'); ?>">
                </div>
								<div>
									<p class="for-whom__name">Дизайнерам из смежных областей</p>
								</div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-2">
            <div class="for-whom__item">
                <div class="for-whom__icon for-whom__icon_position-4">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/whom-4.svg" alt="<?php echo get_bloginfo('name'); ?>"> 
                </div>
								<div>
									<p class="for-whom__name">Кто хочет расширить компетенции</p>
								</div>
            </div>
        </div>
    </div>
</div>