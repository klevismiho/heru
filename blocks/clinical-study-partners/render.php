<?php

if (! defined('ABSPATH')) {
    exit;
}

$partners = get_field('partners');

if (! $partners) {
    return;
}

?>

<div class="clinical-study-partners-widget">

    <h4>
        <?php echo esc_html__('Partners', 'heru'); ?>
    </h4>

    <div class="clinical-study-partners">

        <?php foreach ($partners as $partner) : ?>

            <?php
            $logo = $partner['logo'] ?? null;
            $link = $partner['link'] ?? '';
            ?>

            <div class="clinical-study-partner">

                <?php if ($logo) : ?>

                    <?php if ($link) : ?>
                        <a href="<?php echo esc_url($link); ?>" target="_blank" rel="noopener noreferrer">
                    <?php endif; ?>

                        <?php
                        echo wp_get_attachment_image(
                            $logo['ID'],
                            'medium',
                            false,
                            [
                                'class' => 'clinical-study-partner-logo',
                                'alt'   => esc_attr($logo['alt'] ?? ''),
                            ]
                        );
                        ?>

                    <?php if ($link) : ?>
                        </a>
                    <?php endif; ?>

                <?php endif; ?>

            </div>

        <?php endforeach; ?>

    </div>

</div>