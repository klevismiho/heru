<?php

$wrapper_attributes = get_block_wrapper_attributes();

$title = $attributes['title'] ?? '';

$clinical_studies = new WP_Query(
	[
		'post_type'      => 'clinical-study',
		'posts_per_page' => -1,
		'post_status'    => 'publish',
	]
);

?>

<section <?php echo $wrapper_attributes; ?>>

	<h2 class="section-title">
		<?php echo wp_kses_post( $title ); ?>
	</h2>

	<?php if ( $clinical_studies->have_posts() ) : ?>

		<div class="clinical-studies-list">

			<?php while ( $clinical_studies->have_posts() ) : $clinical_studies->the_post(); ?>

				<div class="clinical-study-item">

					<div class="item-image">
						<?php if ( has_post_thumbnail() ) : ?>
							<?php the_post_thumbnail( 'large' ); ?>
						<?php endif; ?>
					</div>

					<div class="item-content">

						<h3>
							<?php the_title(); ?>
						</h3>

						<?php if ( has_excerpt() ) : ?>
							<p>
								<?php echo esc_html( get_the_excerpt() ); ?>
							</p>
						<?php endif; ?>

					</div>


					<div class="item-button">

						<div class="wp-block-button">

							<a
								class="wp-block-button__link wp-element-button"
								href="<?php the_permalink(); ?>">
								Read More
							</a>

						</div>

					</div>

				</div>

			<?php endwhile; ?>

		</div>

	<?php endif; ?>

</section>

<?php wp_reset_postdata(); ?>