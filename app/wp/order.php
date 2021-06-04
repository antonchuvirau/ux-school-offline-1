<?php
/**
 * Template part for displaying order modal
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
$queried_object = get_queried_object();
//Get course template id
$template_id = $queried_object->ID;
//Get course term id
$term_id = get_field('ums_course_parent_term', $template_id);
//Ger URL parameter
$course_post_id;
if (!isset($_GET['id'])):
	$courses_settings = array(
		'cat' => $term_id,
		'post_status' => 'publish',
		'posts_per_page' => 1,
		'orderby' => 'id',
		'order' => 'DESC'
	);
	$courses_query = new WP_Query($courses_settings);
	if ($courses_query->have_posts()): while ($courses_query->have_posts()): $courses_query->the_post();
		$course_post_id = $post->ID;
	endwhile; wp_reset_postdata(); endif;
else:
	$course_post_id = $_GET['id'];
endif;
$course_post_object = get_post($course_post_id);
$course_post_title = $course_post_object->post_title;
$course_post_address = get_field('ums_course_info_office', $course_post_id);
if ($course_post_address['value'] == 0){
	$course_post_address_link_value = 'https://yandex.by/map-widget/v1/-/CKe1fM8g';
}
else if ($course_post_address['value'] == 1){
	$course_post_address_link_value = 'https://yandex.by/maps/-/CCQxzEdGpC';
}
else if ($course_post_address['value'] == 2){
	$course_post_address_link_value = 'https://yandex.by/map-widget/v1/-/CKe1fNn7';
}
else if ($course_post_address['value'] == 3) {
	$course_post_address_link_value = 'https://ux-school.by/';
}
$course_post_address_value = $course_post_address['label'];
$course_post_time_start = get_field('ums_course_info_time_start', $course_post_id);
$course_post_time_end = get_field('ums_course_info_time_end', $course_post_id);
$course_post_days = get_field('ums_course_info_days', $course_post_id);
$course_post_day = get_field('ums_course_info_start', $course_post_id);
$course_post_date_day_object = DateTime::createFromFormat('d/m/Y', $course_post_day);
$course_post_date_day_object_string = $course_post_date_day_object->getTimestamp();
$course_start_date_string = date_i18n('j F', $course_post_date_day_object_string);

$tag_date_string = date_i18n('m.Y', $course_post_date_day_object_string);

$course_posts_timetable = get_schedule_template($course_post_id);
$free_course_posts_timetable = get_schedule_template($course_post_id);
//CRM data
$crm_course_full_title = $course_post_title . ', ' . str_replace('/', '.', $course_post_day);
if (get_field('ums_course_info_price_sale', $course_post_id)) {
	$crm_course_price = get_field('ums_course_info_price_sale', $course_post_id);
}
else {
	$crm_course_price = get_field('ums_course_info_price', $course_post_id);
}
$crm_course_type = get_field('ums_course_info_type', $course_post_id);
$crm_course_time = get_field('ums_course_info_time', $course_post_id);
$crm_course_date_field = get_field('ums_course_info_start', $course_post_id);
$crm_course_data_object = DateTime::createFromFormat('d/m/Y', $crm_course_date_field);
$crm_course_date = $crm_course_data_object->getTimestamp();
$crm_course_address = $course_post_address_value;
$crm_course_lecturer_field = get_field('ums_course_info_lecturer', $course_post_id);
$crm_course_lecturer = $crm_course_lecturer_field->post_title;
?>
<div id="order-modal" class="modal order-modal">
	<p class="modal__title order-modal__title">Оставить заявку</p>
	<?php if ($term_id != 3):
		echo do_shortcode('[contact-form-7 id="131" crm-tag-date="'. $tag_date_string .'" crm-status-id="32222008" crm-course-full-title="' . $crm_course_full_title . '" crm-course-lecturer="' . $crm_course_lecturer . '" crm-course-address="' . $crm_course_address . '" crm-course-date="' . $crm_course_date . '" crm-course-time="' . $crm_course_time . '" crm-course-price="' . $crm_course_price . '" crm-course-type="' . $crm_course_type . '" ums-course-date="' . $course_start_date_string . '" ums-course-name="' . $course_post_title . '" ums-course-timetable="' . $course_posts_timetable . '" html_class="form modal__form order-modal__form" autocomplete="off" title="Заявка на курс"]');
	else:
		echo do_shortcode('[contact-form-7 id="859" crm-tag-date="'. $tag_date_string .'" crm-status-id="34702138" crm-course-full-title="' . $crm_course_full_title . '" crm-course-lecturer="' . $crm_course_lecturer . '" crm-course-address="' . $crm_course_address . '" crm-course-date="' . $crm_course_date . '" crm-course-time="' . $crm_course_time . '" crm-course-price="' . $crm_course_price . '" crm-course-type="' . $crm_course_type . '" ums-course-date="' . $course_start_date_string . '" ums-course-name="' . $course_post_title . '" ums-course-timetable="' . $free_course_posts_timetable . '" ums-course-address="' . $course_post_address_value . '" ums-course-address-link="' . $course_post_address_link_value . '" autocomplete="off" html_class="form modal__form order-modal__form" title="Заявка на бесплатное занятие"]');
	endif; ?>
	<label class="checkbox privacy-checkbox modal__privacy-checkbox">
		<input type="checkbox" checked class="checkbox__input privacy-checkbox__input">
		<p class="checkbox__name">Я согласен с условиями обработки <button type="button" data-modal="#personal-data-modal" class="link checkbox__link">персональных данных</button></p>
	</label>
	<?php if ($term_id != 3): get_template_part('template-parts/modal/order', 'process'); endif; ?>
</div>