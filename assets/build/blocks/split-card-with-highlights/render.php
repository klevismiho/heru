<?php

$wrapper_attributes = get_block_wrapper_attributes();

$eyebrow     = $attributes['eyebrow'] ?? '';
$title       = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';

$buttons = $attributes['buttons'] ?? [];
$items   = $attributes['items'] ?? [];

$icon_image = $attributes['iconImage'] ?? [];

?>

<section <?php echo $wrapper_attributes; ?>>

	<div class="top-section">

		<div class="top-presentation">

			<div class="section-left">

				<div class="section-eyebrow">
					<?php echo wp_kses_post( $eyebrow ); ?>
				</div>


				<h2 class="section-title">
					<?php echo wp_kses_post( $title ); ?>
				</h2>

			</div>


			<div class="wp-block-buttons">

				<?php foreach ( $buttons as $button ) : ?>

					<div
						class="wp-block-button <?php echo ! empty( $button['outlined'] ) ? 'is-style-outline' : ''; ?>"
					>

						<a
							class="wp-block-button__link wp-element-button"
							href="<?php echo esc_url( $button['url'] ?? '#' ); ?>"
						>
							<?php echo esc_html( $button['text'] ?? '' ); ?>
						</a>

					</div>

				<?php endforeach; ?>

			</div>

		</div>



		<div class="top-details">

			<p>
				<?php echo wp_kses_post( $description ); ?>
			</p>


			<?php if ( ! empty( $icon_image['url'] ) ) : ?>

				<img
					src="<?php echo esc_url( $icon_image['url'] ); ?>"
					alt="<?php echo esc_attr( $icon_image['alt'] ?? '' ); ?>"
				/>

			<?php endif; ?>

		</div>

	</div>



	<div class="bottom-section">

		<?php foreach ( $items as $item ) : ?>

			<div class="item">

				<h3>
					<?php echo esc_html( $item['title'] ?? '' ); ?>
				</h3>


				<p>
					<?php echo wp_kses_post( $item['description'] ?? '' ); ?>
				</p>

			</div>

		<?php endforeach; ?>

	</div>

</section>