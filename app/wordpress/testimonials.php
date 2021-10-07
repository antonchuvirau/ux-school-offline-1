<?php
/**
 * Template part for displaying testimonials
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */

$relax_reviews_link = 'https://ux-mind.relax.by/';
$google_reviews_link = 'https://www.google.com/maps/place/UX+Mind+School/@53.9165638,27.5848327,17z/data=!3m1!4b1!4m5!3m4!1s0x46dbcfc1ae2d4963:0x3fdc01c741408b64!8m2!3d53.9165638!4d27.5870267?hl=en';
$yandex_reviews_link = 'https://yandex.by/maps/157/minsk/?ll=27.584833%2C53.917048&mode=search&oid=45951810968&ol=biz&z=17';

$settings = array(
	'post_type' => 'post',
	'post_status' => 'publish',
	'cat' => 6,
	'posts_per_page' => -1,
	'orderby' => 'rand'
);
$query = new WP_Query( $settings );
if ( $query->have_posts() ):
?>
<div class="testimonials home-template__testimonials">
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-12 testimonials__wrapper">
				<div class="testimonials__carousel swiper-container">
					<div class="swiper-wrapper">
						<?php
						while ( $query->have_posts() ): $query->the_post();
						$social_link = get_field( 'ums_testimonials_instagram_link', $post->ID );
						$video_link = get_field( 'ums_testimonials_video', $post->ID );
						$image = get_field( 'ums_testimonials_img', $post->ID );
						?>
						<div class="swiper-slide testimonial-item testimonials__item">
							<div class="testimonial-item__col testimonial-item__media">
								<?php if ( $video_link ): ?>
								<div data-video-id="<?php echo $video_link; ?>" class="modal-video-button play-button testimonial-item__play-btn">
									<button type="button" class="play-button__icon"></button>
									<p class="play-button__name play-button__name_style-dark">Видеоотзыв</p>
								</div>
								<?php endif; ?>
								<img class="testimonial-item__img" src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( the_title() ); ?>">
							</div>
							<div class="testimonial-item__col testimonial-item__info">
								<div class="testimonial-item__text">
									<?php the_content(); ?>
									<svg class="testimonials__quote-icon" width="36" height="25" viewBox="0 0 36 25" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M8.18293 9.13636C12.4072 9.13636 15.8317 12.5197 15.8317 16.6932C15.8317 20.8666 12.4072 24.25 8.18293 24.25C3.95861 24.25 0.534146 20.8666 0.534146 16.6932L0.5 15.6136C0.5 7.26659 7.34894 0.5 15.7976 0.5V4.81818C12.8789 4.81818 10.1349 5.94111 8.07113 7.9801C7.67387 8.37265 7.31131 8.7903 6.98425 9.229C7.37482 9.16828 7.77508 9.13636 8.18293 9.13636ZM27.8512 9.13636C32.0755 9.13636 35.5 12.5197 35.5 16.6932C35.5 20.8666 32.0755 24.25 27.8512 24.25C23.627 24.25 20.2024 20.8666 20.2024 16.6932L20.1683 15.6136C20.1683 7.26659 27.0172 0.5 35.4659 0.5V4.81818C32.5473 4.81818 29.8032 5.94111 27.7394 7.9801C27.3421 8.37265 26.9795 8.7903 26.6525 9.229C27.043 9.16828 27.4433 9.13636 27.8512 9.13636Z" fill="#E0E6EB"/>
									</svg>
								</div>
								<?php if ( $social_link ): ?>
								<a href="<?php echo esc_url( $social_link ); ?>" target="_blank" rel="noopener noreferrer" class="testimonial-item__link testimonial-item__link_instagram"><?php the_title(); ?></a>
								<?php endif; ?>
							</div>	
						</div>
						<?php endwhile; wp_reset_postdata(); ?>
					</div>
				</div>
				<div class="testimonials__option">
					<div class="testimonials__pagination"></div>
					<!-- <a href="<?php echo esc_url(get_page_link(58)); ?>" class="link testimonials__all-link">Все отзывы</a> -->
				</div>
				<button class="testimonials__btn testimonials__btn-prev">
					<svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M9.29282 17.7071L10.707 16.2929L3.41414 9.00002L10.707 1.70713L9.29282 0.292915L0.585711 9.00002L9.29282 17.7071Z" fill="#9E98A3" />
					</svg>
				</button>
				<button class="testimonials__btn testimonials__btn-next">
					<svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M1.70718 17.7071L0.292969 16.2929L7.58586 9.00002L0.292968 1.70713L1.70718 0.292915L10.4143 9.00002L1.70718 17.7071Z" fill="#9E98A3" />
					</svg>
				</button>
			</div>
		</div>
	</div>
	<div class="social-testimonials testimonials__social-links">
		<p class="social-testimonials__name"><?php if ( wp_is_mobile() ): ?>Больше отзывов:<?php else: ?>Больше отзывов наших выпускников на:<?php endif; ?></p>
		<a href="<?php echo esc_url( $relax_reviews_link ); ?>" target="_blank" rel="noopener noreferrer" class="social-testimonials__link">
			<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/ums-relax-img.png" srcset="<?php echo esc_url( get_template_directory_uri() ); ?>/img/ums-relax-img.png 1x, <?php echo esc_url( get_template_directory_uri() ); ?>/img/ums-relax-img@2x.png 2x" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
		</a>
		<a target="_blank" href="<?php echo esc_url( $google_reviews_link ); ?>" rel="noopener noreferrer" class="social-testimonials__link">
			<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/ums-google-img.png" srcset="<?php echo esc_url( get_template_directory_uri() ); ?>/img/ums-google-img.png 1x, <?php echo esc_url( get_template_directory_uri() ); ?>/img/ums-google-img@2x.png 2x" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
		</a>
		<a target="_blank" href="<?php echo esc_url( $yandex_reviews_link ); ?>" rel="noopener noreferrer" class="social-testimonials__link">
			<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/ums-yandex-img.png" srcset="<?php echo esc_url( get_template_directory_uri() ); ?>/img/ums-yandex-img.png 1x, <?php echo esc_url( get_template_directory_uri() ); ?>/img/ums-yandex-img@2x.png 2x" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
		</a>
	</div>
</div>
<?php endif; ?>