<?php

$wrapper_attributes = get_block_wrapper_attributes();

$eyebrow  = $attributes['eyebrow'] ?? 'FIXATION TARGET';
$title     = $attributes['title'] ?? 'Hi! I’m Nora. Sit back, relax, and keep your eyes on me.';
$video_url = $attributes['videoUrl'] ?? '';
?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="section-content">
		<div class="section-eyebrow">
			<?php echo wp_kses_post( $eyebrow ); ?>
		</div>

		<h2 class="section-title">
			<?php echo wp_kses_post( $title ); ?>
		</h2>
	</div>

	<?php if ( $video_url ) : ?>
		<div class="section-video">
			<video
				src="<?php echo esc_url( $video_url ); ?>"
        controls
			></video>
		</div>
	<?php endif; ?>
</section>