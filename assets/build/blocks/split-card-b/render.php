<?php

$wrapper_attributes = get_block_wrapper_attributes();

$eyebrow       = $attributes['eyebrow'] ?? 'NEWS & PRESS';
$title         = $attributes['title'] ?? 'What’s New with Heru';
$contact_label = $attributes['contactLabel'] ?? 'Media Inquiries:';
$email         = $attributes['email'] ?? 'pr@heru.net';
$email_url     = $attributes['emailUrl'] ?? 'mailto:pr@heru.net';
$phone         = $attributes['phone'] ?? '844-SEE-HERU (844-733-4378)';
$phone_url     = $attributes['phoneUrl'] ?? 'tel:844-733-4378';

$news_mode       = $attributes['newsMode'] ?? 'latest';
$selected_post_id = $attributes['selectedPostId'] ?? 0;

$news_post = null;

if ($news_mode === 'selected' && $selected_post_id) {

  $news_post = get_post($selected_post_id);
} else {

  $latest_posts = get_posts([
    'post_type'      => 'post',
    'posts_per_page' => 1,
    'post_status'    => 'publish',
  ]);

  if (!empty($latest_posts)) {
    $news_post = $latest_posts[0];
  }
}

?>

<section <?php echo $wrapper_attributes; ?>>

  <div class="section-presentation">

    <div class="section-eyebrow">
      <?php echo wp_kses_post($eyebrow); ?>
    </div>

    <div class="section-title">
      <?php echo wp_kses_post($title); ?>
    </div>

    <div class="contact-details">

      <div class="contact-label">
        <?php echo wp_kses_post($contact_label); ?>
      </div>

      <a href="<?php echo esc_url($email_url); ?>">
        <?php echo esc_html($email); ?>
      </a>

      <a href="<?php echo esc_url($phone_url); ?>">
        <?php echo esc_html($phone); ?>
      </a>

    </div>

  </div>


  <div class="section-details">

    <?php if ($news_post) : ?>

      <h1>
        <a href="<?php echo esc_url(get_permalink($news_post)); ?>">
          <?php echo esc_html(get_the_title($news_post)); ?>
        </a>
      </h1>

    <?php endif; ?>

    <div class="wp-block-button">
      <a
        class="wp-block-button__link wp-element-button"
        href="<?php echo $news_post ? esc_url(get_permalink($news_post)) : '#'; ?>">
        Read More
      </a>
    </div>

  </div>

</section>