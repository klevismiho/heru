<?php

$wrapper_attributes = get_block_wrapper_attributes();
?>

<section <?php echo $wrapper_attributes; ?>>
  <div class="cta-inner">
    <div class="section-content">
      <h2 class="section-title">Ready to Prime<br>your Practice?</h2>
      <p>Learn how Heru Prime can streamline your team’s productivity while providing an improved patient experience—without compromising the quality of care. </p>
      <div class="wp-block-buttons">
        <div class="wp-block-button">
          <a class="wp-block-button__link wp-element-button" href="#">
            Schedule a Demo Today
          </a>
        </div>
      </div>
    </div>
    <div class="section-image">
      <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/src/images/cta.jpg" alt="" />
    </div>
  </div>
</section>