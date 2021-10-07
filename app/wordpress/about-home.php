<?php
/**
 * Template part for displaying about
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */

// Custom fields
$page_id = 60;
$image = get_field( 'ums_about_img', $page_id );
$image_mobile = get_field( 'ums_about_img_mobile', $page_id );
?>
<section class="section about">
  <picture>
    <source media="(max-width: 575px)" srcset="<?php echo esc_url( $image_mobile ); ?>">
    <img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
  </picture>
  <a href="<?php echo esc_url( get_page_link( $page_id ) ); ?>" class="link about__link">О нас</a>
</section>