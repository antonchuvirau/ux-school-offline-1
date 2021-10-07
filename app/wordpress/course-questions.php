<?php
/**
 * Template part for displaying course F.A.Q
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
$course_questions = get_field('ums_course_questions', $template_id);
if ($course_questions):
?>
<section class="section faq">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12">
                <header class="section__header">
                    <h3 class="title title_style-dark title_size-m section__title faq__title">Часто задаваемые вопросы</h3>
                </header>
            </div>
            <div class="order-3 order-lg-2 col-12 col-md-9 col-lg-8 col-xl-9">
                <div class="faq__grid content-list">
                    <div class="content-list__wrapper">
                        <?php foreach ($course_questions as $item): $post = $item; setup_postdata($item); ?>
                        <div class="content-list__item faq__item">
                            <p class="content-list__title"><?php the_title(); ?></p>
                            <div class="content-list__text"><?php the_content(); ?></div>
                        </div>
                        <?php endforeach; wp_reset_postdata(); ?>
                    </div>
                    <footer class="content-list__footer faq__footer">
                        <button type="button" class="content-list__more-btn">Показать ещё</button>
                    </footer>
                </div>
            </div>
            <div class="order-2 order-lg-3 col-12 col-md-9 col-lg-4 col-xl-3">
                <button data-video-id="<?php echo get_field('ums_course_portfolio_video_link', $template_id); ?>" class="modal-video-button faq__video" style="background-image: url('<?php echo get_field('ums_course_portfolio_video_img', $template_id); ?>');">
                    <div class="faq__video-btn">
                        <div class="faq__video-btn-icon">
                            <svg width="8" height="9" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28 16L0 32L1.41326e-06 0L28 16Z" fill="url(#paint02_linear)" />
                                <linearGradient id="paint02_linear" x1="13.0526" y1="-18.4" x2="-12.8587" y2="27.4717" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#33AAFF" />
                                    <stop offset="1" stop-color="#CC30CF" />
                                </linearGradient>
                            </svg>
                        </div>
                        Видеоответы
                    </div>
                </button>
            </div>
        </div>
    </div>
</section>
<?php endif; ?>