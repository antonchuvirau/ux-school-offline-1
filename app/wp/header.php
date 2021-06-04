<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package UX_Mind_School
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
	<meta name="format-detection" content="telephone=no">
	<!-- Preload fonts -->
	<link rel="preload" href="<?php echo esc_url( get_template_directory_uri() ); ?>/fonts/Manrope-ExtraBold.woff2" as="font" type="font/woff2" crossorigin>
	<link rel="preload" href="<?php echo esc_url( get_template_directory_uri() ); ?>/fonts/Manrope-Regular.woff2" as="font" type="font/woff2" crossorigin>
	<link rel="preload" href="<?php echo esc_url( get_template_directory_uri() ); ?>/fonts/Manrope-Light.woff2" as="font" type="font/woff2" crossorigin>
	<!-- Preload fonts -->
	<?php wp_head(); ?>
	<?php
	// BEGIN OPTIONS
	$telephone_number = get_field( 'telephone_number', 'option' );
	$logo_light = get_field( 'logo_light', 'option' );
	$logo_dark = get_field( 'logo_dark', 'option' );
	// END OPTIONS
	?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<!-- Begin header -->
	<header class="<?php if (is_page_template('home.php') || is_page(12) || is_page_template(array('course.php', 'event.php'))): ?>header<?php else: ?>header header_style-default<?php endif; ?>">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-8 col-sm-6 col-xl-2">
					<a href="<?php echo esc_url( get_home_url() ); ?>" class="logo header__logo">
						<?php if (is_page_template('home.php') || is_page(12) ||  is_page_template(array('course.php', 'event.php'))): ?>
						<img src="<?php echo esc_url( $logo_light['url'] ); ?>" alt="<?php echo esc_attr( $logo_light['alt'] ); ?>">
						<?php else: ?>
						<img src="<?php echo esc_url( $logo_dark['url'] ); ?>" alt="<?php echo esc_attr( $logo_dark['alt'] ); ?>">
						<?php endif; ?>
					</a>
				</div>
				<div class="col-4 col-sm-6 d-xl-none">
					<div class="m-options">
						<?php if (is_page_template('home.php') || is_page(12) ||  is_page_template(array('course.php', 'event.php'))): ?>
							<a href="tel:+375<?php echo preg_replace('/[^0-9]/', '', $telephone_number); ?>" class="m-options__btn m-options__phone-link m-options__phone-link_m-right"></a>
							<button type="button" class="m-options__btn m-options__menu-btn"></button>
						<?php else: ?>
							<a href="tel:+375<?php echo preg_replace('/[^0-9]/', '', $telephone_number); ?>" class="m-options__btn m-options__phone-link m-options__phone-link_style-gradient m-options__phone-link_m-right"></a>
							<button type="button" class="m-options__btn m-options__menu-btn m-options__menu-btn_style-gradient"></button>
						<?php endif; ?>
					</div>
				</div>
				<div class="d-none d-xl-block col-xl-10">
					<div class="header__info">
						<nav class="menu header__menu">
							<ul class="list menu__wrapper">
								<?php
								$primary_menu_arg = array(
									'theme_location'=>'Secondary',
									'menu'=>'Header',
									'container'=>'',
									'items_wrap'=>'%3$s'
								);
								if (is_home() || is_front_page() || is_page(12) || is_page_template(array('course.php', 'event.php'))):
									$primary_menu_arg['theme_location'] = 'Primary';
								endif;
								wp_nav_menu($primary_menu_arg);
								?>
							</ul>
						</nav>
						<a href="tel:+375<?php echo preg_replace('/[^0-9]/', '', $telephone_number); ?>" class="<?php if (is_home() ||  is_front_page() || is_page(12) || is_page_template(array('course.php', 'event.php'))): ?>header__phone-number<?php else: ?>header__phone-number header__phone-number_style-dark<?php endif; ?>">+375 <?php echo $telephone_number; ?><span>Viber&nbsp;&nbsp;Telegram&nbsp;&nbsp;WhatsApp</span></a>
					</div>
				</div>
			</div>
		</div>
	</header>
	<!-- End header -->