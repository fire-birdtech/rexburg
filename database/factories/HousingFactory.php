<?php

namespace Database\Factories;

use App\Enums\HousingTypes;
use App\Models\Housing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Housing>
 */
class HousingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'housing_type' => HousingTypes::SINGLE->value,
        ];
    }
}
