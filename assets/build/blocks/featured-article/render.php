<?php

$wrapper_attributes = get_block_wrapper_attributes();

$eyebrow = $attributes['eyebrow'] ?? 'NEWS & PRESS';

$news_mode        = $attributes['newsMode'] ?? 'latest';
$selected_post_id = $attributes['selectedPostId'] ?? 0;

$news_post = null;


if ($news_mode === 'selected' && $selected_post_id) {

  $news_post = get_post($selected_post_id);
} else {

  $latest_posts = get_posts(
    [
      'post_type'      => 'post',
      'posts_per_page' => 1,
      'post_status'    => 'publish',
    ]
  );

  if (! empty($latest_posts)) {
    $news_post = $latest_posts[0];
  }
}

?>

<section <?php echo $wrapper_attributes; ?>>

  <div class="section-presentation">

    <div class="section-eyebrow">
      <?php echo wp_kses_post($eyebrow); ?>
    </div>


    <?php if ($news_post) : ?>

      <h1 class="section-title">
        <a href="<?php echo get_permalink($news_post); ?>"><?php echo esc_html(get_the_title($news_post)); ?></a>
      </h1>


      <div class="contact-details">

        <div class="contact-label">
          <?php
          $categories = get_the_category($news_post->ID);

          if (! empty($categories)) {
            echo esc_html($categories[0]->name);
          } else {
            echo 'NEWS';
          }
          ?>
        </div>


        <div class="item-meta">
          <?php echo esc_html(get_the_date('l, F j Y', $news_post)); ?>
        </div>


        <div class="reading-time">
          2 min read →
        </div>

      </div>

    <?php endif; ?>

  </div>


  <div class="section-details">

    <?php if ($news_post) : ?>

      <div class="post-excerpt">
        <?php
        echo wp_kses_post(
          wp_trim_words(
            $news_post->post_excerpt
              ? $news_post->post_excerpt
              : $news_post->post_content,
            30
          )
        );
        ?>
      </div>

      <div class="wp-block-button">

        <a
          class="wp-block-button__link wp-element-button"
          href="<?php echo esc_url(get_permalink($news_post)); ?>">
          Read More
        </a>

      </div>

    <?php endif; ?>

  </div>

</section>