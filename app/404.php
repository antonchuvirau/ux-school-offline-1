<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package UX_Mind_School
 */

get_header();
?>
<main class="main template pages-template no-template">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <img class="no-template__img" src="<?php echo get_template_directory_uri(); ?>/img/ums-404.svg" alt="<?php echo get_bloginfo('name'); ?>">
                <p class="no-template__text">Страница не найдена.<br>А&nbsp;вот&nbsp;<a class="link" href="<?php echo get_home_url(); ?>">главная</a>&nbsp;всегда&nbsp;на&nbsp;месте!-)</p>
            </div>
        </div>
    </div>
</main>
<?php
get_footer();
