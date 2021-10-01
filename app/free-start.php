<?php
/**
 * Template part for displaying free start modal
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */

// Modal Data
$free_modal_title = 'Получи бесплатные видео-уроки и&nbsp;попробуй себя в разных направлениях дизайна!';
?>
<div id="free-start-modal" class="modal free-start-modal">
    <p class="modal__title free-start-modal__title"><?php echo $free_modal_title; ?></p>
    <img class="free-start-modal__img" srcset="<?php echo get_template_directory_uri(); ?>/img/free-lessons.png 1x, <?php echo get_template_directory_uri(); ?>/img/free-lessons@2x.png 2x" src="<?php echo get_template_directory_uri(); ?>/img/free-lessons.png" alt="<?php echo esc_attr( $free_modal_title ); ?>">
    <?php echo do_shortcode('[contact-form-7 id="1447" html_class="form free-start-form" title="Начать бесплатно"]'); ?>
    <label class="checkbox privacy-checkbox free-start-modal__privacy-checkbox">
		  <input type="checkbox" checked class="checkbox__input privacy-checkbox__input">
		  <p class="checkbox__name checkbox__name_size-s">Я согласен с условиями обработки <button type="button" data-modal="#personal-data-modal" class="link checkbox__link checkbox__link_size-s">персональных данных</button></p>
	  </label>
</div>