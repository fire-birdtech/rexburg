<?php

namespace App\Models;

use App\Traits\HasCoverImage;
use App\Traits\HasProfileImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Venturecraft\Revisionable\RevisionableTrait;

class Business extends Model
{
    use HasCoverImage, HasFactory, HasProfileImage, HasSlug, RevisionableTrait;

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

    protected bool $revisionCreationsEnabled = true;

    protected $dontKeepRevisionOf = ['score'];

    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function managers(): MorphToMany
    {
        return $this->morphToMany(User::class, 'manageable');
    }

    public function claim(): MorphOne
    {
        return $this->morphOne(Claim::class, 'claimable');
    }

    public function views(): MorphMany
    {
        return $this->morphMany(View::class, 'viewable');
    }
}
