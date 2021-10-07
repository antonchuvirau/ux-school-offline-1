<?php
/*
 * Plugin Name: UX Mind School Courses
 * Author URI:  https://ux-mind.pro/
 * Author: Anton Chuvirau
 * Version: 1.0
 */

add_action( 'init', 'ums_courses');
add_action( 'init', 'ums_taxonomy_categories');

function ums_courses() {

	$labels = array(
		'name' => 'Курсы',
		'menu_name' => 'Курсы',
		'add_new' => 'Новый курс',
		'new_item_name' => 'Новый курс',
		'add_new_item' => 'Добавить новый'
	);

    register_post_type('ums-courses', array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => true,
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => true,
        'menu_position' => null,
        'supports' => array('title', 'editor', 'custom-fields', 'thumbnail' ),
		'taxonomies' => array('ums-categories'),
   ));
}

function ums_taxonomy_categories() {

			$labels = array(
				'name'                       => 'Направления',
				'singular_name'              => 'Направление',
				'menu_name'                  => 'Направления',
				'all_items'                  => 'Все направления',
				'parent_item'                => 'Главное направление',
				'parent_item_colon'          => 'Главное направление:',
				'new_item_name'              => 'Новое направление',
				'add_new_item'               => 'Добавить новое направление',
				'edit_item'                  => 'Редактировать направление',
				'update_item'                => 'Обновить направление',
				'view_item'                  => 'Смотреть направление',
				'separate_items_with_commas' => 'Separate Filters with commas',
				'add_or_remove_items'        => 'Добавить или удалить направление',
				'choose_from_most_used'      => 'Выбрать из наиболее используемых',
				'popular_items'              => 'Популярные направления',
				'search_items'               => 'Искать направления',
				'not_found'                  => 'Не найдено',
				'no_terms'                   => 'Нет направлений',
				'items_list'                 => 'Filters list',
				'items_list_navigation'      => 'Filters list navigation',
			);
			$args = array(
				'labels'                     => $labels,
				'hierarchical'               => true,
				'public'                     => true,
				'show_ui'                    => true,
				'show_admin_column'          => true,
				'show_in_nav_menus'          => false,
				'show_tagcloud'              => false,
			);
			register_taxonomy( 'ums-categories', array( 'ums-courses' ), $args );
}