<?php

namespace App\Models;

use App\Traits\HasCoverImage;
use App\Traits\HasProfileImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Business extends Model
{
    use HasCoverImage, HasFactory, HasProfileImage, HasSlug;

    protected $fillable = [
        'name',
        'slug',
        'user_id',
        'about',
        'city',
        'email_address',
        'phone_number',
        'postal_code',
        'street',
        'website_url',
    ];

    protected $appends = [
        'cover_image_url',
        'profile_image_url',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
