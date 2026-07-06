<?php

$attributes  = $attributes ?? array();
$heading     = $attributes['heading'] ?? 'Trusted By Industry Experts.';
$button_text = $attributes['buttonText'] ?? 'See the Difference';
$button_url  = $attributes['buttonUrl'] ?? '#';
$logos       = $attributes['logos'] ?? array();

$wrapper_attributes = get_block_wrapper_attributes();
?>

<section <?php echo $wrapper_attributes; ?>>

	<h2 class="section-title"><?php echo esc_html( $heading ); ?></h2>

	<div class="logo-grid__logos">
		<?php foreach ( $logos as $logo ) : ?>
			<div class="logo-grid__item">
				<?php if ( ! empty( $logo['url'] ) ) : ?>
					<a href="<?php echo esc_url( $logo['url'] ); ?>">
						<img src="<?php echo esc_url( $logo['src'] ); ?>" alt="<?php echo esc_attr( $logo['alt'] ?? '' ); ?>" />
					</a>
				<?php else : ?>
					<img src="<?php echo esc_url( $logo['src'] ); ?>" alt="<?php echo esc_attr( $logo['alt'] ?? '' ); ?>" />
				<?php endif; ?>
			</div>
		<?php endforeach; ?>
	</div>

	<div class="wp-block-button">
		<a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( $button_url ); ?>">
			<?php echo esc_html( $button_text ); ?>
		</a>
	</div>

</section>