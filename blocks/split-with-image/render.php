<?php

$wrapper_attributes = get_block_wrapper_attributes();
?>

<section <?php echo $wrapper_attributes; ?>>
  <div class="section-content">
    <h2 class="section-title">Prime Your<br>Practice</h2>
    <p>Heru Prime’s patented AI and VR-powered technology empowers ECPs with a fast, repeatable, and clinically validated platform for a streamlined diagnostic experience. With 13 modalities, and more in development, you’ll receive over the air updates at no additional cost as we innovate.</p>
    <div class="wp-block-buttons">
      <div class="wp-block-button">
        <a class="wp-block-button__link wp-element-button" href="#">
          Learn More
        </a>
      </div>
      <div class="wp-block-button is-style-outline">
        <a class="wp-block-button__link wp-element-button" href="#">
          Test Drive
        </a>
      </div>
    </div>
  </div>
  <div class="section-image">
    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/src/images/heru-product.png" alt="" />
  </div>
</section>