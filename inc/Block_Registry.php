<?php

namespace Heru\Theme;

if (! defined('ABSPATH')) {
	exit;
}

class Block_Registry
{

	public function __construct()
	{
		add_action('init', array($this, 'register_blocks'));
	}

	public function register_blocks()
	{
		$blocks_dir = HERU_THEME_DIR . '/assets/build/blocks';

		if (! is_dir($blocks_dir)) {
			return;
		}

		foreach (glob($blocks_dir . '/*', GLOB_ONLYDIR) as $block_path) {
			if (file_exists($block_path . '/block.json')) {
				register_block_type($block_path);
			}
		}
	}
}
