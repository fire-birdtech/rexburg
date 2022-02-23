<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if (env('APP_ENV') === 'local') {
            $this->call(HousingSeeder::class);
        }
        $this->call(RoleSeeder::class);
        $this->call(AmenitySeeder::class);
    }
}
