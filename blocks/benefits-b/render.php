<?php

$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$benefits = $attributes['benefits'] ?? [];

$wrapper_attributes = get_block_wrapper_attributes();

?>

<section <?php echo $wrapper_attributes; ?>>
	<?php if (! empty($benefits)) : ?>

		<div class="benefits-items">

			<?php foreach ($benefits as $benefit) : ?>

				<div class="benefit-item">

					<?php if (! empty($benefit['iconUrl'])) : ?>
						<div class="benefit-item-image">
							<img
								src="<?php echo esc_url($benefit['iconUrl']); ?>"
								alt="">
						</div>
					<?php endif; ?>


					<?php if (! empty($benefit['title'])) : ?>
						<div class="benefit-name">
							<?php echo esc_html($benefit['title']); ?>
						</div>
					<?php endif; ?>


					<?php if (! empty($benefit['list'])) : ?>
						<div class="benefit-list">
							<?php echo wp_kses_post($benefit['list']); ?>
						</div>
					<?php endif; ?>

				</div>

			<?php endforeach; ?>

		</div>

	<?php endif; ?>

</section>