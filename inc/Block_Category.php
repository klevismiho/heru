<?php

namespace Heru\Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Block_Category {

	public function __construct() {
		add_filter( 'block_categories_all', array( $this, 'register_category' ), 10, 2 );
	}

	public function register_category( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'heru',
					'title' => 'Heru',
					'icon'  => null,
				),
			),
			$categories
		);
	}
}