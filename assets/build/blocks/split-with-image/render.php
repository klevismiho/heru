<?php

$wrapper_attributes = get_block_wrapper_attributes();

$title       = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$buttons     = $attributes['buttons'] ?? [];
$image       = $attributes['image'] ?? null;

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


	<div class="section-image">

		<?php if ( ! empty( $image['url'] ) ) : ?>

			<img
				src="<?php echo esc_url( $image['url'] ); ?>"
				alt="<?php echo esc_attr( $image['alt'] ?? '' ); ?>"
			/>

		<?php endif; ?>

	</div>

</section>