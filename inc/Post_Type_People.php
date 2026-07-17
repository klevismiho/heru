<?php

namespace Heru\Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Post_Type_People {

	public function __construct() {
		add_action( 'init', [ $this, 'register_post_type' ] );
	}

	public function register(): void {
		add_action(
			'init',
			[ $this, 'register_post_type' ]
		);
	}

	public function register_post_type(): void {
		register_post_type(
			'people',
			$this->get_arguments()
		);
	}

	public function get_arguments(): array {

		return [
			'labels' => [
				'name'               => 'People',
				'singular_name'      => 'Person',
				'menu_name'          => 'People',
				'add_new'            => 'Add New',
				'add_new_item'       => 'Add New Person',
				'edit_item'          => 'Edit Person',
				'new_item'           => 'New Person',
				'view_item'          => 'View Person',
				'search_items'       => 'Search People',
				'not_found'          => 'No people found',
				'not_found_in_trash' => 'No people found in Trash',
			],

			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => true,
			'menu_icon'    => 'dashicons-groups',

			'supports' => [
				'title',
				'editor',
				'thumbnail',
			],
		];
	}
}