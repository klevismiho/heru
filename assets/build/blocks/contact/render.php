<?php

$wrapper_attributes = get_block_wrapper_attributes();

?>

<section <?php echo $wrapper_attributes; ?>>

	<div class="section-content">

		<?php if ($attributes['title']) : ?>
			<h2 class="section-title">
				<?php echo wp_kses_post($attributes['title']); ?>
			</h2>
		<?php endif; ?>


		<?php if ($attributes['description']) : ?>
			<p>
				<?php echo wp_kses_post($attributes['description']); ?>
			</p>
		<?php endif; ?>


		<?php if ($attributes['smallText']) : ?>
			<p>
				<small>
					<?php echo wp_kses_post($attributes['smallText']); ?>
				</small>
			</p>
		<?php endif; ?>

		<?php if (! empty($attributes['embedCode'])) : ?>

			<div class="embed-code">
				<?php echo $attributes['embedCode']; ?>
			</div>

		<?php endif; ?>

	</div>

	<div class="section-image">

		<?php if (! empty($attributes['image']['url'])) : ?>

			<img
				src="<?php echo esc_url($attributes['image']['url']); ?>"
				alt="<?php echo esc_attr($attributes['image']['alt']); ?>" />

		<?php endif; ?>

	</div>

</section>