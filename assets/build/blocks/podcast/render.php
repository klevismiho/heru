<?php

$background = ! empty( $attributes['background'] );

$wrapper_classes = $background
	? 'has-background'
	: '';

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => $wrapper_classes,
	]
);

$title       = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$iframe      = $attributes['iframe'] ?? '';
$buttons     = $attributes['buttons'] ?? [];

?>

<section <?php echo $wrapper_attributes; ?>>

	<div class="section-content">

		<?php if ( $title ) : ?>
			<h2 class="section-title">
				<?php echo wp_kses_post( $title ); ?>
			</h2>
		<?php endif; ?>


		<?php if ( $description ) : ?>
			<p>
				<?php echo wp_kses_post( $description ); ?>
			</p>
		<?php endif; ?>


		<?php if ( ! empty( $buttons ) ) : ?>
			<div class="wp-block-buttons">

				<?php foreach ( $buttons as $button ) : ?>

					<div class="wp-block-button<?php echo ! empty( $button['outlined'] ) ? ' is-style-outline' : ''; ?>">

						<a
							class="wp-block-button__link wp-element-button"
							href="<?php echo esc_url( $button['url'] ?? '#' ); ?>"
						>
							<?php echo esc_html( $button['text'] ?? '' ); ?>
						</a>

					</div>

				<?php endforeach; ?>

			</div>
		<?php endif; ?>

	</div>


	<?php if ( $iframe ) : ?>
		<div class="section-podcast-embed">
			<?php echo $iframe; ?>
		</div>
	<?php endif; ?>

</section>