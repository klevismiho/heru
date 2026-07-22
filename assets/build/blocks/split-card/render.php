<?php

$wrapper_attributes = get_block_wrapper_attributes();

$eyebrow     = $attributes['eyebrow'] ?? '';
$title       = $attributes['title'] ?? '';
$subtitle    = $attributes['subtitle'] ?? '';
$description = $attributes['description'] ?? '';

$list_items = $attributes['listItems'] ?? [];
$buttons    = $attributes['buttons'] ?? [];

$image = $attributes['image'] ?? [];

?>

<section <?php echo $wrapper_attributes; ?>>

	<div class="section-presentation">

		<div class="section-left">

			<div class="section-eyebrow">
				<?php echo wp_kses_post( $eyebrow ); ?>
			</div>


			<h2 class="section-title">
				<?php echo wp_kses_post( $title ); ?>
			</h2>


			<h3>
				<?php echo wp_kses_post( $subtitle ); ?>
			</h3>


			<?php if ( ! empty( $list_items ) ) : ?>

				<ul>

					<?php foreach ( $list_items as $item ) : ?>

						<li>
							<?php echo esc_html( $item ); ?>
						</li>

					<?php endforeach; ?>

				</ul>

			<?php endif; ?>

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



	<div class="section-details">

		<p>
			<?php echo wp_kses_post( $description ); ?>
		</p>


		<?php if ( ! empty( $image['url'] ) ) : ?>

			<img
				src="<?php echo esc_url( $image['url'] ); ?>"
				alt="<?php echo esc_attr( $image['alt'] ?? '' ); ?>"
			/>

		<?php endif; ?>

	</div>

</section>