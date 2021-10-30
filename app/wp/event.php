<?php
/**
 * Template Name: Мероприятие
 * The template for displaying basic course page
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

get_header();
$queried_object = get_queried_object();
//Get course template id
$template_id = $queried_object->ID;
//Get global site currency
$price_currency = get_ums_currency(do_shortcode('[userip_location type="country"]'));
//Get course term id
$term_id = get_field('ums_course_parent_term', $template_id);
//Ger URL parameter
$course_post_id = $_GET['id'];
if (!$course_post_id):
	$courses_settings = array(
		'cat' => $term_id,
		'post_status' => 'publish',
		'posts_per_page' => 1,
		'meta_key' => 'ums_course_info_start',
		'orderby' => 'meta_value',
		'order' => 'ASC'
	);
	$courses_query = new WP_Query($courses_settings);
	if ($courses_query->have_posts()): while ($courses_query->have_posts()): $courses_query->the_post();
		$course_post_id = $post->ID;
	endwhile; wp_reset_postdata(); endif;
endif;
//Event params
$course_places = get_field('ums_course_info_places', $course_post_id);
$course_length = get_field('ums_course_info_length', $course_post_id);
$course_office = get_field('ums_course_info_office', $course_post_id);
$course_lecturer = get_field('ums_course_info_lecturer', $course_post_id);
$is_course_full = get_field('ums_course_full', $course_post_id);
$is_course_free = get_field('ums_course_free', $course_post_id);
$course_price = get_field('ums_course_info_price', $course_post_id);
$course_sale_price = get_field('ums_course_info_price_sale', $course_post_id);
$ums_course_price = get_field('ums_course_info_price', $course_post_id);
?>
<!-- Begin main -->
<main class="main template course-template">
	<div class="wrapper template__wrapper course-template__wrapper">
		<div class="order-1 order-lg-2 container course-template__container">
			<div class="row">
				<div class="col-12 col-lg-9 col-xl-7">
					<div class="breadcrumbs template__breadcrumbs">
						<?php bcn_display($return = false, $linked = true, $reverse = false, $force = false) ?>
					</div>
					<div class="template__header">
						<h1 class="title template__title"><?php echo get_the_title($course_post_id); ?></h1>
					</div>
					<div class="course-info">
						<div class="course-info__wrapper">
							<?php if ($course_places): ?>
							<div class="course-info__item">
								<p class="course-info__item-name">Мест</p>
								<p class="course-info__item-value"><?php if ($is_course_full): echo 'Группа набрана'; else: echo $course_places; endif; ?></p>
							</div>
							<?php endif; ?>
							<div class="course-info__item">
								<p class="course-info__item-name">Дата</p>
								<p class="course-info__item-value"><?php echo get_schedule_template($course_post_id); ?></p>
							</div>
							<div class="course-info__item">
								<p class="course-info__item-name">Длительность</p>
								<p class="course-info__item-value"><?php echo $course_length; ?></p>
							</div>
							<?php if ($course_office): ?>
							<div class="course-info__item">
								<p class="course-info__item-name">Место</p>
								<p class="course-info__item-value"><?php echo $course_office['label']; ?> + онлайн трансляция</p>
							</div>
							<?php endif; ?>
							<!-- <div class="course-info__item">
								<p class="course-info__item-name">Кто ведёт</p>
								<?php if ($course_lecturer): ?>
								<button type="button" data-modal="#lecturer-modal" class="link course-info__item-value course-info__item-link"><?php echo $course_lecturer->post_title; ?></button>
								<?php else: ?>
								<a href="<?php echo esc_url(get_page_link(1641)); ?>" class="link course-info__item-value course-info__item-link">Наши преподаватели</a>
								<?php endif; ?>
							</div> -->
							<div class="course-info__item">
								<p class="course-info__item-name">Стоимость</p>
								<div class="course-info__item-wrapper">
									<p class="course-info__item-value course-info__item-price"><?php if (!$is_course_free): echo $course_price . $price_currency; else: echo 'Бесплатно'; endif; ?></p>
									<div class="ums-currency course-info__currency">
									<?php if (!$is_course_free): ?>
										<p class="ums-currency__value icon-currency icon-dollar">&nbsp;≈&nbsp;<?php echo get_price_in_currency($course_price, 'USD', $ums_usd_rate); ?></p>
										<p class="ums-currency__value icon-currency icon-ruble">&nbsp;≈&nbsp;<?php echo get_price_in_currency($course_price, 'RUB', $ums_rub_rate); ?></p>
									<?php endif; ?>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="course-info__options">
						<?php if ($is_course_free): ?>
							<button <?php if ($is_course_full): ?>disabled<?php endif; ?> type="button" data-modal="#order-modal" class="course-btn"><?php if ($is_course_full): ?>Группа набрана<?php else: ?>Оставить заявку<?php endif; ?></button>
						<?php else: ?>
							<button <?php if ($is_course_full): ?>disabled<?php endif; ?> type="button" data-modal="#payment-modal" class="course-btn"><?php if ($is_course_full): ?>Группа набрана<?php else: ?>Хочу участвовать<?php endif; ?></button>
						<?php endif; ?>
					</div>
				</div>
			</div>
		</div>
		<?php $ums_course_student_img = get_field('ums_course_student_img', $template_id); if ($ums_course_student_img): ?>
		<aside class="order-2 order-lg-1 student-info course-template__student">
			<img class="student-info__img" src="<?php echo $ums_course_student_img; ?>" alt="<?php the_field('ums_course_student_name', $template_id); ?>">
			<div class="student-info__text">
				<p class="student-info__name">
					<?php the_field('ums_course_student_name', $template_id); ?><span><?php the_field('ums_course_student_note', $template_id); ?></span>
				</p>
			</div>
		</aside>
		<?php endif; ?>
		<div class="figure figure_position-bottom">
			<img src="<?php echo get_template_directory_uri(); ?>/img/ums-course-figure-bottom.svg" alt="<?php echo get_bloginfo('name'); ?>">
		</div>
	</div>
	<section class="section about-course">
		<div class="container">
			<div class="row">
				<div class="d-none d-lg-block col-lg-7">
						<div class="about-course__video">
						<?php $ums_free_course_about_video = get_field('ums_free_course_about_video_link', $course_post_id);
							if ($ums_free_course_about_video):
						?>
						<button type="button" data-video-id="<?php echo $ums_free_course_about_video; ?>" class="modal-video-button play-button about-course__play-btn">
							<div class="play-button__icon play-button__icon_style-transparent">
								<svg width="28" height="32" viewBox="0 0 28 32" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M28 16L0 32L1.41326e-06 0L28 16Z" fill="white" />
								</svg>
							</div>
							<p class="play-button__name">Видео</p>
						</button>
						<?php endif; ?>
						<img src="<?php echo get_field('ums_free_course_about_img', $course_post_id); ?>" class="about-course__video-img" alt="<?php echo get_field('ums_free_course_about_video_note', $course_post_id); ?>">
					</div>
					<p class="about-course__author"><?php echo get_field('ums_free_course_about_video_note', $course_post_id); ?></p>
				</div>
				<div class="col-12 col-lg-5">
					<h2 class="section__title title title_style-dark title_size-m about-course__title"><?php echo get_field('ums_free_course_about_title', $course_post_id); ?></h2>
					<div class="about-course__info"><?php echo get_field('ums_free_course_about_content', $course_post_id); ?></div>
				</div>
				<div class="col-12">
					<?php
					//For whom section
					include(locate_template('template-parts/course-for.php', false, false));
					?>
				</div>
			</div>
		</div>
	</section>
	<?php
		//About section
		include(locate_template('template-parts/course-program.php', false, false));
		$ums_course_gallery = get_field('ums_free_course_gallery', $course_post_id);
		if ($ums_course_gallery):
	?>
	<div class="course-gallery">
		<div class="course-gallery__grid swiper-container">
			<div class="swiper-wrapper">
			<?php foreach ($ums_course_gallery as $item): ?>
				<a href="<?php echo esc_url($item['full_image']); ?>" data-fancybox="free-gallery" class="swiper-slide course-gallery__item">
					<img class="course-gallery__img" src="<?php echo $item['preview_image']; ?>" alt="<?php echo get_bloginfo('name'); ?>">
				</a>
			<?php endforeach; ?>
			</div>
		</div>
		<button type="button" class="course-gallery__btn course-gallery__btn-prev">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8232 13.8838L12.5303 13.1767L8.88383 9.53024L12.5303 5.88379L11.8232 5.17668L7.46961 9.53024L11.8232 13.8838Z" fill="#4D4357"/>
			</svg>
		</button>
		<button type="button" class="course-gallery__btn course-gallery__btn-next">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M8.17683 13.8838L7.46973 13.1767L11.1162 9.53024L7.46973 5.88379L8.17683 5.17668L12.5304 9.53024L8.17683 13.8838Z" fill="#4D4357"/>
			</svg>
		</button>
	</div>
	<?php endif; ?>
	<?php
		//Testimonials section
		get_template_part('template-parts/testimonials');
		//About section
		include(locate_template('template-parts/course-about-bottom.php', false, false));
	?>
</main>
<!-- End main -->
<?php get_footer();