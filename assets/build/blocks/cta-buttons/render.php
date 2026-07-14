<?php

$wrapper_attributes = get_block_wrapper_attributes();

$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$buttons     = $attributes['buttons'] ?? [];

?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="section-header">
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
	</div>

	<?php if (! empty($buttons)) : ?>
		<div class="wp-block-buttons">

			<?php foreach ($buttons as $button) : ?>

				<div class="wp-block-button<?php echo ! empty($button['outlined']) ? ' is-style-outline' : ''; ?>">

					<a
						class="wp-block-button__link wp-element-button"
						href="<?php echo esc_url($button['url'] ?? '#'); ?>">
						<?php echo esc_html($button['text'] ?? ''); ?>
					</a>

				</div>

			<?php endforeach; ?>

		</div>
	<?php endif; ?>

</section>