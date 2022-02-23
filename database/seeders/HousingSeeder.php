<?php

namespace Database\Seeders;

use App\Models\Housing;
use Illuminate\Database\Seeder;

class HousingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Housing::create([
            'name' => 'Abri',
            'housing_type' => 'single'
        ]);
        Housing::create([
            'name' => 'Appletree',
            'housing_type' => 'married'
        ]);
        Housing::create([
            'name' => 'Autumn Winds',
            'housing_type' => 'single'
        ]);
        Housing::create([
            'name' => 'Campus Courtyard',
            'housing_type' => 'married'
        ]);
        Housing::create([
            'name' => 'Carriage House',
            'housing_type' => 'single'
        ]);
        Housing::create([
            'name' => 'Draper Oaks',
            'housing_type' => 'married'
        ]);
        Housing::create([
            'name' => 'Mesa Falls',
            'housing_type' => 'married'
        ]);
        Housing::create([
            'name' => 'Mountain Ridge',
            'housing_type' => 'married'
        ]);
        Housing::create([
            'name' => 'Pinnacle Point',
            'housing_type' => 'single'
        ]);
        Housing::create([
            'name' => 'Somerset',
            'housing_type' => 'single'
        ]);
        Housing::create([
            'name' => 'The Cove',
            'housing_type' => 'single'
        ]);
        Housing::create([
            'name' => 'The Grove at Thomson Farms',
            'housing_type' => 'married'
        ]);
        Housing::create([
            'name' => 'The Village',
            'housing_type' => 'married'
        ]);
    }
}
