<?php

$wrapper_attributes = get_block_wrapper_attributes();

$video_url = $attributes['videoUrl'] ?? '';

?>

<section <?php echo $wrapper_attributes; ?>>

	<?php if ($video_url) : ?>

		<div class="video-wrapper">

			<video
				class="hero-video"
				src="<?php echo esc_url($video_url); ?>"
				playsinline
			></video>


			<button class="video-play-button" aria-label="Play video">
				<svg
					width="80"
					height="80"
					viewBox="0 0 80 80"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						cx="40"
						cy="40"
						r="40"
						fill="white"
					/>

					<path
						d="M32 25L58 40L32 55V25Z"
						fill="black"
					/>
				</svg>
			</button>

		</div>

	<?php endif; ?>

</section>