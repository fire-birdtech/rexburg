<?php

namespace Tests\Feature;

use App\Models\Business;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

    public function testAnUnauthorizedUserCannotViewTheBusinessesIndexPage(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('businesses.index'));

        $response->assertRedirectToRoute('errors.404');
    }
}
