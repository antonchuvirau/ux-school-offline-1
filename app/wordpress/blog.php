<?php
/**
 * Template part for displaying blog
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */

$settings = array(
    'post_type' => 'post',
    'post_status' => 'publish',
    'cat' => 12,
    'posts_per_page' => 3
);
$query = new WP_Query( $settings );
if ( $query->have_posts() ):
?>
<section class="section blog-section">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <header class="blog-section__header">
                    <h3 class="title title_style-dark title_size-m section__title blog-section__title">Блог</h3>
                    <!-- <a href="<?php echo esc_url( get_category_link(12) ); ?>" class="link blog-section__all-link">Читать все записи</a> -->
                </header>
                <div class="section__grid blog-section__grid">
                    <div class="row">
                        <?php while ( $query->have_posts() ): $query->the_post(); ?>
                        <div class="col-12 col-sm-6 col-lg-4 blog-section__col">
                            <?php get_template_part( 'template-parts/blog', 'item' ); ?>
                        </div>
                        <?php endwhile; wp_reset_postdata(); ?>
												<a href="<?php echo esc_url( get_category_link(12) ); ?>" class="ajax-btn btn blog-section__btn">Читать блог</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<?php endif; ?>