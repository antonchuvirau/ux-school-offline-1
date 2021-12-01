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
		<div class="row no-gutters justify-content-end">
			<div class="order-2 order-lg-1 col-12 col-lg-4">
				<!-- <img src="<?php echo get_template_directory_uri(); ?>/img/ums-baloon-img.svg" class="d-none d-lg-block certificate__baloon-img" alt="<?php echo get_bloginfo('name'); ?>"> -->
				<p class="d-none d-lg-block certificate__title">Сертификат</p>
				<p class="certificate__text">По окончании курса, студенты защитившие итоговую работу получают именной сертификат от UX Mind School</p>
				<p class="certificate__note">А лучшим выпускникам предлагаем оплачиваемую стажировку и работу в нашей студии дизайна UX&nbsp;Mind&nbsp;и&nbsp;компаний, с которыми мы сотрудничаем</p>
			</div>
			<div class="order-1 order-lg-2 col-12 col-lg-7">
				<div class="certificate__img">
					<picture class="certificate__img-wrapper">
                    	<source media="(max-width: 991px)" srcset="<?php echo get_template_directory_uri(); ?>/img/m-ux-mind-school-certificate.png 1x, <?php echo get_template_directory_uri(); ?>/img/m-ux-mind-school-certificate@2x.png 2x">
                    	<source media="(min-width: 992px)" srcset="<?php echo get_template_directory_uri(); ?>/img/ux-mind-school-certificate.png 1x, <?php echo get_template_directory_uri(); ?>/img/ux-mind-school-certificate@2x.png 2x">
                    	<img class="certificate__img-media" srcset="<?php echo esc_url( get_template_directory_uri() ); ?>/img/ux-mind-school-certificate.png 1x, <?php echo esc_url( get_template_directory_uri() ); ?>/img/ux-mind-school-certificate@2x.png 2x" src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/ux-mind-school-certificate.png" alt="<?php echo esc_attr( get_bloginfo('name') ); ?>">
                	</picture>
					<picture class="certificate__img-wrapper">
                    	<source media="(max-width: 991px)" srcset="<?php echo get_template_directory_uri(); ?>/img/m-radial-gradient.svg">
                    	<source media="(min-width: 992px)" srcset="<?php echo get_template_directory_uri(); ?>/img/radial-gradient.svg">
                    	<img class="certificate__img-gradient" src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/radial-gradient.svg" alt="<?php echo esc_attr( get_bloginfo('name') ); ?>">
                	</picture>
				</div>
			</div>
		</div>
	</div>
</div>