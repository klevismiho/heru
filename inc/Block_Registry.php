<?php

namespace Heru\Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Block_Registry {

	public function __construct() {
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	public function register_blocks() {
		register_block_type( HERU_THEME_DIR . '/blocks/hero' );
		register_block_type( HERU_THEME_DIR . '/blocks/logo-grid' );
		register_block_type( HERU_THEME_DIR . '/blocks/split-card-with-highlights' );
		register_block_type( HERU_THEME_DIR . '/blocks/split-with-image' );
	}
}