<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHousingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('housings', function (Blueprint $table) {
            $table->id();
            $table->longText('about');
            $table->json('amenities');
            $table->string('bathroom_range');
            $table->string('bedroom_range');
            $table->string('city');
            $table->string('email_address');
            $table->string('housing_type');
            $table->string('name');
            $table->string('phone_number');
            $table->string('postal_code');
            $table->string('rent_range');
            $table->string('slug');
            $table->string('street');
            $table->string('tenant_rating');
            $table->string('website_url');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('housings');
    }
}
