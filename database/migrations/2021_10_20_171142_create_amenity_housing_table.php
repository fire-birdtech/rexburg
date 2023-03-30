<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('amenity_housing', function (Blueprint $table) {
            $table->foreignId('amenity_id')->references('id')->on('amenities')->cascadeOnDelete();
            $table->foreignId('housing_id')->references('id')->on('housings')->cascadeOnDelete();
            $table->primary(['amenity_id', 'housing_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('amenity_housing');
    }
};
