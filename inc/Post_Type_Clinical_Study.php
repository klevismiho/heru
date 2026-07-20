<?php

namespace Heru\Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Post_Type_Clinical_Study {

	public function __construct() {
		add_action( 'init', [ $this, 'register_post_type' ] );
	}

	public function register_post_type() {

		$labels = [
			'name'               => 'Clinical Studies',
			'singular_name'      => 'Clinical Study',
			'menu_name'          => 'Clinical Studies',
			'add_new'            => 'Add New',
			'add_new_item'       => 'Add New Clinical Study',
			'edit_item'          => 'Edit Clinical Study',
			'new_item'           => 'New Clinical Study',
			'view_item'          => 'View Clinical Study',
			'search_items'       => 'Search Clinical Studies',
			'not_found'          => 'No clinical studies found',
			'not_found_in_trash' => 'No clinical studies found in Trash',
		];

		register_post_type( 'clinical-study', [
			'labels'        => $labels,
			'public'        => true,
			'show_in_rest'  => true,
			'has_archive'   => true,
			'menu_icon'     => 'dashicons-analytics',

			'supports'      => [
				'title',
				'editor',
				'thumbnail',
				'excerpt',
			],

		] );
	}
}