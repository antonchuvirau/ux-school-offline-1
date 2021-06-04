<?php
/**
 * Template part for displaying portfolio item
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UX_Mind_School
 */

// Custom fields
$portfolio_full_img = get_field('ums_portfolio_full_img', $post->ID);
$portfolio_behance_link = get_field('ums_portfolio_behance_link', $post->ID);
$is_portfolio_behance = get_field('ums_portfolio_behance_bool', $post->ID);
$portfolio_tag = get_the_tags($post->ID);
$preview_image = get_field( 'ums_portfolio_preview_img', $post->ID );
$project_type = [
	'web' => 'Веб-дизайн',
	'mobile' => 'Мобильные приложения',
	'motion' => 'Моушн-дизайн',
	'start' => 'Дизайн старт',
	'interior' => 'Дизайн интерьеров',
	'photoshop' => 'Фотошоп для SMM',
	'tilda' => 'Дизайн на Tilda'
];
?>
<div class="col-12 col-md-6 col-lg-4 portfolio__col">
<?php if (!$is_portfolio_behance): ?>
	<a href="<?php echo esc_url($portfolio_full_img); ?>" data-fancybox="gallery" class="portfolio-item portfolio__item">
<?php else: ?>
	<a href="<?php echo esc_url($portfolio_behance_link); ?>" target="_blank" rel="noopener noreferrer" class="portfolio-item portfolio__item">
<?php endif; ?>
		<img src="<?php echo esc_url( $preview_image['sizes']['portfolio-image-size'] ); ?>" class="portfolio-item__img" alt="<?php the_title(); ?>">
		<div class="portfolio-item__meta">
			<p class="portfolio-item__type"><?php echo $project_type[$portfolio_tag[0]->slug]; ?></p><br>
			<p class="link portfolio-item__name<?php if ( !$is_portfolio_behance ): ?> portfolio-item__name_no-icon<?php endif; ?>">
				<?php
					$portfolio_title = get_the_title();
					$portfolio_title_pattern = '/\D*\:\s/';
					echo preg_replace($portfolio_title_pattern, '', $portfolio_title);
					if ( $is_portfolio_behance ):
				?>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16">
					<path fill="#fff" fill-rule="evenodd" d="M7.411 2.697l.59-.59a4.172 4.172 0 015.892 0 4.173 4.173 0 010 5.893l-1.769 1.767a4.138 4.138 0 01-2.945 1.221 4.138 4.138 0 01-2.946-1.22l-.59-.59L6.823 8l.59.59c.943.943 2.59.943 3.534 0l1.768-1.768a2.504 2.504 0 000-3.536 2.506 2.506 0 00-3.535 0l-.59.589-1.178-1.178zM9.18 8l-.59-.59c-.944-.943-2.59-.943-3.535 0L3.286 9.179a2.504 2.504 0 000 3.536 2.506 2.506 0 003.536 0l.59-.589 1.177 1.178-.589.59a4.153 4.153 0 01-2.946 1.218 4.152 4.152 0 01-2.946-1.219 4.174 4.174 0 010-5.892l1.768-1.768a4.137 4.137 0 012.946-1.22c1.113 0 2.16.434 2.946 1.22l.589.59L9.179 8z" clip-rule="evenodd"/>
				</svg>
				<?php endif; ?>
			</p>
		</div>
<?php if (!$is_portfolio_behance): ?>
	</a>
<?php else: ?>
	</a>
<?php endif; ?>
</div>