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
            $table->longText('about')->nullable();
            $table->json('amenities')->nullable();
            $table->string('bathroom_range')->nullable();
            $table->string('bedroom_range')->nullable();
            $table->boolean('byui_approved')->nullable();
            $table->string('city')->nullable();
            $table->string('cover_image_path', 2048)->nullable();
            $table->string('email_address')->nullable();
            $table->string('housing_type');
            $table->string('name');
            $table->string('phone_number')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('profile_image_path', 2048)->nullable();
            $table->string('rent_range')->nullable();
            $table->string('slug');
            $table->string('street')->nullable();
            $table->string('tenant_rating')->nullable();
            $table->string('website_url')->nullable();
            $table->foreignId('user_id')->references('id')->on('users')->nullable();
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
