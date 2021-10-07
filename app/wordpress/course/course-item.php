<?php
/**
 * Template part for displaying short course
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */

// Получаем id поста курса
$course_post_id = $post->ID;
$course_template = get_field('ums_course_page_template', $course_post_id);
print_r($course_template);
/* Timetable query variables */
$template_id = $course_template[0];
$term_id = get_field('ums_course_parent_term', $template_id);
/* Timetable query variables */
$ums_today_date_object = new DateTime();
$ums_today_date_object_timestamp = $ums_today_date_object->getTimestamp();
$ums_course_full = get_field('ums_course_full', $course_post_id);
$ums_date_string = get_field('ums_course_info_start');
$ums_date_object = DateTime::createFromFormat('d/m/Y', $ums_date_string);
$ums_date_object_string = $ums_date_object->getTimestamp();
//Find the closest date
$ums_dates_array = [];
$ums_test_course_dates = get_field('ums_test_course_dates', 2);
foreach ($ums_test_course_dates as $item):
	$date_object = DateTime::createFromFormat('d/m/Y', $item['date']);
	$date_object_timestamp = $date_object->getTimestamp();
	$dates_difference = $date_object_timestamp - $ums_today_date_object_timestamp;
	if ($dates_difference >= 0){
		array_push($ums_dates_array, $date_object_timestamp);
	}
endforeach;
asort($ums_dates_array);
//Course type
$course_type = array(
	'Занятия в классе' => 0,
	'Онлайн' => 1,
	'Дистанционное обучение' => 2
);
//Course custom fields
$ums_course_full_price = get_field('ums_course_info_price', $course_post_id);
$ums_course_sale_price = get_field('ums_course_info_price_sale', $course_post_id);
$ums_course_free = get_field('ums_course_free', $course_post_id);
$ums_course_test = get_field('ums_course_test', 2);
?>
<?php if ($term_id == 3 && $counter == 0 && $test_course_template && $ums_course_test): ?>
<article style="display: none;" data-modal-id="#test-course-modal" class="course-list__row course-list__test-item">
	<div class="course-list-item">
		<div class="course-list-item__img"><img src="<?php echo get_template_directory_uri(); ?>/img/ums-try.svg" alt="<?php the_title(); ?>"></div>
		<div class="course-list-item__info">
			<p class="course-list-item__title">
				<span class="course-list-item__title-value">Пробное занятие: Знакомство&nbsp;с&nbsp;дизайном<br>(онлайн)</span>
				<?php if (get_field('ums_course_info_type')): ?>
				<span class="course-list-item__type course-list-item__type_theme-<?php echo $course_type[get_field('ums_course_info_type')]; ?>"><?php the_field('ums_course_info_type'); ?></span>
				<?php endif; ?>
			</p>
			<div class="course-list-item__select">
				<p class="course-list-item__select-name"><?php echo date_i18n('j F', $ums_dates_array[0]); ?>
					<svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.833496 1.99984C0.833496 1.26346 1.43045 0.666504 2.16683 0.666504C2.90321 0.666504 3.50016 1.26346 3.50016 1.99984C3.50016 2.73622 2.90321 3.33317 2.16683 3.33317C1.43045 3.33317 0.833496 2.73622 0.833496 1.99984Z" fill="#665D5D"/>
						<path d="M6.66683 1.99984C6.66683 1.26346 7.26378 0.666504 8.00016 0.666504C8.73654 0.666504 9.3335 1.26346 9.3335 1.99984C9.3335 2.73622 8.73654 3.33317 8.00016 3.33317C7.26378 3.33317 6.66683 2.73622 6.66683 1.99984Z" fill="#665D5D"/>
						<path d="M12.5002 1.99984C12.5002 1.26346 13.0971 0.666504 13.8335 0.666504C14.5699 0.666504 15.1668 1.26346 15.1668 1.99984C15.1668 2.73622 14.5699 3.33317 13.8335 3.33317C13.0971 3.33317 12.5002 2.73622 12.5002 1.99984Z" fill="#665D5D"/>
					</svg>
				</p>
			</div>
			<div class="course-list-item__meta">
				<p class="course-list-item__meta-item"><span data-title="Старт:" class="course-list-item__meta-value">1,5 часа</span></p>
				<p class="course-list-item__meta-item"><span data-title="Мест:" class="course-list-item__meta-value">11 из 30</span></p>
				<p class="course-list-item__meta-item"><span data-title="Цена:" class="course-list-item__meta-value course-list-item__meta-price">Бесплатно</p>
			</div>
		</div>
	</div>
