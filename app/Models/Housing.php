<?php

namespace App\Models;

use App\Traits\HasCoverImage;
use App\Traits\HasProfileImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Housing extends Model
{
    use HasCoverImage, HasFactory, HasProfileImage, HasSlug;

    protected $fillable = [
        'about',
        'amenities',
        'bathroom_range',
        'bedroom_range',
        'byui_approved',
        'city',
        'email_address',
        'housing_type',
        'name',
        'phone_number',
        'postal_code',
        'rent_range',
        'slug',
        'street',
        'tenant_rating',
        'website_url',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'cover_image_url',
        'profile_image_url',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
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
