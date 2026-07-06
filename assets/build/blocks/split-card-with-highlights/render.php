<?php

$wrapper_attributes = get_block_wrapper_attributes();
?>

<section <?php echo $wrapper_attributes; ?>>

  <div class="top-section">
    <div class="top-presentation">
      <div class="section-left">
        <div class="section-eyebrow">ABOUT HERU</div>
        <h2 class="section-title">Clinical Excellence</h2>
      </div>

      <div class="wp-block-buttons">
        <div class="wp-block-button">
          <a class="wp-block-button__link wp-element-button" href="#">
            Shop Heru
          </a>
        </div>
        <div class="wp-block-button is-style-outline">
          <a class="wp-block-button__link wp-element-button" href="#">
            Meet the Team
          </a>
        </div>
      </div>
    </div>
    <div class="top-details">
      <p>Our technology is the culmination of over 15 years of clinical and scientific research and development led by Heru’s Founder and CEO Mohamed Abou Shousha, MD, PhD, associate professor of clinical ophthalmology, Bascom Palmer Eye Institute.</p>
      <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/src/images/about-logo.svg" alt="" />
    </div>
  </div>

  <div class="bottom-section">
    <div class="item">
      <h3>For ECPs</h3>
      <p>Increased exam lane throughput with less time spent on manual, variable pre-testing  and more time on patient care.</p>
    </div>
      <div class="item">
      <h3>For Technicians</h3>
      <p>Faster, guided workflows with cleaner outputs and fewer “what happened here?” moments</p>
    </div>
      <div class="item">
      <h3>For Patients</h3>
      <p>Higher confidence in the practice and process when the experience feels modern and guided.</p>
    </div>
  </div>

</section>