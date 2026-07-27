<?php

$plans = $attributes['plans'] ?? [];

$wrapper_attributes = get_block_wrapper_attributes();

?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="plans-items">

		<?php foreach ($plans as $plan) : ?>

			<div class="plan-item <?php echo ! empty($plan['featured']) ? 'best-item' : ''; ?>">

				<?php if (! empty($plan['title'])) : ?>
					<div class="benefit-name">
						<?php echo esc_html($plan['title']); ?>
					</div>
				<?php endif; ?>


				<?php if (! empty($plan['content'])) : ?>
					<div class="plan-content">
						<?php echo wp_kses_post($plan['content']); ?>
					</div>
				<?php endif; ?>


				<?php if (! empty($plan['buttonText'])) : ?>
					<div class="wp-block-button">
						<a
							class="wp-block-button__link wp-element-button"
							href="<?php echo esc_url($plan['buttonLink'] ?? '#'); ?>"
						>
							<?php echo esc_html($plan['buttonText']); ?>
						</a>
					</div>
				<?php endif; ?>

			</div>

		<?php endforeach; ?>

	</div>
</section>