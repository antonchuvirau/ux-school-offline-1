<?php
/**
 * The template for displaying blog
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */

get_header();
$queried_object = get_queried_object();
$category_id = $queried_object->term_id;
$category_name = $queried_object->name;
?>

<main class="main template blog-template">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<div class="breadcrumbs breadcrumbs_style-dark">
					<?php bcn_display($return = false, $linked = true, $reverse = false, $force = false); ?>
				</div>
				<div class="blog-template__grid">
					<div class="row">
						<div class="col-12 col-xl-3">
							<h1 class="title title_style-dark title_size-m template__title blog-template__title"><?php echo $category_name; ?></h1>
							<aside class="sort-navigation sort-navigation_direction-vertical blog-template__sort-navigation">
								<button class="sort-navigation__button sort-navigation__button_state-active" data-sort="all">Все материалы</button>
								<button class="sort-navigation__button" data-sort="stati">Статьи</button>
								<button class="sort-navigation__button" data-sort="start">Дизайн-старт</button>
								<button class="sort-navigation__button" data-sort="upwork">Upwork</button>
								<button class="sort-navigation__button" data-sort="rabota">Работа</button>
							</aside>
						</div>
						<div class="col-12 col-xl-9">
							<div class="blog-template__list sort-list">
								<?php
								$paged = get_query_var('paged') ? absint(get_query_var('paged')) : 1;
								$blog_settings = array(
									'post_type' => 'post',
									'post_status' => 'publish',
									'posts_per_page' => 10,
									'cat' => $category_id,
									'paged' => $paged,
									'page' => $paged
								);
								$blog_query = new WP_Query($blog_settings);
								if ($blog_query->have_posts()): while ($blog_query->have_posts()): $blog_query->the_post();
									$tags = wp_get_post_tags($post->ID);
									if ($tags) {
										$post_tag = $tags[0]->name;
										include(locate_template('template-parts/post-item.php', false, false));
									}
									else {
										include(locate_template('template-parts/post-item.php', false, false));
									}
								endwhile;
								?>
							</div>
							<?php
							//Pagination
							$big = 999999999;
							$pagination = paginate_links( array(
								'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
								'type' => 'plain',
								'current' => max(1, get_query_var('paged')),
								'total' => $blog_query->max_num_pages,
								'next_text' => __('Вперед →'),
								'prev_text' => __('← Назад'),
							)); if ($pagination): ?>
							<div class="pagination template__pagination"><?php echo $pagination; ?></div>
							<?php
							endif;
							endif;
							wp_reset_postdata();
							?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php
	//Newsletter section
	get_template_part('template-parts/newsletter');
	?>
</main>

<?php get_footer();