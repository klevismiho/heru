<?php

$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$benefits = $attributes['benefits'] ?? [];

$has_background = $attributes['hasBackground'] ?? false;
$heading_level = $attributes['headingLevel'] ?? 'h2';

$allowed_heading_levels = [
	'h1',
	'h2',
];

if (!in_array($heading_level, $allowed_heading_levels, true)) {
	$heading_level = 'h2';
}

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => $has_background ? 'has-background' : '',
	]
);

?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="section-inner">

		<?php if ($title) : ?>
			<<?php echo esc_attr($heading_level); ?> class="section-title">
				<?php echo wp_kses_post($title); ?>
			</<?php echo esc_attr($heading_level); ?>>
		<?php endif; ?>


		<?php if ($description) : ?>
			<p>
				<?php echo wp_kses_post($description); ?>
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