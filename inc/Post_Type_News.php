<?php

namespace Heru\Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Post_Type_News {

	public function __construct() {
		add_action( 'init', [ $this, 'register_post_type' ] );
	}

	public function register_post_type() {

		$labels = [
			'name'               => 'News',
			'singular_name'      => 'News',
			'menu_name'          => 'News',
			'add_new'            => 'Add News',
			'add_new_item'       => 'Add New News',
			'edit_item'          => 'Edit News',
			'new_item'           => 'New News',
			'view_item'          => 'View News',
			'search_items'       => 'Search News',
			'not_found'          => 'No news found',
			'not_found_in_trash' => 'No news found in Trash',
		];

		register_post_type( 'news', [
			'labels' => $labels,

			'public'            => true,
			'show_in_rest'      => true,
			'has_archive'       => true,

			'rewrite' => [
				'slug' => 'news',
			],

			'menu_icon' => 'dashicons-megaphone',

			'supports' => [
				'title',
				'editor',
				'thumbnail',
				'excerpt',
			],
		] );
	}
}