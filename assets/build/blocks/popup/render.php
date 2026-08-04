<?php

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => 'heru-popup',
	]
);

$enabled = $attributes['enabled'] ?? true;

if ( ! $enabled ) {
	return;
}

$title       = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$show_once   = $attributes['showOnce'] ?? true;
$delay       = $attributes['delay'] ?? 0;
$buttons = $attributes['buttons'] ?? [];

?>

<div
	<?php echo $wrapper_attributes; ?>
	data-show-once="<?php echo esc_attr($show_once ? 'true' : 'false'); ?>"
	data-delay="<?php echo esc_attr($delay); ?>">

	<div class="heru-popup__content">

		<button
			class="heru-popup__close"
			type="button"
			aria-label="<?php esc_attr_e('Close popup', 'heru'); ?>">
			&times;
		</button>


		<?php if ($title) : ?>
			<h2>
				<?php echo wp_kses_post($title); ?>
			</h2>
		<?php endif; ?>


		<?php if ($description) : ?>
			<p>
				<?php echo wp_kses_post($description); ?>
			</p>
		<?php endif; ?>

		<?php if (! empty($buttons)) : ?>

			<div class="wp-block-buttons">

				<?php foreach ($buttons as $button) : ?>

					<div class="wp-block-button <?php echo ! empty($button['outlined']) ? 'is-style-outline' : ''; ?>">

						<a
							class="wp-block-button__link wp-element-button"
							href="<?php echo esc_url($button['url'] ?? '#'); ?>">
							<?php echo esc_html($button['text'] ?? ''); ?>
						</a>

					</div>

				<?php endforeach; ?>

			</div>

		<?php endif; ?>


	</div>

</div>