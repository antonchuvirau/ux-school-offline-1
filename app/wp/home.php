<?php
/**
 * Template Name: Главная
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
get_header();
?>
<!-- Begin main -->
<main class="main template home-template">
    <div class="wrapper home-template__wrapper">
        <aside class="about-video">
            <button type="button" data-video-id="<?php echo get_field('ums_video_link', 2); ?>" class="modal-video-button about-video__link">
                <img class="d-none d-lg-block about-video__link-shape" src="<?php echo get_template_directory_uri(); ?>/img/about-video-shape.svg" alt="<?php echo esc_attr( get_bloginfo('name') ); ?>">
                <picture class="about-video__link-picture">
                    <source media="(max-width: 991px)" srcset="<?php echo get_template_directory_uri(); ?>/img/img-student@1.5x.png 1x, <?php echo get_template_directory_uri(); ?>/img/img-student@1.5x.png 2x">
                    <source media="(min-width: 992px)" srcset="<?php echo get_template_directory_uri(); ?>/img/video.png 1x, <?php echo get_template_directory_uri(); ?>/img/video@2x.png 2x">
                    <img class="about-video__img" srcset="<?php echo get_template_directory_uri(); ?>/img/img-student@1.5x.png 1x, <?php echo get_template_directory_uri(); ?>/img/img-student@1.5x.png 2x" src="<?php echo get_template_directory_uri(); ?>/img/video@2x.png" alt="<?php echo esc_attr( get_bloginfo('name') ); ?>">
                </picture>
            </button>
            <span data-desktop-title="О" data-mobile-title="О" class="about-video__button-name"> школе</span>
        </aside>
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-9">
                    <div class="template__header home-template__header">
                        <h1 class="title template__title home-template__title">UX Mind School —<br>школа дизайна</h1>
                        <button type="button" data-modal="#free-start-modal" class="btn btn_theme-pink home-template__header-btn">Начни учиться бесплатно!</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="course-list template__course-list">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <header class="course-list__header tabs">
                            <button type="button" data-id="1,15,2,4,99,121,3" class="tabs__btn js-tabs__btn tabs__btn_active">Все курсы</button>
                            <?php
                                $courses_array = array(
                                    'taxonomy'=>'category',
                                    'include'=>'1,15,2,4,99,121,3',
                                    'orderby'=>'include',
                                    'hide_empty'=>true
                                );
                                $courses_categories = get_categories($courses_array);
                                if ($courses_categories):
                                    foreach ($courses_categories as $cat):
                            ?>
                            <button type="button" data-id="<?php echo $cat->term_id; ?>" class="tabs__btn js-tabs__btn"><?php echo $cat->name; ?></button>
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
                                        'post_status'=>'publish',
                                        'cat'=>'1,15,2,4,99,3',
                                        'posts_per_page'=>'3',
                                        'meta_key'=>'ums_course_info_start',
                                        'orderby'=>'meta_value',
                                        'order'=>'ASC',
                                        'paged'=>1
                                    );
                                    $courses_query = new WP_Query($courses_array);
                                    $max_num_pages = $courses_query->max_num_pages;
                                    $counter = 0;
                                    if ($courses_query->have_posts()):
                                        while ($courses_query->have_posts()): $courses_query->the_post();
                                            include(locate_template('template-parts/course-item.php', false, false));
                                        endwhile;
                                        wp_reset_postdata();
                                    endif;
                                ?>
                            </div>
                            <footer class="course-list__footer">
                                <button type="button" class="ajax-btn btn course-list__more-btn">
                                    Показать ещё
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z" fill="#fff" />
                                    </svg>
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php get_template_part( 'template-parts/advantages' ); ?>
        <?php get_template_part( 'template-parts/certificate' ); ?>
    </div>
    <?php get_template_part( 'template-parts/testimonials' ); ?>
    <?php get_template_part( 'template-parts/portfolio' ); ?>
    <?php get_template_part( 'template-parts/we' ); ?>
    <div class="test">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-xl-4">
                    <p class="test__title">Привет! Пройди тест<br><a target="_blank" rel="noopener noreferrer" class="link test__link" href="#popup:marquiz_5f0c231c6a047a0044cadaed">«Подходит ли мне профессия дизайнера?»</a></p>
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/ums-cat-img.png" class="test__img" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
                </div>
            </div>
        </div>
    </div>
    <?php get_template_part( 'template-parts/blog' ); ?>
    <?php get_template_part( 'template-parts/graduates' ); ?>
    <?php get_template_part( 'template-parts/about', 'home' ); ?>
    <!-- Begin template -->
    <template id="course-template"></template>
    <!-- End template --> 
</main>
<!-- End main -->
<?php get_footer(); ?>