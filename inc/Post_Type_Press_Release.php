<?php

namespace Heru\Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Post_Type_Press_Release {

	public function __construct() {
		add_action( 'init', [ $this, 'register_post_type' ] );
	}

	public function register_post_type() {

		$labels = [
			'name'               => 'Press Releases',
			'singular_name'      => 'Press Release',
			'menu_name'          => 'Press Releases',
			'add_new'            => 'Add New',
			'add_new_item'       => 'Add New Press Release',
			'edit_item'          => 'Edit Press Release',
			'new_item'           => 'New Press Release',
			'view_item'          => 'View Press Release',
			'search_items'       => 'Search Press Releases',
			'not_found'          => 'No press releases found',
			'not_found_in_trash' => 'No press releases found in Trash',
		];

		register_post_type( 'press-release', [
			'labels' => $labels,

			'public'             => true,
			'show_in_rest'       => true,
			'has_archive'        => true,
			'rewrite'            => [
				'slug' => 'press-releases',
			],

			'menu_icon'          => 'dashicons-megaphone',

			'supports' => [
				'title',
				'editor',
				'thumbnail',
				'excerpt',
			],
		] );
	}
}