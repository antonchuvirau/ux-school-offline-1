<?php
/**
 * Template part for displaying program
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
if ($term_id == 3):
    $course_program = get_field('ums_free_course_program', $course_post_id);
else:
    $course_program = get_field('ums_course_program', $template_id);
endif;
if ($course_program):
?>
<section class="section program">
    <div class="program__figure">
        <div class="figure figure_position-top">
            <img src="<?php echo get_template_directory_uri(); ?>/img/ums-course-about-figure.png" alt="<?php echo get_bloginfo('name'); ?>">
        </div>
        <div class="figure figure_position-bottom">
            <img src="<?php echo get_template_directory_uri(); ?>/img/ums-program-figure.png" alt="<?php echo get_bloginfo('name'); ?>">
        </div>
    </div>
    <div class="container program__container">
        <div class="row justify-content-center">
            <div class="col-12">
                <h3 class="section__title title title_size-m program__title"><?php if ($term_id == 3): ?>Что в программе?<?php else: ?>Программа курса <?php the_title(); ?><?php endif; ?></h3>
                <div class="content-list">
                    <div class="content-list__wrapper">
                        <?php foreach ($course_program as $item): ?>
                        <div class="content-list__item">
                            <p class="content-list__title">
                                <?php if ($term_id == 3): echo $item['ums_free_course_program_title']; else: echo $item['ums_course_program_title']; endif; ?>
                            </p>
                            <div class="content-list__text">
                                <?php if ($term_id == 3): echo $item['ums_free_course_program_content']; else: echo $item['ums_course_program_content']; endif; ?>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<?php endif; ?>