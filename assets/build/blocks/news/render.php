<?php

$wrapper_attributes = get_block_wrapper_attributes();

$title = $attributes['title'] ?? '';

$news_posts = new WP_Query(
	[
		'post_type'      => 'news',
		'posts_per_page' => 10,
		'post_status'    => 'publish',
	]
);

?>

<section <?php echo $wrapper_attributes; ?>>

	<h2 class="section-title">
		<?php echo wp_kses_post($title); ?>
	</h2>

	<?php if ($news_posts->have_posts()) : ?>

		<div class="news-list">

			<?php while ($news_posts->have_posts()) : $news_posts->the_post(); ?>

				<?php
				$author = get_field('author');
				$source = get_field('source');
				$external_link = get_field('external_link');
				?>

				<div class="news-item">

					<div class="item-image">

						<?php if (has_post_thumbnail()) : ?>
							<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
						<?php endif; ?>

					</div>

					<div class="item-content">

						<div class="item-meta">
							<?php if ($author || $source) : ?>

								<?php if ($author) : ?>
									<span class="item-author">
										By <?php echo esc_html($author); ?>
									</span> -
								<?php endif; ?>

								<?php if ($source) : ?>
									<span class="item-source">
										<?php echo esc_html($source); ?>
									</span> -
								<?php endif; ?>
							<?php endif; ?>
							<span class="item-date">
								<?php echo esc_html(get_the_date('F Y')); ?>
							</span>
						</div>

						<h3>
							<?php if ($external_link) : ?>
								<a href="<?php echo $external_link; ?>" target="_blank">
								<?php else : ?>
									<a href="<?php the_permalink(); ?>">
									<?php endif; ?>
									<?php the_title(); ?>
									</a>
						</h3>

					</div>

				</div>

			<?php endwhile; ?>

		</div>

	<?php endif; ?>

</section>

<?php wp_reset_postdata(); ?>