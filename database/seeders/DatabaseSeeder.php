<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (env('APP_ENV') === 'local') {
            $this->call(HousingSeeder::class);
            $this->call(BusinessesSeeder::class);
        }
        $this->call(RoleSeeder::class);
        $this->call(AmenitySeeder::class);
    }
}
