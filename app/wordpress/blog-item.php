<?php
/**
 * Template part for displaying blog item
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
$post_id = $post->ID;
$post_tags = get_the_tags();

// Custom fields
$blog_image = get_field('ums_blog_img', $post_id);
?>
<article class="blog-item">
	<a href="<?php echo esc_url(the_permalink()); ?>" class="blog-item__img">
		<img src="<?php echo esc_url( $blog_image['sizes']['blog-image-size'] ); ?>" alt="<?php echo esc_attr( $blog_image['alt'] ); ?>">
	</a>
	<div class="blog-item__info">
		<a href="<?php echo esc_url(the_permalink()); ?>" class="blog-item__title"><?php the_title(); ?></a>
		<div class="blog-item__meta">
			<!-- <?php if($post_tags): foreach($post_tags as $tag): ?><p class="blog-item__tag"><?php echo $tag->name; ?></p><?php endforeach; endif; ?> -->
			<span class="blog-item__date"><?php echo get_the_date('d.m.Y'); ?></span>
		</div>
	</div>
</article>