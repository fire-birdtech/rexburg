<?php

namespace Tests\Feature;

use App\Models\Housing;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HousingTest extends TestCase
{
    use RefreshDatabase;

    public function testAnUnverifiedUserCannotSubmitAReview(): void
    {
        $housing = Housing::factory()->create();
        $review = Review::factory()->create([
            'reviewable_id' => $housing->id,
            'reviewable_type' => Housing::class,
        ]);

        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $response = $this->actingAs($user)->post(route('reviews.create', $review));
        $response->assertRedirectToRoute('verification.notice');
    }

    public function testAVerifiedUserCannotSubmitAReview(): void
    {
        $housing = Housing::factory()->create();
        $review = Review::factory()->create([
            'reviewable_id' => $housing->id,
            'reviewable_type' => Housing::class,
        ]);

        $user = User::factory()->create();

        $this->actingAs($user)->post(route('reviews.create', $review));

        $actual = $housing->reviews()->first();

        $this->assertEquals($review->body, $actual->body);
    }
}
