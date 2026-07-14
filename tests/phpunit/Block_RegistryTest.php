<?php

namespace Heru\Tests;

use Brain\Monkey\Functions;
use Heru\Theme\Block_Registry;

class Block_RegistryTest extends TestCase {

	public function test_registers_blocks_on_init(): void {

		Functions\expect( 'add_action' )
			->once()
			->with(
				'init',
				\Mockery::type( 'array' )
			);

		new Block_Registry();

		$this->assertTrue( true );
	}
}