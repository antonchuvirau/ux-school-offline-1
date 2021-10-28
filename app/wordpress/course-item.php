<?php
/**
 * Template part for displaying short course
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
global $post;
// Получаем id поста курса
$course_post_id = $post->ID;
// Получаем данные о шаблоне поста курса
$course_template_data = get_field('ums_course_page_template', $course_post_id);
$course_template_id = $course_template_data[0];
$course_post_link = get_page_link($course_template_id);
$course_post_image_url = get_field('ums_course_icon', $course_template_id);
// Получаем дополнительные поля
$course_price = get_field('ums_course_info_price', $course_post_id);
$course_sale_price = get_field('ums_course_info_price_sale', $course_post_id);
$course_type = get_field('ums_course_info_type', $course_post_id);
$course_time = get_field('ums_course_info_time', $course_post_id);
$course_length = get_field('ums_course_info_length', $course_post_id);
$course_places = get_field('ums_course_info_places', $course_post_id);
$is_course_free = get_field('ums_course_free', $course_post_id);
$is_course_full = get_field('ums_course_full', $course_post_id);
$course_office_data = get_field('ums_course_info_office', $course_post_id);
$course_lecturer_data = get_field('ums_course_info_lecturer', $course_post_id);
$course_start_date = get_field('ums_course_info_start');
$course_start_date_object = DateTime::createFromFormat('d/m/Y', $course_start_date);
$course_start_date_timestamp = $course_start_date_object->getTimestamp();
?>
<article <?php if ($counter === 0): ?>data-max-num-pages="<?php echo $max_num_pages; ?>"<?php endif; ?> class="course-list__row <?php if ($counter == 0): ?>course-list__row_first<?php endif; ?>">
	<div class="course-list-item">
		<a href="<?php echo esc_url($course_post_link) . '?id=' . $course_post_id; ?>" class="course-list-item__img">
			<img src="<?php echo esc_url($course_post_image_url); ?>" alt="<?php echo esc_attr(the_title()); ?>">
		</a>
		<div class="course-list-item__info">
			<a href="<?php echo esc_url($course_post_link) . '?id=' . $course_post_id; ?>" class="course-list-item__title">
				<span class="course-list-item__title-value"><?php echo the_title(); ?></span>
				<?php if ($course_type): ?>
				<p class="course-list-item__type">
					<?php if ($course_time): ?>
					<span class="course-list-item__type-value course-list-item__type-value_theme-default"><?php echo $course_time; ?></span>
					<?php endif; ?>
					<span class="course-list-item__type-value course-list-item__type-value_theme-<?php echo COURSE_TYPES[$course_type]; ?>"><?php echo $course_type; ?></span>
				</p>
				<?php endif; ?>
			</a>
			<!-- <div class="course-list-item__select">
				<p class="course-list-item__select-name"><?php echo date_i18n('j F', $course_start_date_timestamp); ?>
					<svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.833496 1.99984C0.833496 1.26346 1.43045 0.666504 2.16683 0.666504C2.90321 0.666504 3.50016 1.26346 3.50016 1.99984C3.50016 2.73622 2.90321 3.33317 2.16683 3.33317C1.43045 3.33317 0.833496 2.73622 0.833496 1.99984Z" fill="#665D5D"/>
						<path d="M6.66683 1.99984C6.66683 1.26346 7.26378 0.666504 8.00016 0.666504C8.73654 0.666504 9.3335 1.26346 9.3335 1.99984C9.3335 2.73622 8.73654 3.33317 8.00016 3.33317C7.26378 3.33317 6.66683 2.73622 6.66683 1.99984Z" fill="#665D5D"/>
						<path d="M12.5002 1.99984C12.5002 1.26346 13.0971 0.666504 13.8335 0.666504C14.5699 0.666504 15.1668 1.26346 15.1668 1.99984C15.1668 2.73622 14.5699 3.33317 13.8335 3.33317C13.0971 3.33317 12.5002 2.73622 12.5002 1.99984Z" fill="#665D5D"/>
					</svg>
				</p>
				<div class="dropdown course-list-item__select-dropdown dropdown-course-info">
					<ul class="list dropdown__wrapper dropdown-course-info__wrapper">
						<li class="dropdown-course-info__item">
							<p class="dropdown-course-info__name">Начало занятий</p>
							<p class="dropdown-course-info__value"><?php echo get_schedule_template($course_post_id, true); ?></p>
						</li>
						<?php if ( $course_office_data ): ?>
						<li class="dropdown-course-info__item">
							<p class="dropdown-course-info__name">Адрес</p>
							<p class="dropdown-course-info__value">
								<?php echo $course_office_data['label']; ?></br>
								<?php if ($course_office_data['value'] != 3): ?>
									<button data-map-index="<?php echo $course_office_data['value']; ?>" class="office-route-button link dropdown-course-info__value-link dropdown-course-info__value-btn dropdown-course-info__value-link_size-s" type="button">Карта</button>
								<?php endif; ?>
							</p>
						</li>
						<?php endif; if ( $course_lecturer_data ): ?>
						<li class="dropdown-course-info__item">
							<p class="dropdown-course-info__name">Преподаватель</p>
							<p class="dropdown-course-info__value">
								<?php if ( $course_lecturer_data ): ?>
									<button type="button" data-post-id="<?php echo $course_post_id; ?>" class="link dropdown-course-info__lecturer dropdown-course-info__value-link"><?php echo $course_lecturer_data->post_title; ?></button>
								<?php else: ?>
									<a href="<?php echo esc_url(get_page_link(1641)); ?>" class="link dropdown-course-info__lecturer dropdown-course-info__value-link">Наши преподаватели</a>
								<?php endif; ?>
							</p>
						</li>
						<?php endif; ?>
					</ul>
				</div>
			</div> -->
			<div class="course-list-item__meta">
				<p class="d-xl-none course-list-item__meta-item">
					<span data-title="Старт:" class="course-list-item__meta-value"><?php echo date_i18n('j F', $course_start_date_timestamp) . ' (' . $course_length .')'; ?></span>
				</p>
				<p class="d-none d-xl-flex flex-direction-column course-list-item__meta-item">
					<span data-title-lg="Старт" class="course-list-item__meta-value"><?php echo date_i18n('j F', $course_start_date_timestamp); ?> (<?php echo $course_length; ?>)</span>
				</p>
				<p class="course-list-item__meta-item">
					<span data-title="Мест:" data-title-lg="Мест" class="course-list-item__meta-value<?php if ($is_course_full): ?> course-list-item__meta-value_data-null<?php endif; ?>"><?php if ($is_course_full): echo 'Группа набрана'; else: echo $course_places; endif; ?></span>
				</p>
				<?php if ( $course_sale_price && !$is_course_free ): ?>
				<div class="course-list-item__meta-item">
					<div data-title="Цена:" data-title-lg="Стоимость" class="course-list-item__meta-value course-list-item__meta-price" data-price="<?php echo $course_sale_price; ?>">
						<div>
							<span class="course-list-item__meta-inner"><?php echo $course_price; ?></span>
							<span><?php echo $course_sale_price; ?><?php echo CURRENCY_CODE; ?></span>
						</div>
					</div>
					<div class="info course-list-item__meta-info">
						<svg class="info__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 0C3.5888 0 0 3.5888 0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0ZM9 12H7V7H9V12ZM9 6H7V4H9V6Z" fill="#E0E6EB"/>
						</svg>
						<div class="info__content">
							<p class="info__content-value icon-currency icon-dollar_color-dark">≈&nbsp;<?php echo get_price_in_currency($course_sale_price, 'USD', CURRENCY_RATES[0]); ?></p>
							<p class="info__content-value icon-currency icon-ruble_color-dark">≈&nbsp;<?php echo get_price_in_currency($course_sale_price, 'RUB', CURRENCY_RATES[1]); ?></p>
						</div>
					</div>
				</div>
				<?php elseif ( !$course_sale_price && !$is_course_free ): ?>
					<div class="course-list-item__meta-item">
						<p data-title="Цена:" data-price="<?php echo $course_price; ?>" class="course-list-item__meta-value course-list-item__meta-price"><?php echo $course_price; ?> <?php echo CURRENCY_CODE; ?></p>
						<div class="info course-list-item__meta-info">
							<svg class="info__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M8 0C3.5888 0 0 3.5888 0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0ZM9 12H7V7H9V12ZM9 6H7V4H9V6Z" fill="#E0E6EB"/>
							</svg>
							<div class="info__content">
								<p class="info__content-value icon-currency icon-dollar_color-dark">≈&nbsp;<?php echo get_price_in_currency($course_price, 'USD', CURRENCY_RATES[0]); ?></p>
								<p class="info__content-value icon-currency icon-ruble_color-dark">≈&nbsp;<?php echo get_price_in_currency($course_price, 'RUB', CURRENCY_RATES[1]); ?></p>
							</div>
						</div>
					<div>
				<?php else: ?>
					<p class="course-list-item__meta-item">
						<span data-title="Цена:" class="course-list-item__meta-value course-list-item__meta-price"><?php echo $course_price; ?></span>
					</p>
				<?php endif; ?>
			</div>
		</div>
	</div>
</article>
<?php $counter++; ?>