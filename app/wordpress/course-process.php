<?php
/**
 * Template part for displaying course process
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */
?>
<section class="section process">
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-4">
				<h3 class="d-none d-lg-block section__title title title_style-dark title_size-m process__title">
					Вот так обычно проводятся занятия:
					<!-- <svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M13.247 35.9095L3.43652 26.7179L4.81668 16.9701C4.81668 15.987 5.40078 15.1434 6.23779 14.764L10.8383 15.7579C10.8383 14.7749 11.4224 13.9313 12.2594 13.5519L16.7347 14.5204L16.8599 14.5458V3.63673C16.8599 2.65369 17.444 1.81006 18.2811 1.43066L22.6311 17.9882L22.8816 18.1822C23.992 18.1822 24.9566 20.6064 24.9566 20.6064L24.959 20.6246L13.247 35.9095Z"
							fill="#EF9645" />
						<path
							d="M10.8388 19.125C10.1054 19.7905 9.63446 20.7444 9.63446 21.8183C9.63446 22.7311 9.98011 23.5553 10.5317 24.1929C10.121 24.9408 9.3394 25.4547 8.43014 25.4547C7.10056 25.4547 6.02148 24.3686 6.02148 23.0305V15.7577C6.02148 15.4026 6.10217 15.068 6.23826 14.7638C6.61522 13.9214 7.45343 13.3335 8.43014 13.3335C9.75971 13.3335 10.8388 14.4196 10.8388 15.7577V19.125Z"
							fill="#FFDC5D" />
						<path
							d="M0 6.06047C0 4.72229 1.07908 3.63623 2.40865 3.63623C3.73823 3.63623 4.81731 4.72229 4.81731 6.06047V23.0302C4.81731 24.0471 5.27254 25.0411 6.02043 25.7223C7.42708 26.8859 9.44433 26.9865 10.8377 25.7199C11.081 25.4968 11.3002 25.2508 11.476 24.9708L11.4724 24.9671C11.7145 25.1065 12.0433 25.4544 13.2476 25.4544H16.303C14.1243 27.109 12.6454 30.2908 12.6454 33.9393C12.6454 34.2738 12.9152 34.5453 13.2476 34.5453C13.58 34.5453 13.8498 34.2738 13.8498 33.9393C13.8498 29.2617 16.4836 25.4544 19.7208 25.4544C20.5795 25.5502 20.7409 24.2423 19.8714 24.2423H13.2476C11.918 24.2423 10.8389 23.1562 10.8389 21.818C10.8389 20.4799 11.918 19.3938 13.2476 19.3938H22.8822C24.048 19.3938 24.6658 20.1162 24.9597 20.6241C25.1114 20.8871 25.1825 21.0956 25.1861 21.109L26.4952 25.4544C26.6192 25.8605 27.0721 27.7223 26.9902 28.1102C26.9902 33.9393 21.3346 39.9999 14.4519 39.9999C6.57924 39.9999 0 33.6362 0 25.4544C0.00963461 25.4629 0 6.06047 0 6.06047Z"
							fill="#FFDC5D" />
						<path
							d="M16.8603 18.1818H13.2473C12.8234 18.1818 12.4223 18.2691 12.043 18.4048V14.5455C12.043 14.1903 12.1237 13.8558 12.2597 13.5515C12.6367 12.7091 13.4749 12.1212 14.4516 12.1212C15.7812 12.1212 16.8603 13.2073 16.8603 14.5455V18.1818ZM18.0646 18.1818V2.42424C18.0646 2.06909 18.1453 1.73455 18.2814 1.4303C18.6583 0.587879 19.4965 0 20.4733 0C21.8028 0 22.8819 1.08606 22.8819 2.42424V18.1818H18.0646Z"
							fill="#FFDC5D" />
					</svg> -->
				</h3>
				<h3 class="d-lg-none section__title title title_style-dark title_size-m process__title">
					Как проходят занятия
				</h3>
			</div>
			<div class="col-12 col-md-6 col-lg-2">
				<div class="process__item">
					<div class="process__icon">
						<img src="<?php echo get_template_directory_uri(); ?>/img/icons/ums-process-icon-1.svg" alt="<?php echo get_bloginfo('name'); ?>">
					</div>
					<div class="process__content">
						<p class="process__name">Разбор ДЗ</p>
						<p class="process__text">В начале занятия разбираем основные моменты из&nbsp;готовых домашних заданий</p>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-6 col-lg-2">
				<div class="process__item">
					<div class="process__icon">
						<img src="<?php echo get_template_directory_uri(); ?>/img/icons/ums-process-icon-2.svg" alt="<?php echo get_bloginfo('name'); ?>">
					</div>
					<div class="process__content">
						<p class="process__name">Теория</p>
						<p class="process__text">Изучаем новый теоретический материал, разбитый на&nbsp;несколько тем</p>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-6 col-lg-2">
				<div class="process__item">
					<div class="process__icon">
						<img src="<?php echo get_template_directory_uri(); ?>/img/icons/ums-process-icon-3.svg" alt="<?php echo get_bloginfo('name'); ?>">
					</div>
					<div class="process__content">
						<p class="process__name">Кофе-брейк</p>
						<p class="process__text">5-7 минут отдыха за&nbsp;чаем&nbsp;или&nbsp;кофе-) </p>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-6 col-lg-2">
				<div class="process__item">
					<div class="process__icon">
						<img src="<?php echo get_template_directory_uri(); ?>/img/icons/ums-process-icon-4.svg" alt="<?php echo get_bloginfo('name'); ?>">
					</div>
					<div class="process__content">
						<p class="process__name">Практика</p>
						<p class="process__text">Показываем «на&nbsp;пальцах», как&nbsp;применять новые знания</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>