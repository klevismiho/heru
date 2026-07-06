<?php
$args = [
  'post_type'      => 'testimonial',
  'posts_per_page' => 10,
];

$query = new WP_Query($args);

$wrapper_attributes = get_block_wrapper_attributes();
?>

<section <?php echo $wrapper_attributes; ?>>
  <div class="section-header">
    <h2 class="section-title">Trusted by Industry Experts</h2>
    <div class="embla__dots"></div>
  </div>
  <div class="embla">
    <div class="embla__viewport">
      <div class="embla__container">

        <?php if ($query->have_posts()) : ?>
          <?php while ($query->have_posts()) : $query->the_post(); ?>

            <div class="embla__slide">
              <div class="testimonial">
                <div class="testimonial__image">
                  <?php the_post_thumbnail(); ?>
                </div>

                <div class="testimonial__content">
                  <?php echo wp_kses_post(get_the_content()); ?>
                  <div class="testimonial__author">
                    -- <?php the_title(); ?>
                  </div>
                </div>
              </div>
            </div>

          <?php endwhile; ?>
          <?php wp_reset_postdata(); ?>
        <?php endif; ?>

      </div>
    </div>
  </div>
</section>