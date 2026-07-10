<?php

$wrapper_attributes = get_block_wrapper_attributes();

$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$benefits = $attributes['benefits'] ?? [];

?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="section-inner">
		<?php if ($title) : ?>
			<h2 class="section-title">
				<?php echo esc_html($title); ?>
			</h2>
		<?php endif; ?>

		<?php if ($description) : ?>
			<p>
				<?php echo esc_html($description); ?>
			</p>
		<?php endif; ?>

		<?php if (!empty($benefits)) : ?>
			<div class="benefits-items">
				<?php foreach ($benefits as $benefit) : ?>
					<div class="benefit-item">
						<?php if (!empty($benefit['iconUrl'])) : ?>
							<div class="benefit-item-image">
								<img
									src="<?php echo esc_url($benefit['iconUrl']); ?>"
									alt="" />
							</div>
						<?php endif; ?>

						<?php if (!empty($benefit['text'])) : ?>
							<div class="benefit-name">
								<?php echo esc_html($benefit['text']); ?>
							</div>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
</section>