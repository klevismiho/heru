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
	<div class="benefits-items">

		<div class="benefit-item">

			<div class="benefit-item-image">
				<img src="http://heru.local/wp-content/uploads/2026/07/Room.svg" alt="">
			</div>


			<div class="benefit-name">Automated Workflow</div>
			<ul>
				<li>Automated Pre-Testing</li>
				<li>Automated Reports</li>
				<li>Fitment Guide</li>
				<li>Virtual Assistant</li>
			</ul>

		</div>
		<div class="benefit-item">

			<div class="benefit-item-image">
				<img src="http://heru.local/wp-content/uploads/2026/07/fi_14677899.svg" alt="">
			</div>


			<div class="benefit-name">Clinically Validated</div>

			<ul>
				<li>95% correlation to legacy devices</li>
				<li>Backed by 15%+ years of R&amp;D</li>
				<li>FDA Class 1 Registered</li>
				<li>Extensive Clinical Validation</li>
			</ul>

		</div>
		<div class="benefit-item">

			<div class="benefit-item-image">
				<img src="http://heru.local/wp-content/uploads/2026/07/Rating.svg" alt="">
			</div>


			<div class="benefit-name">Multimodal Exams</div>

			<ul>
				<li>13 Pretest Exams</li>
				<li>Eye Tracking</li>
				<li>Video Playback</li>
				<li>Visual Acuity &amp; More</li>
			</ul>

		</div>
	</div>
</section>