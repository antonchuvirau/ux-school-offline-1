<?php
/**
 * Template part for displaying post item
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
$tags = wp_get_post_tags($post->ID);
$index = 0;
$array_length = count($tags);
$tags_string = '';

foreach ($tags as $tag):
	$tags_string.=$tag->slug;
	$index++;
	if ($index !== $array_length):
		$tags_string.=', ';
	endif;
endforeach;

// Custom fields
$blog_post_image = get_field('ums_blog_img', $post->ID);
?>
<div data-tag="<?php echo $tags_string; ?>" class="post-item blog-template__item">
	<a href="<?php echo esc_url( the_permalink() ); ?>" class="post-item__img"><img src="<?php echo esc_url( $blog_post_image['sizes']['blog-image-size'] ); ?>" alt="<?php esc_attr( the_title() ); ?>"></a>
	<div class="post-item__info">
		<a href="<?php echo esc_url( the_permalink() ); ?>" class="post-item__title"><?php the_title(); ?></a>
		<p class="post-item__meta">
			<?php if($tags): foreach($tags as $tag): ?><span class="post-item__meta-value post-item__meta-tag"><?php echo $tag->name; ?></span><?php endforeach; endif; ?>
			<span class="post-item__meta-value post-item__meta-date"><?php echo get_the_date('d.m.Y'); ?></span>
		</p>
	</div>
</div>