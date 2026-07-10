<?php

$wrapper_attributes = get_block_wrapper_attributes();

$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$tabs = $attributes['tabs'] ?? [];

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

	<div class="tabs-container">
		<div class="tabs">
			<?php foreach ($tabs as $index => $tab) : ?>
				<button class="tab <?php echo $index === 0 ? 'is-active' : ''; ?>">
					<?php echo esc_html($tab['name'] ?? ''); ?>
				</button>
			<?php endforeach; ?>
		</div>

		<div class="tabs-content">
			<?php foreach ($tabs as $index => $tab) : ?>
				<div class="tab-content" style="<?php echo $index !== 0 ? 'display: none;' : ''; ?>">
					
					<?php if (!empty($tab['image']) && !empty($tab['image']['url'])) : ?>
						<div class="image-wrapper">
							<img 
								src="<?php echo esc_url($tab['image']['url']); ?>" 
								alt="<?php echo esc_attr($tab['image']['alt'] ?? ''); ?>" 
							/>
						</div>
					<?php endif; ?>

					<div class="content-wrapper">
						<?php if (!empty($tab['itemTitle'])) : ?>
							<h3><?php echo esc_html($tab['itemTitle']); ?></h3>
						<?php endif; ?>

						<?php if (!empty($tab['itemDescription'])) : ?>
							<p><?php echo esc_html($tab['itemDescription']); ?></p>
						<?php endif; ?>

						<?php if (!empty($tab['listItems']) && is_array($tab['listItems'])) : ?>
							<ul>
								<?php foreach ($tab['listItems'] as $item) : ?>
									<?php if (!empty($item)) : ?>
										<li><?php echo esc_html($item); ?></li>
									<?php endif; ?>
								<?php endforeach; ?>
							</ul>
						<?php endif; ?>

						<?php if ($tab['showButton'] !== false && !empty($tab['buttonText'])) : ?>
							<div class="wp-block-buttons">
								<div class="wp-block-button">
									<a 
										class="wp-block-button__link wp-element-button" 
										href="<?php echo esc_url($tab['buttonUrl'] ?? '#'); ?>">
										<?php echo esc_html($tab['buttonText']); ?>
									</a>
								</div>
							</div>
						<?php endif; ?>
					</div>

				</div>
			<?php endforeach; ?>
		</div>
	</div>

</section>