</article>
<?php endif; ?>
<article <?php if ($term_max_num_pages && $counter == 0): ?>data-max-num-pages="<?php echo $term_max_num_pages; ?>"<?php endif; ?> class="course-list__row <?php if ($term_max_num_pages && $counter == 0): ?>course-list__row_first<?php endif; ?>">
	<div class="course-list-item">
		<a href="<?php echo esc_url(get_page_link($template_id)) . '?id=' . $course_post_id; ?>" class="course-list-item__img"><img src="<?php echo esc_url(get_field('ums_course_icon', $template_id)); ?>" alt="<?php the_title(); ?>"></a>
		<div class="course-list-item__info">
			<a href="<?php echo esc_url(get_page_link($template_id)) . '?id=' . $course_post_id; ?>" class="course-list-item__title">
				<span class="course-list-item__title-value"><?php the_title(); ?></span>
				<?php if (get_field('ums_course_info_type')): ?>
				<p class="course-list-item__type">
					<?php if (get_field('ums_course_info_time')): ?>
					<span class="course-list-item__type-value course-list-item__type-value_theme-default"><?php the_field('ums_course_info_time'); ?></span>
					<?php endif; ?>
					<span class="course-list-item__type-value course-list-item__type-value_theme-<?php echo $course_type[get_field('ums_course_info_type')]; ?>"><?php the_field('ums_course_info_type'); ?></span>
				</p>
				<?php endif; ?>
			</a>
			<div class="course-list-item__select">
				<p class="course-list-item__select-name"><?php echo date_i18n('j F', $ums_date_object_string); ?>
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
						<?php
						$dropdown_office_field = get_field('ums_course_info_office', $course_post_id);
						if ($dropdown_office_field):
						?>
						<li class="dropdown-course-info__item">
							<p class="dropdown-course-info__name">Адрес</p>
							<p class="dropdown-course-info__value">
								<?php echo $dropdown_office_field['label']; ?></br>
								<?php if ($dropdown_office_field['value'] != 3): ?>
									<button data-map-index="<?php echo $dropdown_office_field['value']; ?>" class="office-route-button link dropdown-course-info__value-link dropdown-course-info__value-btn dropdown-course-info__value-link_size-s" type="button">Карта</button>
								<?php endif; ?>
							</p>
						</li>
						<?php endif; $dropdown_lecturer_field = get_field('ums_course_info_lecturer', $course_post_id); ?>
						<li class="dropdown-course-info__item">
							<p class="dropdown-course-info__name">Преподаватель</p>
							<p class="dropdown-course-info__value">
								<?php if ($dropdown_lecturer_field): ?>
									<button type="button" data-post-id="<?php echo $course_post_id; ?>" class="link dropdown-course-info__lecturer dropdown-course-info__value-link"><?php echo $dropdown_lecturer_field->post_title; ?></button>
								<?php else: ?>
									<a href="<?php echo esc_url(get_page_link(1641)); ?>" class="link dropdown-course-info__lecturer dropdown-course-info__value-link">Наши преподаватели</a>
								<?php endif; ?>
							</p>
						</li>
						<li class="dropdown-course-info__item">
							<a href="<?php echo esc_url(get_page_link($template_id)) . '?id=' . $course_post_id; ?>" class="btn dropdown-course-info__btn">На страницу курса</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="course-list-item__meta">
				<?php
					$ums_current_course_date_object = DateTime::createFromFormat('d/m/Y', get_field('ums_course_info_start',$course_post_id ));
					$ums_current_course_date_object_timestamp = $ums_current_course_date_object->getTimestamp();
					$ums_current_course_date_string = date_i18n("j F", $ums_current_course_date_object_timestamp);
				?>
				<p class="d-xl-none course-list-item__meta-item"><span data-title="Старт:" class="course-list-item__meta-value"><?php echo $ums_current_course_date_string; ?> (<?php the_field('ums_course_info_length', $course_post_id); ?>)</span></p>
				<p class="d-none d-xl-flex course-list-item__meta-item"><span class="course-list-item__meta-value"><?php the_field('ums_course_info_length', $course_post_id); ?></span></p>
				<p class="course-list-item__meta-item"><span data-title="Мест:" class="course-list-item__meta-value<?php if ($ums_course_full): ?> course-list-item__meta-value_data-null<?php endif; ?>"><?php if ($ums_course_full): echo 'Группа набрана'; else: ?><?php the_field('ums_course_info_places', $course_post_id); endif; ?></span></p>
				<?php
				if ($ums_course_sale_price && !$ums_course_free):
				?>
				<div class="course-list-item__meta-item">
					<p data-title="Цена:" class="course-list-item__meta-value course-list-item__meta-price" data-price="<?php echo $ums_course_sale_price; ?>"><span class="course-list-item__meta-inner"><?php echo $ums_course_full_price; ?></span><?php echo $ums_course_sale_price; ?><sup><?php echo CURRENCY_CODE; ?></sup></p>
					<div class="info course-list-item__meta-info">
						<svg class="info__icon" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="7.5" cy="8" r="7.5" fill="#E5E0EB"/>
							<path d="M5 7.5L7.5 10L10 7.5" stroke="#3B2E49"/>
						</svg>
						<div class="info__content">
							<p class="info__content-value icon-currency icon-dollar_color-dark">≈&nbsp;<?php echo get_price_in_currency($ums_course_sale_price, 'USD', CURRENCY_RATES[0]); ?></p>
							<p class="info__content-value icon-currency icon-ruble_color-dark">≈&nbsp;<?php echo get_price_in_currency($ums_course_sale_price, 'RUB', CURRENCY_RATES[1]); ?></p>
						</div>
					</div>
				</div>
				<?php elseif (!$ums_course_sale_price && !$ums_course_free): ?>
					<div class="course-list-item__meta-item">
						<p data-title="Цена:" data-price="<?php echo $ums_course_full_price; ?>" class="course-list-item__meta-value course-list-item__meta-price"><?php echo $ums_course_full_price; ?><sup><?php echo CURRENCY_CODE; ?></sup></p>
						<div class="info course-list-item__meta-info">
							<svg class="info__icon" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="7.5" cy="8" r="7.5" fill="#E5E0EB"/>
								<path d="M5 7.5L7.5 10L10 7.5" stroke="#3B2E49"/>
							</svg>
							<div class="info__content">
								<p class="info__content-value icon-currency icon-dollar_color-dark">≈&nbsp;<?php echo get_price_in_currency($ums_course_full_price, 'USD', CURRENCY_RATES[0]); ?></p>
								<p class="info__content-value icon-currency icon-ruble_color-dark">≈&nbsp;<?php echo get_price_in_currency($ums_course_full_price, 'RUB', CURRENCY_RATES[1]); ?></p>
							</div>
						</div>
					<div>
				<?php else: ?>
					<p class="course-list-item__meta-item">
						<span data-title="Цена:" class="course-list-item__meta-value course-list-item__meta-price"><?php echo $ums_course_full_price; ?></span>
					</p>
				<?php endif; ?>
			</div>
		</div>
	</div>
</article>
<?php $counter+=1; ?>