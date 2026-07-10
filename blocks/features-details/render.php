<?php

$wrapper_attributes = get_block_wrapper_attributes();

$title       = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$features    = $attributes['features'] ?? [];
$contents    = $attributes['contents'] ?? [];

?>

<section <?php echo $wrapper_attributes; ?>>

  <div class="section-header">
    <h2 class="section-title">
      <?php echo esc_html( $title ); ?>
    </h2>
    <p><?php echo esc_html( $description ); ?></p>
  </div>

  <div class="section-inner">
    <div class="features-list">
      <?php foreach ( $features as $index => $feature ) : ?>
        <div class="feature <?php echo 0 === $index ? 'is-open' : ''; ?>">
          <div class="feature-header">
            <?php if ( $feature['isNew'] ?? false ) : ?>
              <span class="new-label">NEW</span>
            <?php endif; ?>
            <div class="feature-header-inner">
              <h3 class="feature-name">
                <?php echo esc_html( $feature['name'] ?? '' ); ?>
              </h3>
            </div>
          </div>
          <div class="feature-summary">
            <p><?php echo wp_kses_post( $feature['summary'] ?? '' ); ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <div class="features-content">
      <?php foreach ( $contents as $index => $content ) : ?>
        <div class="feature-content <?php echo 0 === $index ? 'is-active' : ''; ?>">
          <h3><?php echo esc_html( $content['title'] ?? '' ); ?></h3>
          <p>
            <?php echo wp_kses_post( $content['description'] ?? '' ); ?>
          </p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

</section>