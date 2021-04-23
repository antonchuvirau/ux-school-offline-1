<?php
/**
 * Template Name: Все курсы
 * The template for displaying all courses
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
$page_queried_object = get_queried_object();
$page_id = $page_queried_object->ID;
?>
<!-- Begin main -->
<main class="main template category-template">
	<div class="wrapper template__wrapper category-template__wrapper">
		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9">
					<div class="breadcrumbs template__breadcrumbs">
						<?php bcn_display($return = false, $linked = true, $reverse = false, $force = false); ?>
					</div>
					<div class="template__header category-template__header">
						<h1 class="title template__title">Ближайшие курсы в Минске</h1>
					</div>
				</div>
				<div class="col-12">
					<div class="course-list template__course-list">
						<header class="course-list__header tabs">
							<button type="button" data-show-full="true" data-id="15,1,2,4,99,121,3" class="tabs__btn js-tabs__btn tabs__btn_active">Все курсы</button>
							<?php
                            $courses_array = array(
								'taxonomy'=>'category',
								'include'=>'15,1,2,4,99,121,3',
								'orderby'=>'include',
								'hide_empty'=>true
							);
                            $courses_categories = get_categories($courses_array);
                            if ($courses_categories):
								foreach ($courses_categories as $cat):
                            ?>
							<button type="button" data-show-full="true" data-id="<?php echo $cat->term_id; ?>" class="tabs__btn js-tabs__btn"><?php echo $cat->name; ?></button>
							<?php endforeach; endif; ?>
						</header>
						<div class="course-list__grid">
							<div class="loader course-list__grid-loader">
                                <div class="loader__wrapper"></div>
                                <img class="loader__icon" src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/icons/loader-courses.svg" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
                            </div>
							<div class="course-list__wrapper">
							<?php
                                $courses_array = array(
                                    'post_type'=>'post',
									'cat'=>'15,1,2,4,99,121,3',
									'post_status'=>'publish',
                                    'posts_per_page'=>-1,
                                    'meta_key'=>'ums_course_info_start',
                                    'orderby'=>'meta_value',
                                    'order'=>'ASC'
                                );
                                $courses_query = new WP_Query($courses_array);
								$term_max_num_pages = $courses_query->max_num_pages;
								$counter = 0;
                                if ($courses_query->have_posts()): while ($courses_query->have_posts()): $courses_query->the_post();
                                    include(locate_template('template-parts/course-item.php', false, false));
                                endwhile;
                                wp_reset_postdata();
                                endif;
                                ?>
							</div>
						</div>
					</div>
					<?php get_template_part( 'template-parts/advantages' ); ?>
				</div>
			</div>
		</div>
		<div class="figure figure_position-bottom">
			<img src="<?php echo get_template_directory_uri(); ?>/img/ums-help-figure.png" alt="<?php echo get_bloginfo('name'); ?>">
		</div>
	</div>
	<section class="section help-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-12 col-lg-8">
					<h2 class="title title_style-dark title_size-m section__title help-section__title">Не можете выбрать&nbsp;курс?</h2>
					<p class="section__note help-section__note">Оставьте свой номер телефона, и&nbsp;мы поможем сделать правильный выбор-)</p>
					<?php echo do_shortcode('[contact-form-7 id="130" autocomplete="off" html_class="form help-section__form help-form" title="Помощь в выборе курса"]'); ?>
					<label class="checkbox privacy-checkbox help-section__checkbox">
						<input type="checkbox" checked class="checkbox__input privacy-checkbox__input">
						<p class="checkbox__name">Я согласен с условиями обработки <button type="button" data-modal="#personal-data-modal" class="link checkbox__link">персональных данных</button></p>
					</label>
				</div>
			</div>
		</div>
	</section>
</main>
<!-- End main -->
<?php get_footer(); ?>