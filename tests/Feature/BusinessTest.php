<?php

namespace Tests\Feature;

use App\Enums\UserRoles;
use App\Models\Business;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
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

    public function testAnAuthorizedUserCanViewTheBusinessesIndexPage(): void
    {
        $user = User::factory()->create();
        $role = Role::factory()->create([
            'name' => UserRoles::ADMIN,
        ]);
        $user->roles()->save($role);

        $response = $this
            ->actingAs($user)
            ->get(route('businesses.index'));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('Businesses/Index')
        );
    }
}
