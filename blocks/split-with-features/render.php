<?php

$wrapper_attributes = get_block_wrapper_attributes();

$title       = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$buttons     = $attributes['buttons'] ?? [];
$features    = $attributes['features'] ?? [];

?>

<section <?php echo $wrapper_attributes; ?>>

	<div class="section-content">

		<?php if ( ! empty( $title ) ) : ?>
			<h2 class="section-title">
				<?php echo wp_kses_post( $title ); ?>
			</h2>
		<?php endif; ?>

		<?php if ( ! empty( $description ) ) : ?>
			<p>
				<?php echo wp_kses_post( $description ); ?>
			</p>
		<?php endif; ?>


		<?php if ( ! empty( $buttons ) ) : ?>

			<div class="wp-block-buttons">

				<?php foreach ( $buttons as $button ) : ?>

					<div class="wp-block-button <?php echo ! empty( $button['outlined'] ) ? 'is-style-outline' : ''; ?>">

						<a
							class="wp-block-button__link wp-element-button"
							href="<?php echo esc_url( $button['url'] ); ?>">
							<?php echo esc_html( $button['text'] ); ?>
						</a>

					</div>

				<?php endforeach; ?>

			</div>

		<?php endif; ?>

	</div>


	<div class="features">

		<p>
			When paired with Heru's Visual Acuity test, PretestPro™ reduces time spent running four crucial pretests so that you can complete 50% of your pretesting in 90 seconds; all guided by Nora, our friendly fixation target.
		</p>


		<?php if ( ! empty( $features ) ) : ?>

			<ul class="features-list">

				<?php foreach ( $features as $feature ) : ?>

					<li>
						<?php echo esc_html( $feature ); ?>
					</li>

				<?php endforeach; ?>

			</ul>

		<?php endif; ?>

	</div>

</section>