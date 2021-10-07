<?php
/**
 * The template for displaying about page
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
global $post;
$post_id = $post->ID;
$ums_about_excerpt = get_field('ums_about_excerpt', $post_id);
$ums_about_video_bg = get_field('ums_about_video_bg', $post_id);
$ums_about_video_id = get_field('ums_about_video_id', $post_id);
$ums_about_numbers = get_field('ums_about_numbers', $post_id);
$ums_offices_images = get_field('ums_about_gallery_offices', $post_id);
$ums_images = get_field('ums_about_gallery_images', $post_id);
// $ums_team = get_field('ums_about_team', $post_id);
?>
<div class="pages-template__grid about-page__grid">
    <div class="row">
        <div class="order-2 order-xl-1 col-12 col-xl-10">
            <h1 class="title title_style-dark pages-template__title"><?php echo get_field('ums_about_title', $post_id); ?></h1>
            <div class="row no-gutters">
                <div class="col-12">
                    <?php if ($ums_about_excerpt): ?>
                        <p class="about-page__excerpt">
                            <?php echo $ums_about_excerpt; ?>
                        </p>
                    <?php endif; ?>
                    <?php if ($ums_about_video_bg): ?>
                        <button type="button" data-modal="#video-modal" data-video-id="<?php echo $ums_about_video_id; ?>" style="background-image: url(<?php echo $ums_about_video_bg; ?>);" class="modal-video-button about-page__video">
                            <div class="play-button about-page__video-button">
                                <div class="play-button__icon play-button__icon_style-transparent">
							        <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								        <path d="M28 16L0 32L1.41326e-06 0L28 16Z" fill="white"></path>
							        </svg>
						        </div>
						        <p class="play-button__name play-button__name-js">Видео о школе</p>
                            </div>
                        </button>
                    <?php endif; ?>
                    <div class="row no-gutters justify-content-center">
                        <div class="col-12 col-xl-10">
                            <div id="about" class="about-page__content">
                                <?php the_content(); ?>
                            </div>
                            <?php if ($ums_about_numbers): ?>
                            <div class="about-page__numbers">
                                <?php foreach ($ums_about_numbers as $item): ?>
                                <p class="about-page__numbers-item">
                                    <span class="about-page__numbers-item-value"><?php echo $item['value']; ?></span>
                                    <span class="about-page__numbers-item-name"><?php echo $item['name']; ?></span>
                                </p>
                                <?php endforeach; ?>
                            </div>
                            <?php endif; ?>
                            <?php if ($ums_offices_images): ?>
                            <section id="offices" class="about-page__section">
                                <p class="title title_size-m title_style-dark about-page__section-title">Учебные кабинеты</p>
                                <div class="about-page__section-grid inner-carousel">
                                    <div class="swiper-container inner-carousel__grid">
                                        <div class="swiper-wrapper">
                                            <?php foreach ($ums_offices_images as $image): ?>
                                            <div class="swiper-slide inner-carousel__item">
                                                <figure class="inner-carousel__item-figure">
                                                    <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>">
                                                    <?php if ($image['caption']): ?>
                                                    <figcaption><?php echo esc_html($image['caption']); ?></figcaption>
                                                    <?php endif; ?>
                                                </figure>
                                            </div>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                    <div class="swiper-pagination inner-carousel__pagination"></div>
                                    <button type="button" class="inner-carousel__btn inner-carousel__btn-prev">
                                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29282 17.707L10.707 16.2928L3.41414 8.99992L10.707 1.70703L9.29282 0.292816L0.585711 8.99992L9.29282 17.707Z" fill="#9E98A3"/>
                                        </svg>
                                    </button>
                                    <button type="button" class="inner-carousel__btn inner-carousel__btn-next">
                                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.70718 17.707L0.292969 16.2928L7.58586 8.99992L0.292968 1.70703L1.70718 0.292816L10.4143 8.99992L1.70718 17.707Z" fill="#9E98A3"/>
                                        </svg>
                                    </button>
                                </div>
                            </section>
                            <?php endif; ?>
                            <?php if ($ums_team): ?>
                            <section id="team" class="about-page__section">
                                <p class="title title_size-m title_style-dark about-page__section-title">Команда</p>
                                <div class="about-page__section-grid team">
                                    <?php foreach ($ums_team as $person): ?>
                                    <div class="team__item">
                                        <img class="team__item-img" src="<?php echo esc_url($person['image']); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
                                        <p class="team__item-name"><?php echo $person['name']; ?></p>
                                        <p class="team__item-position"><?php echo $person['position']; ?></p>
                                    </div>
                                    <?php endforeach; ?>
                                    <a href="<?php echo esc_url(get_page_link(77)); ?>" class="team__item">
                                        <img class="team__item-img" src="<?php echo esc_url(get_template_directory_uri()); ?>/img/ums-default-person-img.png" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
                                        <p class="team__item-link">Ищем преподавателей</p>
                                    </a>
                                </div>
                            </section>
                            <?php endif; ?>
                            <?php if ($ums_images): ?>
                            <section id="gallery" class="about-page__section">
                                <p class="title title_size-m title_style-dark about-page__section-title">Фото</p>
                                <div class="about-page__section-grid inner-carousel">
                                    <div class="swiper-container inner-carousel__grid">
                                        <div class="swiper-wrapper">
                                            <?php foreach ($ums_images as $image): ?>
                                            <div class="swiper-slide inner-carousel__item">
                                                <figure class="inner-carousel__item-figure">
                                                    <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>">
                                                    <?php if ($image['caption']): ?>
                                                    <figcaption><?php echo esc_html($image['caption']); ?></figcaption>
                                                    <?php endif; ?>
                                                </figure>
                                            </div>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                    <div class="swiper-pagination inner-carousel__pagination"></div>
                                    <button type="button" class="inner-carousel__btn inner-carousel__btn-prev">
                                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29282 17.707L10.707 16.2928L3.41414 8.99992L10.707 1.70703L9.29282 0.292816L0.585711 8.99992L9.29282 17.707Z" fill="#9E98A3"/>
                                        </svg>
                                    </button>
                                    <button type="button" class="inner-carousel__btn inner-carousel__btn-next">
                                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.70718 17.707L0.292969 16.2928L7.58586 8.99992L0.292968 1.70703L1.70718 0.292816L10.4143 8.99992L1.70718 17.707Z" fill="#9E98A3"/>
                                        </svg>
                                    </button>
                                </div>
                            </section>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-1 order-xl-2 col-12 col-xl-2">
            <aside class="page-navigation pages-template__navigation">
                <a href="#about" class="page-navigation__link page-navigation__link_state-active">О нас</a>
                <?php if ($ums_offices_images): ?>
                <a href="#offices" class="page-navigation__link">Кабинеты</a>
                <?php endif; ?>
                <?php if ($ums_team): ?>
                <a href="#team" class="page-navigation__link">Команда</a>
                <?php endif; ?>
                <?php if ($ums_images): ?>
                <a href="#gallery" class="page-navigation__link">Фото</a>
                <?php endif; ?>
            </aside>
        </div>
    </div>
</div>
