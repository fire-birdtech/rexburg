<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Housing extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'about',
        'amenities',
        'bathroom_range',
        'bedroom_range',
        'byui_approved',
        'city',
        'cover_image_url',
        'email_address',
        'housing_type',
        'name',
        'phone_number',
        'postal_code',
        'profile_image_url',
        'rent_range',
        'slug',
        'street',
        'tenant_rating',
        'website_url',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get all of the housing's reviews.
     */
    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
