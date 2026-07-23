<?php

$wrapper_attributes = get_block_wrapper_attributes();

$title = $attributes['title'] ?? '';

$news_posts = new WP_Query(
	[
		'post_type'      => 'press-release',
		'posts_per_page' => 2,
		'post_status'    => 'publish',
	]
);

?>

<section <?php echo $wrapper_attributes; ?>>

	<h2 class="section-title">
		<?php echo wp_kses_post($title); ?>
	</h2>
	<div class="items">

		<?php if ($news_posts->have_posts()) : ?>

			<?php while ($news_posts->have_posts()) : $news_posts->the_post(); ?>

				<div class="item">

					<h3>
						<a href="<?php the_permalink(); ?>">
							<?php the_title(); ?>
						</a>
					</h3>

					<div class="item-meta">
						<?php echo get_the_date(); ?>
					</div>

					<p>
						<?php echo wp_trim_words(get_the_excerpt(), 30); ?>
					</p>

					<div class="wp-block-button">
						<a
							class="wp-block-button__link wp-element-button"
							href="<?php the_permalink(); ?>">
							Read More
						</a>
					</div>

				</div>

			<?php endwhile; ?>

		<?php endif; ?>

	</div>
</section>

<?php wp_reset_postdata(); ?>