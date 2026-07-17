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

$block_registry = new Block_Registry(
    HERU_THEME_DIR . '/assets/build/blocks'
);
$block_registry->register();

new Block_Category();
new Post_Type_Testimonial();

$post_type_people = new Post_Type_People();
$post_type_people->register();

new Taxonomy_People_Group();
new Post_Type_Clinical_Study();
new ACF_Fields();
