<?php

$wrapper_attributes = get_block_wrapper_attributes();

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';

$buttons = $attributes['buttons'] ?? [];
$slides = $attributes['slides'] ?? [];

?>

<section <?php echo $wrapper_attributes; ?>>


  <div class="section-presentation">


    <div class="section-left">


      <?php if ($eyebrow) : ?>
        <div class="section-eyebrow">
          <?php echo wp_kses_post($eyebrow); ?>
        </div>
      <?php endif; ?>


      <?php if ($title) : ?>
        <h2 class="section-title">
          <?php echo wp_kses_post($title); ?>
        </h2>
      <?php endif; ?>


      <?php if ($description) : ?>
        <p>
          <?php echo wp_kses_post($description); ?>
        </p>
      <?php endif; ?>


    </div>



    <?php if (!empty($buttons)) : ?>

      <div class="wp-block-buttons">

        <?php foreach ($buttons as $button) : ?>

          <?php
          $text = $button['text'] ?? '';
          $url = $button['url'] ?? '#';
          $outlined = !empty($button['outlined']);
          ?>

          <div class="wp-block-button <?php echo $outlined ? 'is-style-outline' : ''; ?>">

            <a
              class="wp-block-button__link wp-element-button"
              href="<?php echo esc_url($url); ?>">
              <?php echo esc_html($text); ?>
            </a>

          </div>

        <?php endforeach; ?>

      </div>

    <?php endif; ?>


  </div>





  <div class="section-slides">


    <div class="embla">


      <div class="embla__viewport">


        <div class="embla__container">


          <?php foreach ($slides as $slide) : ?>

            <?php
            $slide_description = $slide['description'] ?? '';
            $icon = $slide['icon'] ?? '';
            $footer = $slide['footer'] ?? '';
            ?>


            <div class="embla__slide">


              <div class="slide-description">

                <?php if ($slide_description) : ?>

                  <p>
                    <?php echo wp_kses_post($slide_description); ?>
                  </p>

                <?php endif; ?>

              </div>



              <div class="slide-footer">


                <?php if ($icon) : ?>

                  <div class="slide-logo">

                    <img
                      src="<?php echo esc_url($icon); ?>"
                      alt="" />

                  </div>

                <?php endif; ?>



                <?php if ($footer) : ?>

                  <p>
                    <?php echo wp_kses_post($footer); ?>
                  </p>

                <?php endif; ?>


              </div>


            </div>


          <?php endforeach; ?>


        </div>


      </div>


    </div>

    <div class="embla__dots"></div>


  </div>


</section>