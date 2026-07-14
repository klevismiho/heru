<?php

$background = ! empty($attributes['background']);

$wrapper_classes = $background
	? 'has-background'
	: '';

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => $wrapper_classes,
	]
);

$testimonial       = $attributes['testimonial'] ?? '';
$person = $attributes['person'] ?? '';

?>

<section <?php echo $wrapper_attributes; ?>>

	<?php if ($testimonial) : ?>
		<h2 class="section-title">
			<?php echo wp_kses_post($testimonial); ?>
		</h2>
	<?php endif; ?>
	<?php if ($person) : ?>
		<p>
			<?php echo wp_kses_post($person); ?>
		</p>
	<?php endif; ?>
</section>