<?php
/**
 * Template part for displaying course results
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
?>
<section class="section results">
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-3">
                <h4 class="section__title title title_style-dark title_size-m results__title">Что будет по окончанию курса?</h4>
            </div>
            <div class="col-12 col-lg-3 results__col">
                <div class="results__item">
                    <div class="results__icon">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/icons/ums-results-icon-1.svg" alt="<?php echo get_bloginfo('name'); ?>">
                    </div>
                    <p class="results__name">Выпускной, на котором ученики презентуют свои проекты перед приглашенными экспертами</p>
                </div>
            </div>
            <div class="col-12 col-lg-3 results__col">
                <div class="results__item">
                    <div class="results__icon">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/icons/ums-results-icon-2.svg" alt="<?php echo get_bloginfo('name'); ?>">
                    </div>
                    <p class="results__name">Торжественное вручение сертификатов, шампусик и поедание торта :)</p>
                </div>
            </div>
            <div class="col-12 col-lg-3 results__col">
                <div class="results__item">
                    <div class="results__icon">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/icons/ums-results-icon-3.svg" alt="<?php echo get_bloginfo('name'); ?>">
                    </div>
                    <p class="results__name">Лучшим выпускникам предлагаем стажировку и даем рекомендации в IT компании</p>
                </div>
            </div>
        </div>
    </div>
</section>