<?php

namespace Heru\Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Taxonomy_People_Group {

	public function __construct() {
		add_action( 'init', [ $this, 'register_taxonomy' ] );
	}

	public function register_taxonomy() {

		$labels = [
			'name'              => 'People Groups',
			'singular_name'     => 'People Group',
			'search_items'      => 'Search People Groups',
			'all_items'         => 'All People Groups',
			'edit_item'         => 'Edit People Group',
			'update_item'       => 'Update People Group',
			'add_new_item'      => 'Add New People Group',
			'new_item_name'     => 'New People Group Name',
			'menu_name'         => 'People Groups',
		];

		register_taxonomy( 'people_group', [ 'people' ], [
			'labels'            => $labels,
			'public'            => true,
			'show_in_rest'      => true,
			'hierarchical'      => false,

			'rewrite' => [
				'slug' => 'people-group',
			],
		] );
	}
}