<?php

$attributes        = $attributes ?? array();
$title             = $attributes['title'] ?? '';
$description       = $attributes['description'] ?? '';
$subtitle          = $attributes['subtitle'] ?? '';
$buttons = $attributes['buttons'] ?? array();
$statistics        = $attributes['statistics'] ?? array();

$wrapper_attributes = get_block_wrapper_attributes();
?>

<section <?php echo $wrapper_attributes; ?>>

  <div class="section-subtitle"><?php echo esc_html($subtitle); ?></div>
  <h1 class="section-title"><?php echo wp_kses_post($title); ?></h1>
  <p><?php echo wp_kses_post($description); ?></p>

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

  <div class="hero-statistics">
    <?php foreach ($statistics as $item) : ?>
      <div class="statistic-item">
        <div class="statistic-number"><?php echo wp_kses_post($item['number'] ?? ''); ?></div>
        <div class="statistic-label"><?php echo wp_kses_post($item['label'] ?? ''); ?></div>
      </div>
    <?php endforeach; ?>
  </div>

</section>