<?php

$wrapper_attributes = get_block_wrapper_attributes();

$title = $attributes['title'] ?? '';

$blog_posts = new WP_Query(
	[
		'post_type'      => 'post',
		'posts_per_page' => 10,
		'post_status'    => 'publish',
	]
);

?>

<section <?php echo $wrapper_attributes; ?>>

	<h2 class="section-title">
		<?php echo wp_kses_post($title); ?>
	</h2>

	<?php if ($blog_posts->have_posts()) : ?>

		<div class="blog-list">

			<?php while ($blog_posts->have_posts()) : $blog_posts->the_post(); ?>

				<div class="blog-item">

					<div class="item-image">

						<?php if (has_post_thumbnail()) : ?>
							<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
						<?php endif; ?>

					</div>

					<div class="item-content">

						<h3>
							<a href="<?php the_permalink(); ?>">
								<?php the_title(); ?>
							</a>
						</h3>

						<div class="item-exerpt">
							<?php the_excerpt(); ?>
						</div>

						<div class="wp-block-button is-style-outline">
							<a class="wp-block-button__link wp-element-button" href="<?php the_permalink(); ?>">
								Read More → 
							</a>
						</div>

					</div>

				</div>

			<?php endwhile; ?>

		</div>

	<?php endif; ?>

</section>

<?php wp_reset_postdata(); ?>