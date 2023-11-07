<?php

namespace Tests\Feature;

use App\Models\Business;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BusinessTest extends TestCase
{
    use RefreshDatabase;

    public function testABusinessCanBeCreated(): void
    {
        $expected = Business::factory()->create();

        $actual = Business::find($expected->id);
        $this->assertEquals($expected->name, $actual->name);
    }
}
