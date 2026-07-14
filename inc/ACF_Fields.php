<?php

namespace Heru\Theme;

if (! defined('ABSPATH')) {
  exit;
}

class ACF_Fields
{
  public function __construct()
  {
    add_action('acf/include_fields', [$this, 'register_field_groups']);
  }

  public function register_field_groups()
  {
    if (! function_exists('acf_add_local_field_group')) {
      return;
    }

    acf_add_local_field_group(array(
      'key' => 'group_6a4ca99fbb1b0',
      'title' => 'People',
      'fields' => array(
        array(
          'key' => 'field_6a4ca99f87ad6',
          'label' => 'Person Title',
          'name' => 'person_title',
          'aria-label' => '',
          'type' => 'text',
          'instructions' => '',
          'required' => 0,
          'conditional_logic' => 0,
          'wrapper' => array(
            'width' => '',
            'class' => '',
            'id' => '',
          ),
          'default_value' => '',
          'maxlength' => '',
          'placeholder' => '',
          'prepend' => '',
          'append' => '',
        ),
      ),
      'location' => array(
        array(
          array(
            'param' => 'post_type',
            'operator' => '==',
            'value' => 'people',
          ),
        ),
      ),
      'menu_order' => 0,
      'position' => 'normal',
      'style' => 'default',
      'label_placement' => 'top',
      'instruction_placement' => 'label',
      'hide_on_screen' => '',
      'active' => true,
      'description' => '',
      'show_in_rest' => 1,
      'display_title' => '',
      'allow_ai_access' => false,
      'ai_description' => '',
    ));
  }
}
