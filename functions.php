<?php

namespace Heru\Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'HERU_THEME_DIR', get_template_directory() );
define( 'HERU_THEME_URI', get_template_directory_uri() );

spl_autoload_register( function ( $class ) {
	$prefix   = 'Heru\\Theme\\';
	$base_dir = HERU_THEME_DIR . '/inc/';

	if ( strncmp( $prefix, $class, strlen( $prefix ) ) !== 0 ) {
		return;
	}

	$relative_class = substr( $class, strlen( $prefix ) );
	$file            = $base_dir . str_replace( '\\', '/', $relative_class ) . '.php';

	if ( file_exists( $file ) ) {
		require $file;
	}
} );

new Theme_Setup();
new SVG_Support();
new Assets();
new Block_Registry();
new Block_Category();
