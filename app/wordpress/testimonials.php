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
					<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M22.6465 30.6465C22.8417 30.8417 23.1583 30.8417 23.3536 30.6465L25.6465 28.3536C25.8417 28.1583 25.8417 27.8417 25.6465 27.6465L18.3536 20.3536C18.1583 20.1583 18.1583 19.8417 18.3536 19.6465L25.6465 12.3536C25.8417 12.1583 25.8417 11.8417 25.6465 11.6465L23.3536 9.35357C23.1583 9.15831 22.8417 9.15831 22.6465 9.35357L12.3536 19.6465C12.1583 19.8417 12.1583 20.1583 12.3536 20.3536L22.6465 30.6465Z" fill="#C6CCD1"/>
					</svg>
				</button>
				<button class="testimonials__btn testimonials__btn-next">
					<svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M3.3536 21.6465C3.15834 21.8417 2.84176 21.8417 2.64649 21.6465L0.3536 19.3536C0.158338 19.1583 0.158337 18.8417 0.353599 18.6465L7.64649 11.3536C7.84175 11.1583 7.84176 10.8417 7.64649 10.6465L0.353599 3.35357C0.158337 3.15831 0.158337 2.84172 0.353599 2.64646L2.64649 0.353569C2.84175 0.158306 3.15834 0.158306 3.3536 0.353569L13.6465 10.6465C13.8418 10.8417 13.8418 11.1583 13.6465 11.3536L3.3536 21.6465Z" fill="#C6CCD1"/>
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