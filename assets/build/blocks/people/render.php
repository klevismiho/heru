<?php

$wrapper_attributes = get_block_wrapper_attributes();

$selected_group = isset($attributes['selectedGroup'])
  ? intval($attributes['selectedGroup'])
  : 0;

$args = [
  'post_type'      => 'people',
  'posts_per_page' => 10,
  'orderby'        => 'menu_order',
  'order'          => 'ASC',
];

if ($selected_group) {
  $args['tax_query'] = [
    [
      'taxonomy' => 'people_group',
      'field'    => 'term_id',
      'terms'    => $selected_group,
    ],
  ];
}

$people_query = new WP_Query($args);
?>


<section <?php echo $wrapper_attributes; ?>>
  <div class="section-content">
    <h2 class="section-title"><?php echo esc_html($attributes['title']); ?></h2>

    <p>
      <?php echo wp_kses_post($attributes['description']); ?>
    </p>

    <?php if (!empty($attributes['buttons'])) : ?>

      <div class="wp-block-buttons">

        <?php foreach ($attributes['buttons'] as $button) : ?>

          <div class="wp-block-button is-style-outline">
            <a
              class="wp-block-button__link wp-element-button"
              href="<?php echo esc_url($button['url']); ?>">
              <?php echo esc_html($button['text']); ?>
            </a>
          </div>

        <?php endforeach; ?>

      </div>

    <?php endif; ?>

  </div>

  <div class="people-list">
    <?php if ($people_query->have_posts()) : ?>
      <?php while ($people_query->have_posts()) : $people_query->the_post(); ?>

        <div class="person">
          <div class="person-summary js-person-toggle">

            <?php if (!empty($attributes['showImages']) && has_post_thumbnail()) : ?>

              <div class="person-image">
                <?php the_post_thumbnail('medium'); ?>
              </div>

            <?php endif; ?>

            <div class="person-details">
              <h3 class="person-name">
                <?php the_title(); ?>
              </h3>
              <?php if (!empty(get_field('person_title'))) : ?>
                <div class="person-title"><?php the_field('person_title'); ?></div>
              <?php endif; ?>
            </div>
          </div>

          <div class="person-bio">
            <?php the_content(); ?>
          </div>
        </div>

      <?php endwhile; ?>

      <?php wp_reset_postdata(); ?>
    <?php endif; ?>
  </div>
</section>