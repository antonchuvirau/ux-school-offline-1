<?php
/**
 * Template part for displaying newsletter form
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
?>
<section class="section help-section newsletter">
	<div class="figure newsletter__figure figure_position-top">
		<img src="<?php echo esc_url(get_template_directory_uri()); ?>/img/ums-help-figure-top.png" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
	</div>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-12 col-lg-8">
				<p class="title title_style-dark title_size-m section__title help-section__title">Хотите быть в курсе событий?</p>
				<p class="section__note help-section__note">Подпишись на e-mail рассылку! Там всё только по делу-)</p>
				<?php echo do_shortcode('[contact-form-7 id="1628" autocomplete="off" html_class="form help-section__form help-form" title="Рассылка"]'); ?>
				<label class="checkbox privacy-checkbox help-section__checkbox">
					<input type="checkbox" checked class="checkbox__input privacy-checkbox__input">
					<p class="checkbox__name">Я согласен с условиями обработки <button type="button"data-modal="#personal-data-modal" class="link checkbox__link">персональных данных</button></p>
				</label>
			</div>
		</div>
	</div>
</section>