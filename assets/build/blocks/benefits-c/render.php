<?php

$title = $attributes['title'] ?? '';
$benefits = $attributes['benefits'] ?? [];

$wrapper_attributes = get_block_wrapper_attributes();

?>

<section <?php echo $wrapper_attributes; ?>>

	<h2 class="section-title">
		<?php echo wp_kses_post($title); ?>
	</h2>

	<div class="benefits-items">

		<?php foreach ($benefits as $benefit) : ?>

			<div class="benefit-item">

				<?php if (!empty($benefit['image'])) : ?>

					<div class="benefit-item-image">
						<img
							src="<?php echo esc_url($benefit['image']); ?>"
							alt="<?php echo esc_attr($benefit['title'] ?? ''); ?>"
						>
					</div>

				<?php endif; ?>


				<?php if (!empty($benefit['title'])) : ?>

					<div class="benefit-name">
						<?php echo esc_html($benefit['title']); ?>
					</div>

				<?php endif; ?>


				<?php if (!empty($benefit['description'])) : ?>

					<p>
						<?php echo wp_kses_post($benefit['description']); ?>
					</p>

				<?php endif; ?>


			</div>

		<?php endforeach; ?>

	</div>

</section>