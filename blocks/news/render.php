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
		<?php echo wp_kses_post( $title ); ?>
	</h2>

	<?php if ( $news_posts->have_posts() ) : ?>

		<div class="news-list">

			<?php while ( $news_posts->have_posts() ) : $news_posts->the_post(); ?>

				<div class="news-item">

					<div class="item-image">

						<?php if ( has_post_thumbnail() ) : ?>
							<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
						<?php endif; ?>

					</div>

					<div class="item-content">

						<div class="item-date">
							<?php echo esc_html( get_the_date( 'F Y' ) ); ?>
						</div>

						<h3>
							<a href="<?php the_permalink(); ?>">
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