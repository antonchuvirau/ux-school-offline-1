<?php
/**
 * The template for displaying lecturers page
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
$queried_object = get_queried_object();
$page_id = $queried_object->ID;
?>
<div class="pages-template__grid lecturers-page__grid">
    <h1 class="title title_style-dark pages-template__title"><?php echo the_title(); ?></h1>
    <div class="lecturers-page__sort">
        <div class="sort-navigation">
            <button class="sort-navigation__button sort-navigation__button_state-active" data-sort="all">Все преподаватели</button>
            <button class="sort-navigation__button" data-sort="start">Дизайн-старт</button>
            <button class="sort-navigation__button" data-sort="web">Веб-дизайн</button>
            <button class="sort-navigation__button" data-sort="mobile">Мобильные приложения</button>
            <button class="sort-navigation__button" data-sort="motion">Моушн-дизайн</button>
            <button class="sort-navigation__button" data-sort="interior">Дизайн интерьеров</button>
        </div>
    </div>
    <div class="lecturers-page__list row sort-list">
        <?php
        $lecturers_object = get_field('ums_lecturers_list', $page_id);
        foreach($lecturers_object as $post): setup_postdata($post);
            include(locate_template('template-parts/lecturer-item.php', false, false));
        endforeach; wp_reset_postdata(); ?>
        <div class="col-6 col-md-4 col-xl-3">
            <a href="<?php echo esc_url(get_page_link(77)); ?>" class="lecturers-page__item">
                <img class="lecturers-page__item-img" src="<?php echo esc_url(get_template_directory_uri()); ?>/img/ums-default-person-img.png" alt="<?php esc_attr(get_bloginfo('name')); ?>">
                <p class="lecturers-page__item-name lecturers-page__item-link">Ищем преподавателей</p>
            </a>
        </div>
    </div>
</div>