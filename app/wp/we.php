<?php
/**
 * Template part for displaying we
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */

// Custom fields
$seo_text = get_field( 'we_seo_text', 2 );
?>
<section class="section we">
    <header class="section__header">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-xl-11">
                    <h3 class="title title_style-dark title_size-m section__title we__title">В чём мы хороши</h3>
                    <?php if ( $seo_text ): ?>
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-8">
                            <div class="section__text">
                                <p><?php echo $seo_text; ?></p>
                            </div>
                        </div>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </header>
    <div class="section__grid we__grid">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="we__carousel swiper-container">
                        <div class="swiper-wrapper we__carousel-wrapper">
                            <div class="swiper-slide we-item we__slide">
                                <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/we/we-icon-1.svg" class="we-item__img" alt="Мы — практики">
                                <p class="we-item__title">Мы — практики</p>
                                <p class="we-item__desc">Мы команда дизайнеров <a target="_blank" rel="noopener noreferrer" class="link" href="<?php echo esc_url('http://ux-mind.pro'); ?>">UX&nbsp;Mind</a>. Учим тому, с чем работаем ежедневно</p>
                            </div>
                            <div class="swiper-slide we-item we__slide">
                                <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/we/we-icon-2.svg" class="we-item__img" alt="Мы не конвейер!">
                                <p class="we-item__title">Мы не конвейер!</p>
                                <p class="we-item__desc">Мы не выпускаем по 100500+ студентов в год. Мы&nbsp;за&nbsp;результат.</p>
                            </div>
                            <div class="swiper-slide we-item we__slide">
                                <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/we/we-icon-3.svg" class="we-item__img" alt="Обратная связь">
                                <p class="we-item__title">Обратная связь</p>
                                <p class="we-item__desc">Преподаватели дают обратную связь и отвечают на вопросы вне лекций</p>
                            </div>
                            <div class="swiper-slide we-item we__slide">
                                <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/we/we-icon-4.svg" class="we-item__img" alt="Учим зарабатывать">
                                <p class="we-item__title">Учим зарабатывать</p>
                                <p class="we-item__desc">Обучаем не только дизайну, но и тому, как на нем зарабатывать</p>
                            </div>
                            <div class="swiper-slide we-item we__slide">
                                <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/we/we-icon-5.svg" class="we-item__img" alt="Обратная связь">
                                <p class="we-item__title">Чат для студентов</p>
                                <p class="we-item__desc">Общение с преподавателем и&nbsp;группой вне лекций</p>
                            </div>
                            <div class="swiper-slide we-item we__slide">
                                <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/we/we-icon-6.svg" class="we-item__img" alt="Мы не конвейер!">
                                <p class="we-item__title">Помогаем стартануть</p>
                                <p class="we-item__desc">Помогаем со стартом на&nbsp;фрилансе, даем рекомендации по поиску работы</p>
                            </div>
                            <div class="swiper-slide we-item we__slide">
                                <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/we/we-icon-7.svg" class="we-item__img" alt="Учим зарабатывать">
                                <p class="we-item__title">Много материала</p>
                                <p class="we-item__desc">Помимо заготовленных материалов, часть занятий проходит “вживую”</p>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination we__pagination"></div>
                    <button type="button" class="we__btn we__btn-prev">
                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29282 17.7072L10.707 16.2929L3.41414 9.00005L10.707 1.70715L9.29282 0.292938L0.585711 9.00005L9.29282 17.7072Z" fill="#9E98A3" />
                        </svg>
                    </button>
                    <button type="button" class="we__btn we__btn-next">
                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.70718 17.7072L0.292969 16.2929L7.58586 9.00005L0.292968 1.70715L1.70718 0.292938L10.4143 9.00005L1.70718 17.7072Z" fill="#9E98A3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>