<?php
/**
 * Template Name: Курс
 * The template for displaying course page
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
//Get course term id
$term_id = get_field('ums_course_parent_term', $template_id);
//Get global site currency
$price_currency = 'BYN';
//Get course timetable
$timetable_arg = array(
	'cat' => $term_id,
	'post_type' => 'post',
	'post_status' => 'publish',
	'meta_key' => 'ums_course_info_start',
	'orderby' => 'meta_value',
	'order' => 'ASC',
	'posts_per_page' => -1
);
$timetable_query = new WP_Query($timetable_arg);
$timetable_posts_count = $timetable_query->post_count;
//Ger URL parameter
$course_post_id;
if (!isset($_GET['id'])):
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
else:
	$course_post_id = $_GET['id'];
endif;

// Variables
define('ONLINE_COURSE_NOTE', 'Групповое занятие в реальном времени через Zoom');
define('PARTIAL_PAYMENT', 'Оплата в 2 этапа!');

// Course params
$course_length = get_field('ums_course_info_length', $course_post_id);
$course_price = get_field('ums_course_info_price', $course_post_id);
$course_sale_price = get_field('ums_course_info_price_sale', $course_post_id);
$is_course_full = get_field('ums_course_full', $course_post_id);
$course_places = get_field('ums_course_info_places', $course_post_id);
$course_office = get_field('ums_course_info_office', $course_post_id);
$course_lecturer = get_field('ums_course_info_lecturer', $course_post_id);
$is_course_test = get_field('ums_course_test', 2);
$course_student_img = get_field('ums_course_student_img', $template_id);
$course_about_video = get_field('ums_course_about_video_link', $template_id);
$is_partial_payment = get_field( 'is_partial_payment', $course_post_id );

//Schedule
$options_html = '';
if ($timetable_posts_count > 1):
	while ($timetable_query->have_posts()): $timetable_query->the_post();
		$options_html.='<option ';
		if ($course_post_id == $post->ID):
			$options_html.='selected ';
		endif;
		$options_html.='value="' . esc_url(get_page_link($template_id)) . '?id=' . $post->ID . '">';
		$options_html.=get_schedule_template($post->ID);
		$options_html.='</option>';
	endwhile;
	wp_reset_postdata();
else:
	$options_html.='<option selected ';
	$options_html.='value="' . esc_url(get_page_link($template_id)) . '?id=' . $post->ID . '">';
	$options_html.=get_schedule_template($course_post_id);
	$options_html.='</option>';
endif;
?>
<!-- Begin main -->
<main class="main template course-template">
	<div class="wrapper template__wrapper course-template__wrapper">
		<div class="order-1 order-lg-2 container course-template__container">
			<div class="row">
				<div class="col-12 col-lg-9 col-xl-7">
					<div class="breadcrumbs template__breadcrumbs course-template__breadcrumbs">
						<?php bcn_display($return = false, $linked = true, $reverse = false, $force = false) ?>
					</div>
					<div class="template__header course-template__header">
						<h1 class="title template__title course-template__title"><?php echo get_the_title( $course_post_id ); ?></h1>
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
								<p class="course-info__item-name">Группы</p>
								<div class="course-info__item-value link course-info__select">
									<select name="timetable"><?php echo $options_html; ?></select>
								</div>
							</div>
							<?php if ($course_length): ?>
							<div class="course-info__item course-info__item_sticky">
								<p class="course-info__item-name">Обучение</p>
								<p class="course-info__item-value"><?php echo $course_length; ?></p>
							</div>
							<?php endif; ?>
							<?php if ($course_office): ?>
							<div class="course-info__item">
								<p class="course-info__item-name">Кабинет</p>
								<p class="course-info__item-value course-info__item-address-value">
								<?php if ( $course_office['value'] == 3 ): ?>
								<?php echo $course_office['label']; ?>
								<span class="course-info__item-note"><?php echo ONLINE_COURSE_NOTE; ?></span>
								<?php endif; ?>
								<?php if ( $course_office['value'] != 3 ): ?>
								<button data-map-index="<?php echo $course_office['value']; ?>" class="office-route-button link course-info__item-link" type="button"><?php echo $course_office['label']; ?></button>
								<?php endif; ?></p>
							</div>
							<?php endif; ?>
							<div class="course-info__item">
								<p class="course-info__item-name">Кто ведёт</p>
								<?php if ($course_lecturer): ?>
								<button type="button" data-modal="#lecturer-modal" class="link course-info__item-value course-info__item-link"><?php echo $course_lecturer->post_title; ?></button>
								<?php else: ?>
								<a href="<?php echo esc_url(get_page_link(1641)); ?>" class="link course-info__item-value course-info__item-link">Наши преподаватели</a>
								<?php endif; ?>
							</div>
						</div>
						<?php $course_full_price = $course_sale_price ? $course_sale_price : $course_price; ?>
						<div class="price-box course-info__price-box">
							<div class="price-box__item">
								<div class="price-box__item-value">
									<?php echo $course_full_price . ' BYN'; ?>
									<div class="price-box__item-value-note ums-currency course-info__currency">
										<p class="ums-currency__value ums-currency__value_bigger">&nbsp;≈&nbsp;<?php echo get_price_in_currency($course_full_price, 'USD', CURRENCY_RATES[0]) . '$'; ?></p>
										<p class="ums-currency__value ums-currency__value_bigger">&nbsp;≈&nbsp;<?php echo get_price_in_currency($course_full_price, 'RUB', CURRENCY_RATES[1]) . '&#8381'; ?></p>
									</div>
								</div>
								<span class="price-box__item-name">Полная стоимость курса (оплата в 2 этапа)</span>
							</div>
							<div class="price-box__item">
								<?php $installment_payment_value = get_installment_payment_value( $course_full_price ); ?>
								<div class="price-box__item-value"><?php echo round( ($course_full_price + $installment_payment_value) / 12, 2 ) . ' BYN'; ?><span class="price-box__item-value-note"><span class="price-box__item-value-icon">x</span>12 месяцев ≈ <?php echo round( $course_full_price + $installment_payment_value, 2 ) . ' BYN'; ?></span></div>
								<span class="price-box__item-name">Онлайн-кредит от Альфа-банка</span>
							</div>
						</div>
						<div class="course-info__options">
							<button <?php if ($is_course_full): ?>disabled<?php endif; ?> type="button" data-modal="#order-modal" class="btn btn_theme-pink course-info__btn"><?php if ($is_course_full): ?>Группа набрана<?php else: ?>Оставить заявку<?php endif; ?></button>
							<?php if ( !$is_course_full ): ?><a href="<?php echo esc_url( get_page_link(53) ); ?>" class="link course-info__options-link">Оплатить курс</a><?php endif; ?>
							<?php if (!$is_course_test): ?>
							<button type="button" data-modal="#test-course-modal" class="course-btn course-btn_style-1">Бесплатное пробное занятие</button>
							<?php endif; ?>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php if ($course_student_img): ?>
		<aside class="order-2 order-lg-1 student-info course-template__student">
			<img class="student-info__img" src="<?php echo $course_student_img; ?>" alt="<?php the_field('ums_course_student_name', $template_id); ?>">
			<div class="student-info__text">
				<p class="student-info__name">
					<?php the_field('ums_course_student_name', $template_id); ?><span><?php the_field('ums_course_student_note', $template_id); ?></span>
				</p>
			</div>
		</aside>
		<?php endif; ?>
		<div class="figure figure_position-bottom">
			<img src="<?php echo get_template_directory_uri(); ?>/img/ums-course-figure-bottom.png" alt="<?php echo get_bloginfo('name'); ?>">
		</div>
	</div>
	<section class="section about-course">
		<div class="container">
			<div class="row">
				<div class="d-none d-lg-block col-lg-7">
					<div class="about-course__video">
						<?php if ($course_about_video): ?>
						<button type="button" data-video-id="<?php echo $course_about_video; ?>" class="modal-video-button play-button about-course__play-btn">
							<div class="play-button__icon play-button__icon_style-transparent">
								<svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M28 16L0 32L1.41326e-06 0L28 16Z" fill="white" />
								</svg>
							</div>
							<p class="play-button__name play-button__name-js">О курсе</p>
						</button>
						<?php endif; ?>
						<img src="<?php echo get_field('ums_course_about_img', $template_id); ?>" class="about-course__video-img" alt="<?php echo get_field('ums_course_about_video_note', $template_id); ?>">
					</div>
					<p class="about-course__author"><?php echo get_field('ums_course_about_video_note', $template_id); ?></p>
				</div>
				<div class="col-12 col-lg-5">
					<h2 class="section__title title title_style-dark title_size-m about-course__title"><?php echo get_field('ums_course_about_title', $template_id); ?></h2>
					<div class="about-course__info"><?php echo get_field('ums_course_about_content', $template_id); ?></div>
				</div>
				<div class="col-12">
					<?php include(locate_template('template-parts/course-for.php', false, false)); ?>
				</div>
			</div>
		</div>
	</section>
	<?php
		//About section
		include(locate_template('template-parts/course-program.php', false, false));
		//Process section
		get_template_part('template-parts/course', 'process');
		//Certificate section
		get_template_part('template-parts/certificate');
		//Testimonials section
		get_template_part('template-parts/testimonials');
		//Portfolio section
		$meta_settings = [
			1=>'web',
			2=>'mobile',
			4=>'motion',
			15=>'start',
			5=>'picture',
			99=>'design-smm'
		];
		$course_portfolio_settings = array(
			'cat'=>7,
			'post_type'=>'post',
			'post_status'=>'publish',
			'tag'=>$meta_settings[$term_id],
			'orderby'=>'date',
			'posts_per_page'=>6
		);
		$course_portfolio_query = new WP_Query($course_portfolio_settings);
		if ($course_portfolio_query->have_posts()):
	?>
	<section class="section portfolio">
		<header class="section__header">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<h2 class="title title_style-dark title_size-m section__title portfolio__title">Работы <?php if (wp_is_mobile()): ?>учеников<?php else: ?>выпускников<?php endif; ?></h2>
					</div>
				</div>
			</div>
		</header>
		<div class="section__grid">
			<div class="container-fluid">
				<div class="row no-gutters portfolio__list">
						<?php
							while ($course_portfolio_query->have_posts()): $course_portfolio_query->the_post();
								get_template_part('template-parts/portfolio', 'item');
							endwhile;
							wp_reset_postdata();
						?>
					</div>
				</div>
			</div>
			<?php if ($course_portfolio_query->max_num_pages > 1): ?>
			<footer class="section__footer portfolio__footer">
				<button data-location="post" data-post-tag="<?php echo $meta_settings[$term_id]; ?>" data-max-pages="<?php echo $course_portfolio_query->max_num_pages; ?>" class="btn ajax-btn portfolio__btn portfolio__btn_location-post">Показать ещё
					<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z" fill="#211130" />
					</svg>
				</button>
			</footer>
			<?php endif; ?>
	</section>
	<?php endif; ?>
	<?php
		//Results section
		get_template_part('template-parts/course', 'results');
		//About section
		include(locate_template('template-parts/course-about-bottom.php', false, false));
		//F.A.Q section
		include(locate_template('template-parts/course-questions.php', false, false));
	?>
</main>
<!-- End main -->
<?php get_footer();