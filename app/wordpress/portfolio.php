<?php
/**
 * Template part for displaying portfolio
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */

$settings = array(
	'cat' => 7,
	'post_status' => 'publish',
	'post_type' => 'post',
	'meta_key' => 'ums_portfolio_on_home',
	'meta_value' => 'yes',
	'posts_per_page' => 6,
	'order' => 'DESC',
	'orderby' => 'date'
);
$query = new WP_Query( $settings );
if ( $query->have_posts() ):
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
            <div class="container-fluid container-xl">
                <div class="row no-gutters portfolio__list">
                    <?php
                    while ( $query->have_posts()): $query->the_post();
                        get_template_part( 'template-parts/portfolio', 'item' );
                    endwhile; wp_reset_postdata(); ?>
                </div>
            </div>
        </div>
        <?php if ( $query->max_num_pages > 1 ): ?>
        <footer class="section__footer portfolio__footer">
            <button data-location="home" data-max-pages="<?php echo $query->max_num_pages; ?>" class="btn ajax-btn portfolio__btn portfolio__btn_location-home">
                Показать ещё
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z" fill="#211130" />
                </svg>
            </button>
        </footer>
        <?php endif; ?>
    </section>
<?php endif; ?>