<?php
/**
 * Template part for displaying popup
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
$date_field = get_field('popup_date', 2);
$date_object = DateTime::createFromFormat('d/m/Y', $date_field);
$date_string = $date_object->getTimestamp();
$time = get_field('popup_time', 2);
$date = date_i18n('j F Y', $date_string);
$full_date_string = $date . ', ' . $time;
$address = get_field('popup_address', 2);
$name = get_field('popup_title', 2);

//CRM
$event_name = $name . ', ' . str_replace('/', '.', $date_field);
$event_timestamp = $date_string;
$event_tag_date = date_i18n('m.Y', $date_object);
?>
<div id="event-modal" class="modal event-modal">
    <svg class="event-modal__icon" width="124" height="150" viewBox="0 0 124 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M75 150C116.421 150 150 116.421 150 75C150 33.5786 116.421 0 75 0C33.5786 0 0 33.5786 0 75C0 116.421 33.5786 150 75 150Z" fill="#FFCC4D"/>
        <path d="M74.9994 87.5C59.9035 87.5 49.8869 85.7416 37.4994 83.3333C34.6702 82.7875 29.166 83.3333 29.166 91.6666C29.166 108.333 48.3119 129.167 74.9994 129.167C101.683 129.167 120.833 108.333 120.833 91.6666C120.833 83.3333 115.329 82.7833 112.499 83.3333C100.112 85.7416 90.0952 87.5 74.9994 87.5Z" fill="#664500"/>
        <path d="M37.5 91.6665C37.5 91.6665 50 95.8332 75 95.8332C100 95.8332 112.5 91.6665 112.5 91.6665C112.5 91.6665 104.167 108.333 75 108.333C45.8333 108.333 37.5 91.6665 37.5 91.6665Z" fill="white"/>
        <path d="M49.9987 70.8338C55.7517 70.8338 60.4154 64.3046 60.4154 56.2504C60.4154 48.1963 55.7517 41.6671 49.9987 41.6671C44.2457 41.6671 39.582 48.1963 39.582 56.2504C39.582 64.3046 44.2457 70.8338 49.9987 70.8338Z" fill="#664500"/>
        <path d="M100.004 70.8338C105.757 70.8338 110.42 64.3046 110.42 56.2504C110.42 48.1963 105.757 41.6671 100.004 41.6671C94.2506 41.6671 89.5869 48.1963 89.5869 56.2504C89.5869 64.3046 94.2506 70.8338 100.004 70.8338Z" fill="#664500"/>
    </svg>
    <p class="event-modal__title"><span class="event-modal__title-note">Мероприятие</span><?php echo get_field('popup_title', 2); ?></p>
    <p class="event-modal__desc"><?php echo get_field('popup_description', 2); ?></p>
    <div class="event-modal__details">
        <p class="event-modal__details-item event-modal__details-date">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.0625 12H24.9375C25.2469 12 25.5 12.2531 25.5 12.5625V24.75C25.5 25.9922 24.4922 27 23.25 27H6.75C5.50781 27 4.5 25.9922 4.5 24.75V12.5625C4.5 12.2531 4.75313 12 5.0625 12ZM25.5 9.9375V8.25C25.5 7.00781 24.4922 6 23.25 6H21V3.5625C21 3.25313 20.7469 3 20.4375 3H18.5625C18.2531 3 18 3.25313 18 3.5625V6H12V3.5625C12 3.25313 11.7469 3 11.4375 3H9.5625C9.25313 3 9 3.25313 9 3.5625V6H6.75C5.50781 6 4.5 7.00781 4.5 8.25V9.9375C4.5 10.2469 4.75313 10.5 5.0625 10.5H24.9375C25.2469 10.5 25.5 10.2469 25.5 9.9375Z" fill="#CCC6D1"/>
            </svg>
            <?php echo $full_date_string; ?>
        </p>
        <p class="event-modal__details-item event-modal__details-address">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15C13.625 15 12.5 13.875 12.5 12.5C12.5 11.125 13.625 10 15 10C16.375 10 17.5 11.125 17.5 12.5C17.5 13.875 16.375 15 15 15ZM15 2.5C9.75 2.5 5 6.525 5 12.75C5 16.9 8.3375 21.8125 15 27.5C21.6625 21.8125 25 16.9 25 12.75C25 6.525 20.25 2.5 15 2.5Z" fill="#CCC6D1"/>
            </svg>
            <?php echo $address; ?>
        </p>
    </div>
    <div class="event-modal__form">
        <?php echo do_shortcode('[contact-form-7 id="1839" title="Попап" html_class="form modal__form event-modal__form" crm-tag-date="'. $event_tag_date .'" crm-course-date="'. $event_timestamp .'" crm-course-full-title="'. $event_name .'" ums-event-name="' . $name . '" ums-event-date="' . $full_date_string . '" ums-event-address="' . $address . '"]'); ?>
        <label class="checkbox privacy-checkbox modal__privacy-checkbox">
		    <input type="checkbox" checked class="checkbox__input privacy-checkbox__input">
		    <p class="checkbox__name">Я согласен с условиями обработки <button type="button" data-modal="#personal-data-modal" class="link checkbox__link">персональных данных</button></p>
	    </label>
    </div>
</div>