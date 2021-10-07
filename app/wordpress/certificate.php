<?php
/**
 * Template part for displaying certificate template
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
?>
<div class="certificate <?php if ( is_page_template('home.php') ): ?>home<?php else: ?>course<?php endif; ?>-template__certificate">
	<div class="container">
		<div class="row no-gutters align-items-center">
			<div class="order-2 order-lg-1 col-12 col-lg-5">
				<img src="<?php echo get_template_directory_uri(); ?>/img/ums-baloon-img.svg" class="d-none d-lg-block certificate__baloon-img" alt="<?php echo get_bloginfo('name'); ?>">
				<p class="certificate__text">По окончании курса студенты, защитившие итоговую работу, получают именной сертификат от UX Mind School</p>
			</div>
			<div class="order-1 order-lg-2 col-12 col-lg-7">
				<div class="certificate__img">
					<img srcset="<?php echo esc_url( get_template_directory_uri() ); ?>/img/certificate.png 1x, <?php echo esc_url( get_template_directory_uri() ); ?>/img/certificate@2x.png 2x" src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/certificate@2x.png" alt="<?php echo esc_attr( get_bloginfo('name') ); ?>">
				</div>
			</div>
		</div>
	</div>
</div>