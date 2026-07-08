<?php

$wrapper_attributes = get_block_wrapper_attributes();

$image       = $attributes['image'] ?? null;
$eyebrow     = $attributes['eyebrow'] ?? '';
$title       = $attributes['title'] ?? '';
$subtitle    = $attributes['subtitle'] ?? '';
$description = $attributes['description'] ?? '';
$buttons     = $attributes['buttons'] ?? [];

?>

<section <?php echo $wrapper_attributes; ?>>

	<div class="section-image">

		<?php if ( ! empty( $image['url'] ) ) : ?>

			<img
				src="<?php echo esc_url( $image['url'] ); ?>"
				alt="<?php echo esc_attr( $image['alt'] ?? '' ); ?>"
			/>

		<?php endif; ?>

	</div>


	<div class="section-presentation">


		<?php if ( $eyebrow ) : ?>
			<div class="section-eyebrow">
				<?php echo wp_kses_post( $eyebrow ); ?>
			</div>
		<?php endif; ?>


		<?php if ( $title ) : ?>
			<h2 class="section-title">
				<?php echo wp_kses_post( $title ); ?>
			</h2>
		<?php endif; ?>


		<?php if ( $subtitle ) : ?>
			<h3>
				<?php echo wp_kses_post( $subtitle ); ?>
			</h3>
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

</section>