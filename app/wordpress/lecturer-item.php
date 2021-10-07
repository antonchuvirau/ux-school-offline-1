<?php
/**
 * Template part for displaying lecturer item
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
$tags = wp_get_post_tags($post->ID);
?>
<div data-tag="<?php foreach($tags as $tag): echo $tag->slug; endforeach; ?>" class="col-6 col-md-4 col-xl-3 lecturers-page__col lecturers-page__list-item">
	<div data-lecturer-post-id="<?php echo $post->ID; ?>" class="lecturers-page__item">
		<img class="lecturers-page__item-img" src="<?php echo esc_url(get_field('ums_lecturer_img', $post->ID)); ?>" alt="<?php echo $post->post_title; ?>">
		<p class="lecturers-page__item-name"><span class="lecturers-page__item-name-value"><?php echo $post->post_title; ?></span></p>
		<p class="lecturers-page__item-position"><?php echo get_field('ums_lecturer_position', $post->ID); ?></p>
	</div>
</div>